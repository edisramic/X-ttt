# A simple example of a full website built with React.js stack

## React development source and testing

Major libraries used:

- react
- webpack
- babel
- react-router
- ampersand
- sass
- jest

---

##For demonstration purposes only.

---

---

### Getting Started

Install all the packages

```bash
npm install
```

To start the development web server use the following command and turn your browser to [http://localhost:3000](http://localhost:3000) or [http://0.0.0.0:3000](http://0.0.0.0:3000)

```bash
npm start
```

To run code lint

```bash
npm run lint
```

To run code tests

```bash
npm run test
```

To build the site

```bash
npm run build
```

## Changes

- Node v6.17.1 for compatibility reasons. This version was released around the same time the repository had various commits. Higher versions of Node may work, however this version allowed me to refrain from using --force commands when updating packages. In a production environment, I would update all the packages to relevant secure versions, as a lot of these are redundant and deprecated.
- Minimum node version set in package.json and .nvmrc.
- Downgraded node-sass to v4.0.0 for compatibility.
- Clean up console errors

### Features

**Versus AI**:

- Sends the gameboard to an AI model, HuggingFace in this instance - AI determines the computers next move.
- Issues with Node versions, as this version of Node doesn't support async/await - I have parked this feature.
- Increases difficulty of the game. Model selects relevant cell to either win or block opposing player from winning, rather than selecting an empty cell randomly.

**Accessibility**:

- Added ARIA labels and some keyboard functionality for visually impaired users. Tested with MacOS VoiceOver.
- Future improvement - add more labels throughout the game, use contrasting colours for different players (X/O), handle arrow key movement.

**Hints**:

- Give player the option to see a hint
- Minimum requirement of two cells selected by player
- Could be evolved to introduce difficulty setting and only show when on easier difficulty and certain time has lapsed since last move.

**Scoreboard**:

- Persist scoreboard to local storage.
- Save user's wins, draws and losses.
- In a production environment, this would be saved to some form of DB.

### Considerations

- Planned but not complete due to time constraint - replace state mutations with setState.
- Update deprecated packages and replace certain packages/functions with modern tech.
- Typescript support.
- Consistent casing convention across project.
- CSS scoping.
