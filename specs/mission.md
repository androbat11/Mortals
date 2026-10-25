# Mission

## Purpose
Mortals is a fan-tribute archive of Mortal Kombat finishing moves. Users browse the fighters, watch an animated preview of each fatality and brutality, and learn the exact input to perform it.

## Audience
Mortal Kombat fans, competitive players, and lore archivists who want to find a finisher quickly and learn how to execute it. The experience stays fast to scan, dark and dramatic, and low friction.

## What the user sees
- A roster of fighters, each with the finishers they have
- For every fatality: its name, the game it comes from, its range (close, mid, far, or sweep), a description, an animated preview, and the input sequence in arcade notation
- For every brutality: the same, plus its class and the trigger condition that must be met
- Search, and filters by game and by range, to narrow the archive
- An About page that explains the archive, the notation, and the difference between fatalities and brutalities
- A reference for the notation (1 to 4 for the buttons, arrows for the directions)

## Initial scope
A small MVP: five to eight fighters from the current games, with their fatalities and brutalities, taken from the design and clearly marked as not yet verified against the games.

## Principles
- Scanning and learning come first: find a move, see it, read its input. No accounts, no clutter.
- Responsive by default: every screen works on phones, tablets, and desktops.
- Follow the Netherflame design system (`specs/design/netherflame-design-system.md`): dark, sharp-cornered, crimson and amber, Bebas Neue and Space Grotesk.
- Original visuals only: the previews are our own animated 3D figures. No game screenshots, videos, audio, artwork, or models. Names and button notation are referenced as a fan tribute, with a visible disclaimer that the project is unofficial and not affiliated with the rights holders.
- Accuracy matters: move names, descriptions, triggers, and inputs must be verified against the games before the site is published; until then they are marked as unverified.
- Content is easy to add: a new move is data plus an animation.
