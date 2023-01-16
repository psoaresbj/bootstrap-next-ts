# My NextJS bootstrap

## Config checklist

<ol>
<li> <details><summary>Initial setup</summary>

  - [ ] Copy `./.env.dist` to `./.env` and update files - Don't forget, always update both and don't use secrets or any keys in `./.env.dist`
  - [ ] Install dependencies:
    ```bash
    nvm use
    yarn
    ```
  </details>
</li>
<li> <details><summary>Set up Prismic</summary>

  - [ ] Add locales to `./locales-config.json`
  - [ ] Edit `./sm.json` and update `apiEndpoint`
  - [ ] Update and push to prismic repository custom types and slices using slice machine: `$ yarn slicemachine`
    Don't forget to add specific fields for SEO (check example at `./customTypes/page/index.json`)
  - [ ] Edit routes for paths in `./prismic/routes.ts`
  - [ ] Edit link resolver to match project requirements in `./prismic/linkResolver.ts`
  - [ ] Add preview path in Prismic: Settings > Previews
    ```
    Site Name: 'Production' or 'Development'
    Domain: 'https://[project domain]' or 'http://localhost:3000'
    Preview route: '/api/preview'
    ```
  - [ ] Edit config api method adding project config document types: `./prismic/api/getConfig.ts`
  - [ ] Go ahead and understand what's happen in `./pages/_app` with `DataProvider`. Check `./page-components/Page.tsx` to understand implementation of the data hooks
  </details>
</li>
<li> Run the project

```bash
yarn dev
```
</li>
<li> <details><summary>Set up Theme</summary>

  - [ ] Edit `./public/manifest.json` and add favicons to `./public/img`
  - [ ] Add icons to `./.icons/main` and run `$ yarn generate:icons`
  - [ ] Add fonts to `./fonts`, create font file as `./fonts/gilroy.ts` and add it in `./pages/_app.tsx` somehow
    Next font [optimization guide](https://nextjs.org/docs/basic-features/font-optimization)
  - Add project theme variables
    - [ ] `breakpoints`
    - [ ] `colors`
    - [ ] `fonts`
    - [ ] `generator`
    - [ ] `grid`
  - [ ] Edit typographies `./theme/components/Typography`
  </details>
</li>
<li> <details><summary>Build it</summary>

  - [ ] Add pages main components in `./page-components` and then import them in `./pages`. Use created examples as boilerplate.
  - [ ] Create layout components according project design in `./components` and then use them in `./pages/_app`
  - [ ] Go through `./theme/components` and edit / create more.
    Probably, there's some components that will not need any specific styling like:
      - `Icon`
      - `Div`
      - `Grid`
      - `List`
      - `Main`
  - [ ] Edit slices to match project design in `./slices/[SLICE].js | .jsx | .ts | .tsx`
  </details>
</li>
<li> <details><summary>Before publish</summary>

  - [ ] Update `./pages/server-sitemap.xml.tsx` to match project requirements
  - [ ] Make sure all env vars are updated locally and in Vercel
  </details>
</li>
</ol>

## Features list
<ul>
<li> <details><summary>Components</summary><blockquote>

  - [ ] Modal component
  - Cookies
    - [ ] Flyout component
    - [ ] GA implementation
  - [x] SEO component
  - [x] Str
  - [x] Header (as example and Prismic data consumer)
</blockquote></details>
</li>

<li> <details><summary>Generic</summary><blockquote>

  - [x] Robots support
  - [x] Sitemap support
</blockquote></details>
</li>


<li> <details><summary>CMS</summary><blockquote>

  - Api
    - [x] `getConfig` function as example
  - Data provider
    - [x] `useConfig` hook
    - [x] `usePage` hook
    - [x] `useTranslations` hook
  - Utils
    - [x] bracked
    - [x] extractFromData
    - [x] parse
    - [x] sentenceCase
  - [x] RichText & Serializer
  - [x] Slicemachine integration
  - [x] Preview integration
  - [x] Multilang integration
  - [x] Prismic Base Integration
</blockquote></details>
</li>

<li> <details><summary>Theme</summary><blockquote>

  - Style-guide page
    - [x] Typography
    - [x] Colors
    - [x] Icons
  - [x] Rich text content
  - Grid components
    - [x] `Grid`
    - [x] `Row`
    - [x] `Col`
  - [x] List component
  - [x] Typography components
  - [x] Icon component
  - Base layout components
    - [x] `Div`
    - [x] `Main`
    - [x] `Section`
  - [x] Global style
  - [x] Generator config
  - [x] Base theme config
</blockquote></details>
</li>

<li> <details><summary>Base</summary><blockquote>

  - [x] Eslint + Typescript config
  - [x] Next base config
</blockquote></details>
</li>
</ul>