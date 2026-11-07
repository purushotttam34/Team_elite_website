# Team Elite × Orangutan Elite — Unofficial Fan Website

## Start locally
1. Install Node.js 20+.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev` and open the URL Vite prints.

## Dual identity assets
Add your authentic, appropriately licensed files to:
- `public/assets/logos/team-elite.png`
- `public/assets/logos/iqoo-te-orangutan.png` (combined iQOO + TE + Orangutan logo)
- `public/assets/team-photos/team-elite.webp`
- `public/assets/team-photos/orangutan-elite.webp`

Until these files are present, the site displays labeled placeholders. No jerseys are artificially recolored.

## Next phases
Implement routed pages, sourced historical timeline, tournament/match/team/player data model, player statistics, trophy room, jersey evolution, and moderated fan interactions. Do not publish fabricated statistics.

This is an independent fan project, not an official team site.



FOR UPDATING LEGACY PAGE AND ACHIEVEMENTS PAGE
  we can go in timeline.js for legacy page update and add id and other attributes accordingly
  we can go in achievements.js for change in achievements page and add id and other attributes accordingly



Implementation steps for adding games
1. Create the src/games/ folder.
2. Build each game as a separate React component.
3. Import the components into FanZone.jsx.
4. Add a Games Arcade section with cards and a Play button.
5. Add CSS using new, scoped class names such as .fz-games-grid and .fz-game-card, keeping your existing styles.css intact.
6. Test each game on desktop and mobile.