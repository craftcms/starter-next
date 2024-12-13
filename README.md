# Craft CMS + Next Starter

A minimal, production-ready starter for [Next.js 15](https://nextjs.org) and [Craft CMS](https://craftcms.com/) projects. Check out the [features](#key-features), or [dive right in](#quick-start)!

> [!TIP]
> Curious about Craft, but want to try it with a different framework? We have [other starter projects](https://craftcms.com/starters), too!

## Quick Start

This project assumes you have our recommended development environment  [DDEV](https://ddev.com) installed and up-to-date.

1. Clone this repository, and move into the new directory:
    ```bash
    git clone https://github.com/craftcms/starter-next.git
    # ...
    cd starter-next
    ```

1. (Optional) Adjust the DDEV project name and domains. See [this section](#running-on-a-different-domain) for more information.

1. Set up your Craft CMS backend:

    ```bash
    ddev composer install
    ddev craft install
    ```

    Write down the username and password you choose, during installation. You’ll need it to [log in to the control panel](#control-panel).

1. Generate a token for the _Posts_ GraphQL Schema:

    ```bash
    # Display a list of schemas and UUIDs:
    ddev craft graphql/list-schemas

    # Use the “Posts” schema ID to generate a token:
    ddev craft graphql/create-token c7d2eb61-cdde-4a76-88a9-eb30ddcf155b
    ```

1. Configure your frontend environment:

    - Copy `frontend/.env.example` to `frontend/.env`;
    - Update to match your Craft installation;
    - Update `AUTH_HEADER` to the token generated in the previous step;

1. Install front-end dependencies:

    ```bash
    ddev fe npm install
    ```

1. Start the Next development server:

    ```bash
    ddev fe npm run dev
    ```

> [!TIP]
> The URLs that Next.js emits as it boots up may not work—they are correct _inside_ their respective containers, but must be accessed from the outside via the pre-configured DDEV hostnames.

### Post-Install

Run `ddev launch` to open the front end in your default browser, or visit `https://starter-next.ddev.site`.

### Control Panel

The Craft [control panel](https://craftcms.com/docs/5.x/system/control-panel.html) is available at `https://api.starter-next.ddev.site/admin`. Log in with the username and password you created during installation!

## Key Features

This project includes basic support for a handful of Craft’s best features, in a tidy headless package built on [Next.js 15](https://nextjs.org).

### GraphQL

Nuxt communicates with Craft’s built-in [GraphQL API](https://craftcms.com/docs/5.x/development/graphql.html) to query posts and pages, and create (or “mutate”) guestbook entries.

### Live Preview

Craft’s live preview works just as you’d expect. You can even copy a secure, sharable URL to any draft.

### Pagination

The blog is neatly paginated in a way that matches Craft’s native handling. Progress through a set of paginated results is reflected in the URL and your browser’s navigation history.

## Project Structure

We’ve split the project directory into two folders, `backend/` and `frontend/`, to better demonstrate the boundaries of Craft and Next.js, respectively. Some configuration needs to be transcribed between the spaces to ensure each half understands where the other lives!

> [!WARNING]
> The front- and back-end `.env` files are separate! Make sure you are updating configuration in the correct file.

There is no `.gitignore` at the root of the project—instead, each system maintains its own relatively-vanilla file (`backend/.gitignore` and `frontend/.gitignore`).

### Back End

The `backend/` directory is predominantly a standard Craft installation, so [its structure](https://craftcms.com/docs/5.x/system/directory-structure.html) should be familiar. Craft is configured to run in [headless mode](https://craftcms.com/docs/5.x/reference/config/general.html#headlessmode), which means it doesn’t perform any element routing, nor template rendering—in fact, it will only respond to _control panel_, _action_, and static asset requests (like any images you might upload).

Craft uses the `PRIMARY_SITE_URL` environment variable to generate fully-qualified URLs for front-end pages (and assets), and `CRAFT_BASE_CP_URL` to build control panel URLs.

### Front End

Next.js lives in the `frontend/` directory. All NPM commands should be executed here—as a convenience, we’ve included a custom DDEV command (`.ddev/commands/web/fe`) that ensures tasks are run in the appropriate directory:

- `ddev fe npm install` &rarr; Moves into `frontend/`, then executes `npm install`;
- `ddev fe npm run dev` &rarr; Moves into `frontend/`, then executes the `dev` script;

See `frontend/next.config.js` to [customize Next.js](https://nextjs.org/docs/app/api-reference/next-config-js), or read about the rest of its [project structure](https://nextjs.org/docs/getting-started/project-structure).

Routing is handled primarily via the [`app/`](https://nextjs.org/docs/app/building-your-application/routing) directory, and GraphQL queries are centralized in `queries/`.

## Tips + Tricks

### GraphQL Playground

If you want to compress the GraphQL query feedback loop, open up the Craft control panel and click **GraphQL** in the main navigation, then choose **GraphiQL**. [Read more about the GraphQL IDE](https://craftcms.com/docs/5.x/development/graphql.html#using-the-graphiql-ide) in the Craft documentation.

### Running on a Different Domain

The DDEV configuration files shipped with this project use a specific pair of URLs for the Nuxt front end and Craft back end:

- **Front end**: `https://starter-next.ddev.site`
- **Back end**: `https://api.starter-next.ddev.com`

If you would like to use different URLs, you must make a few changes in `.ddev/config.yaml`:

- Update the `name` key (this influences the `starter-project` segment of the base URL);
- Change the back-end hostname under the `additional_hostnames` key;
- Change the `VIRTUAL_HOST` domains under `web_environment`;

Then, a change is required for each of the nginx configuration files:

- Change the `server_name` directive in `.ddev/nginx_full/api-site.conf` to match the back-end url;
- Change the `server_name` directive in `.ddev/nginx_full/next-site.conf` to match the front-end url;

Next.js also needs to be told what front-end URLs should look like:

- Update `BASE_URL` in `frontend/.env`;

Finally, Craft may need to generate absolute URLs to the control panel in some scenarios:

- Update `CRAFT_BASE_CP_URL` in `backend/.env`;

Your production configuration will probably look different—as long as Next.js knows where the GraphQL endpoint lives (`CRAFT_URL` in `frontend/.env`) and both Craft and Next.js know how to generate public URLs (`PRIMARY_SITE_URL` in `backend/.env` and `BASE_URL` in `frontend/.env`, respectively) these URLs don’t need to be related in any specific way!

> [!TIP]
> Always validate your CORS policy when deploying projects that make cross-domain requests!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
