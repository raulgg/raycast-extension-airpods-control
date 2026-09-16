# Contributing

Thanks for helping improve AirPods Control. This document explains where contributions can land, when to open an issue first, and how the two copies of the extension are kept in sync.

## Two homes for the code

Every extension in the Raycast Store is open source and lives in the [raycast/extensions](https://github.com/raycast/extensions) monorepo, under `extensions/<name>`. That is where Raycast reviews and publishes changes. This repository (`raulgg/raycast-extension-airpods-control`) is the extension's source of truth: development, tests, and history live here, and the Store copy is published from it.

Because of that, you can contribute in either place:

| Goal                                                        | Where                                                                                                                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Report a bug or ask a question                              | [Open an issue here](https://github.com/raulgg/raycast-extension-airpods-control/issues)                                                               |
| Propose a new feature or a behavior change                  | Open an issue here first, then send the change to either repository                                                                                    |
| Fix a bug, typo, or small UX problem                        | A pull request here, or a pull request to `raycast/extensions` (see [Contributing in raycast/extensions](#contributing-directly-in-raycastextensions)) |
| Report a problem with the `airpods-control` CLI or hardware | The [CLI repository](https://github.com/raulgg/airpods-control/issues); this extension only runs it                                                    |

Contributing directly in `raycast/extensions` is encouraged. It is the shortest path to the Store and follows Raycast's standard process. Contributing here is equally welcome; the maintainer publishes merged changes to the Store and mirrors Store changes back here, so nothing is lost either way.

> **Status.** The extension has not been published to the Raycast Store yet. Until the first submission is merged, there is no `extensions/airpods-control` directory in `raycast/extensions`, so all contributions go through this repository. This document already describes the post-publication flow so nothing changes for contributors once the extension is live.

## Open an issue before building a feature

Please open an issue before writing code for a new feature or a behavior change, in either repository. Small bug fixes do not need one.

This is not bureaucracy; it saves everyone time:

- Raycast's [Store guidelines](https://developers.raycast.com/basics/prepare-an-extension-for-store#contributing-to-existing-extensions-vs-creating-a-new-one) state that significant contributions cannot be merged without the extension author's sign-off. Agreeing on scope up front means your pull request will not stall in review.
- Several things look like extension features but are CLI features. The extension deliberately does not add capabilities the [airpods-control](https://github.com/raulgg/airpods-control) CLI does not expose (device selection, for example). Discussing first tells you which repository the work belongs in.
- Some behavior is a deliberate contract (see [Architecture](ARCHITECTURE.md), especially the behavior contracts, and [Testing](TESTING.md)). Knowing the constraints before you start avoids rework.

In the issue, describe the problem you are solving, the proposed behavior, and which AirPods or Beats model, macOS version, and CLI version you tested with, if relevant. Once there is agreement, mention the issue in your pull request wherever you open it.

## Contributing in this repository

1. Fork and clone this repository, then create a branch from `main`.
2. Install dependencies with `npm ci` and run `npm run dev` from the repository root. Raycast imports the extension in development mode and reloads it on save. Do not develop from a copy inside `raycast/extensions`; this repository is the source of truth.
3. Make your change. Follow [Architecture](ARCHITECTURE.md) for module boundaries and [Testing](TESTING.md) for test shape, isolation, and what to assert. Do not change the helper's CLI contract from this repository.
4. Add a changelog entry at the top of [CHANGELOG.md](CHANGELOG.md). Use the `## [Title] - {PR_MERGE_DATE}` format; Raycast replaces the placeholder when the change reaches the Store. Group your entry under the existing unreleased heading if there is one.
5. Add your Raycast Store handle to the `contributors` array in `package.json` if you made a meaningful change. Raycast uses this field to notify you about future pull requests that touch the extension.
6. Run the checks before opening the pull request:

```sh
npm test
npm run type-check
npm run lint
npm run build
npx --no-install prettier --check src .prettierrc eslint.config.js package.json tsconfig.json vitest.config.ts
```

7. Open a pull request against `main`. Link the issue, describe the change, and state what you tested on real hardware. Automated tests stub Raycast, the CLI, and Homebrew; a passing suite does not prove device behavior, so please say which AirPods or Beats model, firmware, macOS version, and CLI version you used, or say explicitly that you could not test on hardware.

Commit messages follow a light conventional style: `fix:`, `feat:`, `refactor:`, `docs:`, `test:`, `chore:`, with a short imperative summary. Keep unrelated changes in separate commits.

## Contributing directly in raycast/extensions

Once the extension is in the Store, you can follow Raycast's [Contribute to an Extension](https://developers.raycast.com/basics/contribute-to-an-extension) guide. In short:

1. Get the source. Do not clone the whole monorepo (it is very large). Either:
   - Use the **Fork Extension** action on the extension in Raycast's root search. It forks `raycast/extensions` to your GitHub account, checks out only this extension, and adds you to `contributors` automatically.
   - Use the community [Forked Extensions](https://developers.raycast.com/information/developer-tools/forked-extensions) tool, which manages a sparse checkout of your fork.
   - Do it by hand from your fork:

```sh
git clone --filter=blob:none --no-checkout https://github.com/<you>/extensions.git raycast-extensions
cd raycast-extensions
git sparse-checkout set extensions/airpods-control
git checkout main
cd extensions/airpods-control
npm install && npm run dev
```

2. Make the change on a branch. Update `CHANGELOG.md` with a `{PR_MERGE_DATE}` entry and add your Raycast handle to `contributors` in `package.json`, exactly as you would here.
3. Run `npm run build` and `npm run lint`, then test the distribution build in Raycast.
4. Open a pull request against `raycast/extensions` `main`. Fill in the repository's [pull request template](https://github.com/raycast/extensions/blob/main/.github/pull_request_template.md) and link the issue from this repository in the description so the maintainer can follow it.

What to expect after opening the pull request:

- `raycastbot` labels the pull request and requests a review from the extension's author and contributors. Reviewers are derived from `package.json` through an auto-generated `CODEOWNERS` file; never edit `CODEOWNERS` directly.
- Raycast's Community Managers review first-in, first-out and aim for first contact within about a week for new extensions and around five business days for updates.
- Pull requests are marked stale after 14 days without activity and closed after 21. They can be reopened.
- Significant changes need the author's sign-off, which is why the issue-first step above matters. Small fixes usually do not.
- When the pull request is approved, `raycastbot` merges it and the Store publishes the new version automatically.

The maintainer mirrors every merged change back into this repository (see [Keeping the two copies in sync](#keeping-the-two-copies-in-sync)). You do not need to open a second pull request here.

## Sending a change from this repository to Raycast

After a pull request is merged here, the maintainer normally publishes it to the Store, often batching several changes into one Store update. If you would rather open the Store pull request yourself, you can:

- Run `npm run publish` from your clone of this repository, on the merged commit. The Raycast CLI authenticates with your GitHub account, forks `raycast/extensions` into `<you>/raycast-extensions` if needed, copies this directory onto a branch named `ext/airpods-control` in that fork, squashes the commits, and opens a pull request against `raycast/extensions`. It refuses to run if `raycast/extensions` has changes that are not in your working tree; run `npx @raycast/api@latest pull-contributions` first in that case.
- Or open the pull request manually from a sparse checkout as described in the previous section.

Either way, link both the issue and the pull request from this repository in the Store pull request description.

## Keeping the two copies in sync

This section is mainly for the maintainer, but it explains why both contribution paths are safe.

The Raycast CLI provides two commands for this, and both operate on a hidden clone at `~/.config/raycast/public-extensions-fork`, which is a blob-less sparse checkout of the maintainer's fork of `raycast/extensions` with an `upstream` remote pointing at Raycast:

- `npx @raycast/api@latest pull-contributions` (run from this repository's root with a clean working tree) syncs that clone with `upstream/main`, copies `extensions/airpods-control` from it over the working tree, and, if anything differs, commits the result on a temporary `contributions/merge-<timestamp>` branch and merges it into the current branch as a single `Pull contributions` commit. Conflicts are resolved with the usual `git add` and `git merge --continue`, or abandoned with `git merge --abort`. It tracks the last pulled commit with a local git tag so subsequent runs only bring new changes.
- `npm run publish` does the reverse: it copies this directory onto the `ext/airpods-control` branch of the fork, squashes, pushes, and opens or updates the Store pull request. It fails until any pending contributions have been pulled.

The sync procedure is therefore:

1. **Store to here.** When a pull request touching `extensions/airpods-control` merges in `raycast/extensions`, run `npx @raycast/api@latest pull-contributions` on `main` here, review the resulting `Pull contributions` commit, and push. Because the CLI squashes, keep the contributor's credit in `CHANGELOG.md` and `package.json` `contributors`, and mention the upstream pull request number in the commit or merge description.
2. **Here to Store.** Before publishing, run `pull-contributions` to make sure nothing upstream is missed, then `npm run publish`. Continue pushing to the same Store pull request by running `npm run publish` again.
3. **If the CLI cannot fast-forward.** `pull-contributions` is known to fail with `Not possible to fast-forward` when the `ext/airpods-control` branch in the fork has diverged, for example after edits made directly on GitHub during review. In that case, apply the upstream change manually: from a sparse checkout of `raycast/extensions`, run `git format-patch -1 <merge-commit> -- extensions/airpods-control`, apply the patch here from the repository root with `git am -p3` (the extra `-p` levels strip the `extensions/airpods-control/` prefix), and reference the upstream pull request in the commit message. Then delete the stale `ext/airpods-control` branch from the fork so the next `npm run publish` starts clean.

The frozen backup branch `airpods-control/add-extension` on `raulgg/raycast-extensions` is not part of this flow. The CLI uses the branch `ext/airpods-control` in the same fork and never touches the backup.

## Scope and expectations

- The extension runs the `airpods-control` CLI and reads back macOS state. Changes that require new CLI capabilities start in the [CLI repository](https://github.com/raulgg/airpods-control).
- Keep command names, entrypoint filenames, and preference keys stable; Raycast users have shortcuts and settings bound to them. If a rename is unavoidable, discuss it in an issue first.
- Follow Raycast's [Store guidelines](https://developers.raycast.com/basics/prepare-an-extension-for-store) for naming, README, screenshots, and changelog format. Reviewers apply them to every Store pull request.
- Be kind. Raycast's [Community Guidelines](https://manual.raycast.com/community-guidelines) apply in both repositories.

Everything in this repository is licensed under the [MIT License](LICENSE); by contributing you agree that your contribution is licensed the same way.
