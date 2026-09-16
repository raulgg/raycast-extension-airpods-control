# Contributing

## Getting started

```sh
npm ci
npm run dev
```

`npm run dev` loads the extension into Raycast from this directory and reloads on changes. You need macOS, Raycast, and the [airpods-control](https://github.com/raulgg/airpods-control) CLI installed to exercise the commands end to end.

## Before opening a pull request

```sh
npm test
npm run type-check
npm run lint
npm run build
```

## Where to look

- [ARCHITECTURE.md](ARCHITECTURE.md): module map, dependency rules, and the behavior contracts a change must preserve.
- [TESTING.md](TESTING.md): test projects, conventions, and what each suite can prove.
