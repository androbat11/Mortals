import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  Scene,
  Texture,
} from 'three'
import { describe, expect, it, vi } from 'vitest'
import { disposeScene } from './disposeScene'
import { createGround } from '../objects/createGround'
import { createSceneObject } from '../objects/createSceneObject'

describe('disposeScene', () => {
  it('disposes the geometry and material of a mesh', () => {
    const scene = createSceneObject()
    const ground = createGround()
    scene.add(ground)
    const geometry = vi.spyOn(ground.geometry, 'dispose')
    const material = vi.spyOn(ground.material, 'dispose')

    disposeScene(scene)

    expect(geometry).toHaveBeenCalledTimes(1)
    expect(material).toHaveBeenCalledTimes(1)
  })

  it('disposes every material when a mesh has an array of them', () => {
    const scene = new Scene()
    const materials = [new MeshBasicMaterial(), new MeshBasicMaterial()]
    scene.add(new Mesh(new BoxGeometry(), materials))
    const spies = materials.map((material) => vi.spyOn(material, 'dispose'))

    expect(() => disposeScene(scene)).not.toThrow()
    spies.forEach((spy) => expect(spy).toHaveBeenCalledTimes(1))
  })

  it('disposes textures held by a material', () => {
    const scene = new Scene()
    const texture = new Texture()
    scene.add(new Mesh(new BoxGeometry(), new MeshBasicMaterial({ map: texture })))
    const spy = vi.spyOn(texture, 'dispose')

    disposeScene(scene)

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
