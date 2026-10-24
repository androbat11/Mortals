// Design: the colours come from a function, not a module-level constant, so no
// state is shared between importers. A small palette (three colours) keeps the
// original stylized low-poly look and lets the parts share materials. It is a
// generic fighter, not a Mortal Kombat character: the mission asks for original
// visuals only.
export function createCharacterPalette() {
  return {
    skin: 0xd9a77f,
    outfit: 0x0f766e,
    accent: 0xf59e0b,
  }
}
