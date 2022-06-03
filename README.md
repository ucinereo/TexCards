# TexCards
An angular web application to make flashcards with markdown, latex (katex), mermaid support

## Feature overview
The application allows users to register a new account. Then, create flashcard sets, share them with other users and view the cards in three different modes, view mode: displays all cards; learn mode: lets you decide which cards you know and which don't, and you can repeat the cards you didn't know; star mode: displays all cards the user has marked with a star.

### Latex usage
Use single dollar notation for inline math, e.g. `$\LaTeX$` renders as $\LaTeX$, and double dollar notation for display mode e.g. ``$$\LaTeX$$`` $$\LaTeX$$
More information on latex with katex can be found [here](https://katex.org/docs/supported.html)

### Mermaid usage
Use the code environment with mermaid as language the generate graphs e.g.
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
More information on graphs with mermaid can be found [here](https://mermaid-js.github.io/mermaid/#/)


## Run for development
To run the application, you need the corresponding [backend](https://github.com/Cryptric/TexCardsBackend)

To run the application for development
- [Install angular](https://angular.io/cli)
- Set the IP address/port for the backend in `src/environments/environment.ts`
- Execute `npm install` on the project root

Then you can run `ng serve` in the project root to start the production environment.

## Build for production 
To build the production files, first set the IP address/port for your deployed backend under `src/environments/environment.prod.ts`
then run `ng build` in the project root