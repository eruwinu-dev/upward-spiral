# NextJS / Prisma / Tailwind / React-Query Project Template

This is a starter template for projects using NextJS, Prisma, Tailwind, and React-Query.
## What is this template?

[NextJS](https://nextjs.org/) is used as the main frontend framework for this template. [Prisma](https://www.prisma.io/) is a Typescript ORM that connects the Postgresql database to the frontend. It has type safety for your database models, so you don't have to worry about typings. [TailwindCSS](https://tailwindcss.com/docs/guides/nextjs) is a utility-first CSS framework that integrates well with server-side rendering. Lastly, [React-Query](https://tanstack.com/query/latest/docs/react/overview) is data-fetching library that is used to maintain server state to your application.

[React Hook Form](https://react-hook-form.com/) will be used to manage form state, while [Zod](https://zod.dev/) is a schema validator that checks the input form values and validates them for any errors.

## How to install?

1. Install [pnpm](https://pnpm.io/installation) globally `npm install -g pnpm`.
2. Install [create-next-app](https://nextjs.org/learn/basics/create-nextjs-app/setup). This is your CLI for Next JS projects.
3. Get a Postgresql connection string from your Postgresql instance (AWS, Supabase, Heroku, Render, etc).
4. Get the Google Client IDs and Client Secret from your [Google Console](https://console.cloud.google.com/).
5. Either fork this repository or use it as a template using `create-next-app`.
6. Install the dependencies using `pnpm install`.
7. Setup the Prisma client and types by using `npx prisma generate`. If there's an error with Typescript, reopen your IDE.
8. Lastly, run `pnpm dev` to start the development server.

## Prisma Migrations

-   Alternatively, a MongoDB Atlas instance can also be used in place of Postgresql. However, the schema for the IDs will change. Refer to the [Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#defining-ids-in-mongodb) for defining ID fields.
-   The team must first agree on a database schema for `/prisma/schema.prisma` before applying changes (using `npx prisma db push`) to the Postgresql instance. **Do not push changes to the Prisma schema unless authorized**.

## Folder Structure

-   `src`
    -   The main directory for the app.
-   `src/pages`
    -   Where the pages of the app are stored and can be access by `https://localhost:3000/` or `https://localhost:3000/home`. Check out the NextJS documentation for [dynamic routes](https://nextjs.org/learn/basics/dynamic-routes).
-   `src/styles`
    -   Where the `global.css` global style is stored. Additional stylesheets are discouraged since we now have a global .css.
-   `src/components`
    -   Place your components here for readability of code.
-   `src/lib`
    -   Place your functions for getting Prisma data, connecting to external libraries, storing custom variables, etc
-   `src/utils`
    -   Place your fetching functions here. A `fetcher.ts` file is used to fetch data from the `api` folder.
-   `src/hooks`
    -   Place your React Query hooks here. Seperate folders for the hooks of each component are advised.
-   `prisma`
    -   This is where the `prisma.schema` file is located. **Do not edit unless allowed**.

### Additional folders

-   `src/context`
    -   If we want to use the Context API or use a reducer for maintaining component state (such as toggling the open/close state of a dialog/toast). However, for projects that need intense server-side rendering, it is recommended to use `useQuery` and `useMutation` hooks instead.
-   `src/types`
    -   If we want to define custom types e.g. for the context, or compound interfaces/types. Prisma has built-in types for each database model.

## Example Code

-   The `query` page demonstrates server-side fetching using React-Query. In development, the files `pages/query.tsx`, `pages/api/data.ts`, `components/TestForm`, and `hooks/useGetData.ts` should be placed in `.gitignore`.`
-   This [repository](https://github.com/Heaverr/react-query-todo) demonstrates basic CRUD functionality for a To Do app using the said tech stack.

## References

-   [NextJS Documentation](https://nextjs.org/)
-   [Tailwind Documentation](https://tailwindcss.com/)
-   [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
-   [Prisma Schemas](https://www.prisma.io/docs/concepts/components/prisma-schema)
-   [How to Build a Fullstack App with Next.js, Prisma, and PostgreSQL](https://vercel.com/guides/nextjs-prisma-postgres)
