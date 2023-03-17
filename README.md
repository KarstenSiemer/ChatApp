# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

See https://www.youtube.com/watch?v=doDKaKDvB30 for a video walkthrough of this template.
    * https://github.com/huntabyte/sveltekit-pocketbase-auth/tree/final

See https://www.youtube.com/watch?v=gUYBFDPZ5qk for next steps
    * https://github.com/fireship-io/pocketchat-tutorial/tree/main/src
## Setup

```bash
# setup database
mkdir pocketbase
cd pocketbase
wget "https://github.com/pocketbase/pocketbase/releases/download/v0.7.9/pocketbase_0.7.9_darwin_amd64.zip"
unzip pocketbase_0.7.9_darwin_amd64.zip
./pocketbase serve

# install deps
npm install
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
