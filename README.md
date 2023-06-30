## David Zwirner webapp

This system contains the codebase of our main webapp.

You will find the Sanity studio under the `[/studio](https://cms.zwirner.tech/)`.

## Local development setup

Follow these instructions to deploy a local environment of the webpage.

1. Install Git. [Here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) the guide.

2. Install Docker in your machine. [Here](https://docs.docker.com/get-docker/) the official guide for Windows, Mac and Linux users.

3. **Windows and Linux only**: Install [Docker compose](https://docs.docker.com/compose/install/) in your machine. ([Docker for Mac already includes Compose](https://docs.docker.com.xy2401.com/v17.12/compose/install/#:~:text=Docker%20for%20Mac%20and%20Docker,need%20to%20install%20Compose%20separately.)).

4. Clone this repository in your machine using Git.

```sh
git clone https://github.com/Zwirner/web.git
```

5. Create a Github access token: Go to https://github.com/settings/tokens, click on the _Generate new token_ button, choose _Generate new token (classic)_, set a meaningful name like "DZ Package", and make sure you **tick the _read:packages | Download packages from GitHub Package Registry_ option**. Click on Save and copy the token you just created.

6. Duplicate the `.env.local.example` file and rename it as `.env`. Ask engineering for the `SANITY_API_READ_TOKEN` value, and replace it in that file. Also, replace the value of the `GH_TOKEN` variable with the token you created in the previous step.

7. Open the project folder and let Docker Compose to install everything for you running the following command.

```sh
docker-compose up -d
```

8. Voilà! Open this URL http://localhost:3000/ and you should see the system working.

> In case you want to manually install node and yarn to run this app outside the docker container, please make sure you use **Node 19**, and **Yarn 3 (berry)**.

## Testing

### End to end testing

We use [playwright](https://playwright.dev/) for end to end testing.
In CI these'll run automatically and upload the playwright-report as a artifact after the test run. See [CI workflow](.github/workflows/ci.yml) for how that works.

To run tests locally:

- Run the site locally `docker compose up -d`
- Execute playwright `yarn playwright test`

Other commands to know:

`yarn playwright test`
Runs the end-to-end tests.

`yarn playwright test --ui`
Starts the interactive UI mode.

`yarn playwright test --project=chromium`
Runs the tests only on Desktop Chrome.

`yarn playwright test example`
Runs the tests in a specific file.

`yarn playwright test --debug`
Runs the tests in debug mode.

`yarn playwright codegen`
Auto generate tests with Codegen.

And check out the following files:

- ./tests/example.spec.ts - Example end-to-end test
- ./tests-examples/demo-todo-app.spec.ts - Demo Todo App end-to-end tests
- ./playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

## Automatic dependency bumps

The Dependabot configuration is located in the `.github/dependabot.yml`. It is
configured to check daily for new versions of dependencies in the `package.json`
and weekly for new versions of actions used in the workflows. If there is a new
version, Dependabot opens a PR.

### Access to private registries

The Dependabot relies on the `GH_TOKEN` secret with a personal access token of
the dzdependabot GitHub account with the `packages:read` permission. This account
was added to the `design-system` repository, so its token allows reading the
repo's packages.

## Repository Secrets

There are a number of secrets needed for the CI workflow.
To configure them go to https://github.com/Zwirner/web/settings/secrets/actions
and for dependabot https://github.com/Zwirner/web/settings/secrets/dependabot

#### READ_GH_PACKAGES_TOKEN

Set on: Actions secrets

This is a classic personal access token with read:packages scope in order to pull
in the [`design-system`][design-system-repo] dependency. Currently, it matches
the secret used by the Dependabot.

#### PREVIEW_ENV_PASSWORD

Set on: Actions secrets

This is used by the [patrickedqvist/wait-for-vercel-preview](https://github.com/patrickedqvist/wait-for-vercel-preview) step in order to ensure the preview env is up and running before running the playwright tests.
The value can be found by slacking @web-dev and someone will tell you the code.
In the future we'll store this in a shared password vault.

#### VERCEL_PROTECTION_BYPASS_TOKEN

Set on: Actions secrets

This is used in the `yarn test:e2e` action step by playwright. It is used as the value for the `x-vercel-protection-bypass` header for requests made by playwright in order for them to bypass the password protection.
You can find the value at https://vercel.com/david-zwirner/web/settings/deployment-protection

We potentially can remove this if we use the [vercel_jwt](https://github.com/patrickedqvist/wait-for-vercel-preview#vercel_jwt) from the wait-for-vercel-preview action step.

## Features

- Live previews using `next-sanity`.
- Just TypeScript.
- Eslint configuration.
- Environment variables.
- Tailwind.

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmariuslundgard%2Fsanity-template-nextjs&repository-name=sanity-template-nextjs&project-name=sanity-template-nextjs&demo-title=Next.js%20with%20Sanity&demo-description=A%20Sanity-powered%20Next.js%20app%20with%20instant%20previews&demo-url=https%3A%2F%2Fsanity-template-nextjs-delta.vercel.app%2F%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F406933%2F211022598-9b541676-fa68-4618-8a56-92381e075260.png&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs%3Btemplate%3Dsanity-template-nextjs
[design-system-repo]: https://github.com/Zwirner/design-system
