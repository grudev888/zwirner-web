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
git clone https://github.com/Zwirner/zwirnerweb.git
```

5. Create a Github access token: Go to https://github.com/settings/tokens, click on the _Generate new token_ button, choose _Generate new token (classic)_, set a meaningful name like "DZ Package", and make sure you **tick the _read:packages | Download packages from GitHub Package Registry_ option**. Click on Save and copy the token you just created.

6. Duplicate the `.env.local.example` file and rename it as `.env`. Ask engineering for the `SANITY_API_READ_TOKEN` value, and replace it in that file. Also, replace the value of the `GH_TOKEN` variable with the token you created in the previous step.

7. Open the project folder and let Docker Compose to install everything for you running the following command.

```sh
docker-compose up -d
```

8. Voilà! Open this URL http://localhost:3000/ and you should see the system working.

> In case you want to manually install node and yarn to run this app outside the docker container, please make sure you use **Node 19**, and **Yarn 3 (berry)**.

# Updating your the dev database with latest changes done in prod

Login to sanity cli running the following command in a terminal.

```bash
docker-compose exec zwirnerweb yarn sanity login
```

Choose _Google_ as the login type, open the URL that the terminal will show you, and sign in with your David Zwirner google account. If everything went well you should see a message like this:

```bash
Login successful
```

Run this script to sync the dev database with prod

```bash
docker-compose exec zwirnerweb yarn sync-dev-db
```

## Features

- Live previews using `next-sanity`.
- Just TypeScript.
- Eslint configuration.
- Environment variables.
- Tailwind.

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmariuslundgard%2Fsanity-template-nextjs&repository-name=sanity-template-nextjs&project-name=sanity-template-nextjs&demo-title=Next.js%20with%20Sanity&demo-description=A%20Sanity-powered%20Next.js%20app%20with%20instant%20previews&demo-url=https%3A%2F%2Fsanity-template-nextjs-delta.vercel.app%2F%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F406933%2F211022598-9b541676-fa68-4618-8a56-92381e075260.png&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs%3Btemplate%3Dsanity-template-nextjs
