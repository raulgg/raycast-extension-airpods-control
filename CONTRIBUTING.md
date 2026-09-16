# Contributing

Thanks for helping improve AirPods Control. This page explains where to report bugs, where to propose ideas, and where to send code.

## Where things go

| I want to...                         | Do this                                                                                                                                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Report a bug                         | [Open an issue here](https://github.com/raulgg/raycast-extension-airpods-control/issues)                                                                                                      |
| Propose a feature or discuss an idea | [Open an issue here](https://github.com/raulgg/raycast-extension-airpods-control/issues) before writing code                                                                                  |
| Submit code                          | Open a pull request here **or** directly in [raycast/extensions](https://github.com/raycast/extensions) under `extensions/airpods-control`. Both are fine. See [Sending code](#sending-code). |
| Report a CLI or hardware problem     | The [airpods-control CLI repository](https://github.com/raulgg/airpods-control/issues). This extension only runs the CLI.                                                                     |

This repository is where the extension is developed and where discussions happen. The copy in `raycast/extensions` is what the Raycast Store publishes. The maintainer keeps the two in sync.

> **Status.** The extension is not in the Raycast Store yet, so there is no `extensions/airpods-control` directory in `raycast/extensions` for now. Until the first release lands, everything goes through this repository.

## Discuss ideas first

Please open an issue here before building a new feature or changing behavior. Small bug fixes do not need one.

Why: Raycast will not merge significant changes to an extension without the author's sign-off, so agreeing on the idea first means your pull request will not stall in review. It also settles whether the change belongs in the extension or in the [CLI](https://github.com/raulgg/airpods-control), and lets us point you at the relevant [architecture](ARCHITECTURE.md) and [testing](TESTING.md) notes before you start.

You can also open issues in `raycast/extensions` (Raycast labels them per extension), but we prefer them here so discussions stay in one place.

## Sending code

You are not required to open your pull request in this repository. Pick whichever suits you:

**Directly in `raycast/extensions`.** Follow Raycast's [Contribute to an Extension](https://developers.raycast.com/basics/contribute-to-an-extension) guide: use the **Fork Extension** action in Raycast (or a [sparse checkout](https://developers.raycast.com/information/developer-tools/forked-extensions), the monorepo is very large), run `npm install && npm run dev`, then open a pull request against `main`. The maintainer is pinged automatically as code owner, reviews it there, and syncs the merged change back here. This path gives you full credit: you are the pull request author, which is what Raycast's contributor credits are based on.

**In this repository.** Fork, branch from `main`, `npm ci`, `npm run dev`. After review and merge, the maintainer publishes the change to `raycast/extensions`. Because Raycast's publish tooling opens that pull request from the maintainer's account, your credit is preserved in the commit: you are recorded as the commit author, or as co-author (`Co-authored-by:`) when several people contributed, so the change shows up on your GitHub profile and in the monorepo history. Raycast's own contributor credits, however, go to whoever opens the Store pull request. If that matters to you, use the direct path above; you can also run `npm run publish` from your own clone once your change is merged here, which opens the Store pull request under your account.

In both cases:

- Update [CHANGELOG.md](CHANGELOG.md) with a `## [Title] - {PR_MERGE_DATE}` entry. Raycast fills in the date on release.
- Add your Raycast Store handle to `contributors` in `package.json`. This is the credit shown on the Store page, and it makes you a code owner for future changes.
- Say what you tested on real hardware (AirPods or Beats model, macOS version, CLI version). Automated tests stub Raycast, the CLI, and Homebrew, so they cannot prove device behavior.
- Run the checks before opening the pull request:

```sh
npm test
npm run type-check
npm run lint
npm run build
```

Commit messages use a light conventional style (`fix:`, `feat:`, `docs:`, `refactor:`, `test:`, `chore:`) with a short imperative summary.

## How sync works

For the maintainer, and for anyone curious why both paths are safe.

- **Raycast to here.** When a pull request touching `extensions/airpods-control` merges upstream, the maintainer runs `npx @raycast/api@latest pull-contributions` on `main` here. It brings the upstream changes in as a single `Pull contributions` commit; conflicts are resolved with `git add` and `git merge --continue`. If the CLI cannot fast-forward, the fallback is `git format-patch -1 <merge-commit> -- extensions/airpods-control` from a sparse checkout of the monorepo, applied here with `git am -p3`.
- **Here to Raycast.** The maintainer runs `pull-contributions` first, then `npm run publish`, which pushes the extension to the `ext/airpods-control` branch of the maintainer's fork and opens or updates the Store pull request. Contributors are credited as commit author or co-author, in `CHANGELOG.md`, and in `contributors`.
- Automating this (mirroring merged pull requests to Raycast with the contributor as commit author) is on the list to research. Until then it is a manual step, so there can be a short delay between a merge here and the Store release.

## Ground rules

- The extension runs the `airpods-control` CLI and reads back macOS state. Anything that needs a new CLI capability starts in the [CLI repository](https://github.com/raulgg/airpods-control).
- Keep command names, entrypoint filenames, and preference keys stable; users have shortcuts and settings bound to them.
- Raycast's [Store guidelines](https://developers.raycast.com/basics/prepare-an-extension-for-store) and [Community Guidelines](https://manual.raycast.com/community-guidelines) apply to every change, in either repository.

Contributions are licensed under the [MIT License](LICENSE), like the rest of the project.
