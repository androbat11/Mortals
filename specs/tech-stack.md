# Tech Stack

- **Build tool:** Vite
- **UI:** React with TypeScript
- **3D:** Three.js, used directly and wrapped in React components
- **3D assets:** Stylized low-poly characters built procedurally in Three.js and animated in code; no imported or copyrighted models
- **Data:** Static, typed fatality entries kept in the repo (game, description, tutorial steps, animation id); no backend
- **Responsive design:** mobile-first CSS with media queries; every screen and component is built to adapt to phone, tablet, and desktop widths, and the 3D canvas resizes with its container
- **Testing:** Vitest for validation; run with `npm test` in `web/`
- **Package manager:** npm
- **Hosting:** Any static host

## Notes
- react-three-fiber is not part of the stack for now; revisit if scene code becomes hard to manage.
