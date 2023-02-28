## David Zwirner webapp

This system contains the codebase of our main webapp.

You will find the Sanity studio under the `/studio` route.

## Running the system locally

Follow these instructions to deploy a local environment of the webpage.

1. Install Docker in your machine. [Here](https://docs.docker.com/get-docker/) the official guide for Windows, Mac and Linux users.

2. **Windows and Linux only**: Install [Docker compose](https://docs.docker.com/compose/install/) in your machine. ([Docker for Mac already includes Compose](https://docs.docker.com.xy2401.com/v17.12/compose/install/#:~:text=Docker%20for%20Mac%20and%20Docker,need%20to%20install%20Compose%20separately.)).

3. Install Git. [Here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) the guide.

4. Clone this repository in your machine using Git.

```sh
git clone https://github.com/Zwirner/zwirnerweb.git
```

5. Open the project folder and let Docker Compose to install everything for you running the following command.

```sh
docker-compose up -d
```

6. Voilà! Open this URL http://localhost:3000/ and you should see the system working.

## Features

- Live previews using `next-sanity`.
- Customized Sanity Desk Tool.
- Just TypeScript.
- Eslint configuration.
- Environment variables.
- Tailwind.

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmariuslundgard%2Fsanity-template-nextjs&repository-name=sanity-template-nextjs&project-name=sanity-template-nextjs&demo-title=Next.js%20with%20Sanity&demo-description=A%20Sanity-powered%20Next.js%20app%20with%20instant%20previews&demo-url=https%3A%2F%2Fsanity-template-nextjs-delta.vercel.app%2F%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F406933%2F211022598-9b541676-fa68-4618-8a56-92381e075260.png&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs%3Btemplate%3Dsanity-template-nextjs
