
# Step by step

Note: I'm not doing any Docker stuff here. This is 100% NodeJS (18+) which doesn't need the extra layers of complexity and web server magic.

## Bootstrap a Next.JS app from scratch

https://nextjs.org/docs/getting-started

tl;dr:

```sh
pnpm create next-app --typescript
```

It'll walk you through it.

I did say yes to the beta `app` feature but I rolled that back manually since all the guides for Yoga and whatnot are for the older style `pages`. I'd suggest not using the beta feature, since our backend routing should be simplistic for most apps.

HOWEVER, React 18 server components are only for the new app beta directory. Might want to swap to that to take full advantage of those: https://nextjs.org/docs/advanced-features/react-18/server-components


## Add debugger support

https://nextjs.org/docs/advanced-features/debugging

I added the launch.json for VSCode-based debugging so I can do serverside breakpoints.

Do your usual VSCode debugging session via ctrl+shift+D to run through the debugger instead of a `pnpm dev` call.


## Add GraphQL support

We're sticking with typedef-based GraphQL for APIs moving forward. The JS ecosystem has MUCH more powerful (and faster) GQL servers than the garbage we're using in PHP.

This was a bit outdated but I liked how they structured the files, because a production app isn't going to have all the typedefs and resolvers in the graphql.ts file. But I don't like apollo-server-micro as a package. Wanted to do Yoga instead (more active development, plugin-stack, etc)
https://www.smashingmagazine.com/2020/10/graphql-server-next-javascript-api-routes/

Official Yoga instructions for using with Next.js:
https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-nextjs


## ❓ Using .gql files for typedefs

I wanted to match what we do in PHP and use separate GQL files for typedefs.

You *can* use TypeScript files if you want it dynamic and all that, but I'm also using GraphQL Codegen to generate TypeScript types on both the client and server automatically (like our old apps).


### Still Uncertain

Honestly don't know which direction to lean. It depends on codegen integration and how fluid that is if we're basing it off the URL vs the files directly.

If we need .gql files, we need to also update webpack to include it with the NextJS deployments (or some other method). Otherwise readFileSync won't see the files.

E.g. https://dev.to/richardtorres314/graphql-files-in-nextjs-o73


## Add our frontend components

UI 5 is still in alpha, so use the alpha channel:

```sh
pnpm i @osuresearch/ui@alpha
```

(Note that react-hook-form is currently a peer, this'll be fixed in a future patch)

Since I want RUI's provider and CSS available on all pages, I added an `_app.tsx` and installed it as a global wrapping component.

See:
https://nextjs.org/docs/basic-features/built-in-css-support

For a TypeScript equivalent, I used https://github.com/vercel/next.js/tree/canary/examples/next-css as the example.

## Figure out types

I wanted GraphQL typedefs and resolvers in separate files than the main API resolver. But I couldn't figure out how to type it. This thread helped:

https://community.apollographql.com/t/typescript-types-for-resolvers/5272/2


## Setup locale for a11y

https://dev.to/dawsoncodes/how-to-set-html-lang-attribute-in-nextjs-39bg

tl;dr: So I can get language info into the generated document without having to completely override Next.js' document.

## Put together some queries

I do serverside to serverside GraphQL (and REST) queries using axios. It's a pretty straightforward client, but here's a simple tl;dr:

https://medium.com/@stubailo/how-to-call-a-graphql-server-with-axios-337a94ad6cf9



## Add GraphQL Codegen

We use graphql-codegen in most apps today, where it generates frontend TypeScript types from .gql files. I'm doing a similar setup here, but with MORE plugins to also generate types for backend resolvers so we can have everything strictly typed off of the schemas, rather than having to duplicate types for the resolver args.

Basically followed this guide for GraphQL Yoga:
https://the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga



## Add Styled Components

I have some CSS work I want to do on top of what RUI provides, so I added styled-components support.

You need to add it as a compiler option in `next.config.js`, otherwise it doesn't handle bundling styles correctly.


#  Other Resources

Want to look into doing Yoga + AWS so developers don't need to learn a different serverside GraphQL provider:

https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-aws-lambda





NextJS is neat because:
- React on the server and client
- All the things that confuse developers, such as server being on a different port than the client is no longer a thing
- Fast as fuck, boi
- Actually works with VSCode's debugger
- SSR / and a per-component SSR opt-out
- Better error checking.
  E.g. I added a resolver for a person2 query but nothing in the schema. It threw the following error:

  error - Error: Query.person2 defined in resolvers, but not in schema



https://aws.amazon.com/blogs/mobile/amplify-next-js-13/
  Amplify / SSR
  Seems AWS's amplify hosting feature is to tie in
  a Git repo with some settings config.


https://the-guild.dev/graphql/yoga-server/docs/features/sofa-api
My god.

# Things Missing

## Testing

Now that I don't need PHPUnit, I'd like something that does both frontend and backend tests, component level, e2e, all that.

Playwright, Cypress, Jest are all on the table. But I've made no choice yet.

Some references:
- https://www.perfecto.io/blog/playwright-vs-cypress
- https://nextjs.org/docs/testing

Amplify works with Cypress, so that'll probably be the route to go for e2e: https://docs.aws.amazon.com/amplify/latest/userguide/running-tests.html

## Logging

Assuming we're using Yoga for 100% the API, then:
https://the-guild.dev/graphql/yoga-server/docs/features/logging-and-debugging

Just need some formatters, and figuring out log stream things for getting it to Splunk from wherever it's deployed.

## Auth with Shibboleth and RBAC

Since we're not running under Apache, Shibboleth is an unknown. That's one of the more complicated issues we'll need to solve architecturally.

However, once we do figure it out, make an adapter!
https://nextjs.org/docs/authentication

Might also want to check out:
https://github.com/nextauthjs/next-auth/issues/311

## Deployment

Probably using Amplify.
Note that it doesn't support Next 13's app directory:
https://docs.aws.amazon.com/amplify/latest/userguide/ssr-Amplify-support.html

Issues I've ran into so far:
- forgot to run the linter beforehand. Thus failed.
- I guess I can't put non-page-components into the `pages` directory (had nav in there) but it only complained during the build, not in dev.

Having a stricter dev mode would be nice, getting devs to do a build before deployment themselves or them having to look into AWS logs is cumbersome. Esp. if we lock them out of AWS.

## Handling responsive breakpoints serverside

Initial mount of content assumes a breakpoint that is incorrect since we prerender components, and anything that is breakpoint-dependent isn't updated. Need a solution for ensuring they re-apply styles for breakpoint changes after initial mount.

Example: `Grid` with responsive points.

# Cool things

### Built-in GraphQL editor

This is more a GraphQL Yoga feature but the server does provide an editor when you directly access the endpoint via a browser:

http://localhost:3000/api/graphql

It's just GraphiQL, nothing super fancy.

### MDX support!

- https://nextjs.org/docs/advanced-features/using-mdx
- Mostly for marketing / doc / content heavy sites.
  But using it in Docusaurus/Storybook, it's super nice.
  And you can do a `# title` instead of our `<Heading level={1}>title</Heading>`.
- I'll probably write an MDX plugin layer for RUI at some point 😉

### SSR Dynamic Routing

https://nextjs.org/docs/routing/dynamic-routes

Instead of React-Router (client side only) you can do some serverside routing for pre-rendering content.
