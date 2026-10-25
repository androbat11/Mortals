# Tech Stack

- **Build tool:** Vite
- **UI:** React with TypeScript
- **3D:** Three.js, used directly and wrapped in React components
- **3D assets:** Our own low-poly figure built procedurally in Three.js and animated in code, used for the move previews; no imported or copyrighted models, screenshots, or videos
- **Data:** Static, typed entries kept in the repo: fighters, and their moves (fatalities and brutalities) with game, range or class, description, trigger, input sequence, and animation id; no backend
- **Responsive design:** mobile-first CSS with media queries; every screen and component is built to adapt to phone, tablet, and desktop widths, and the 3D canvas resizes with its container
- **Design system:** the Netherflame design (`specs/design/netherflame-design-system.md`), taken from the Stitch project "Mortal Kombat Finishers Archive": the colours, spacing, and type become CSS variables in `web/src/index.css`; shapes are sharp (no rounded corners) with chamfered focal elements
- **Fonts:** Bebas Neue (headings) and Space Grotesk (body and labels), self-hosted from the `@fontsource` npm packages, so the site loads no third-party font requests
- **Styling:** CSS Modules, one file per component, no CSS framework (the Stitch export uses Tailwind through a CDN script, which is not used here)
- **Testing:** Vitest for validation; run with `npm test` in `web/`
- **Package manager:** npm
- **Hosting:** Any static host

## Notes
- react-three-fiber is not part of the stack for now; revisit if scene code becomes hard to manage.
