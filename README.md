# My NextJS bootstrap

## Project features
  - Typescript
  - NextJS
  - Prismic integration
  - Styled-components
  - @psoares/styled-utils

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
  - [ ] Edit typographies `./theme/components/Typography.tsx`
  - [ ] Edit global styling `./theme/components/GlobalStyle.tsx`
  - [ ] Edit html tags style for Prismic parsing in `./theme/components/RichTextContent.tsx`
  - [ ] Edit Prismic serializer in `./prismic/components/RichText.tsx`
  </details>
</li>
<li> <details><summary>Build it</summary>

  - Pages
    - [ ] Add pages main components in `./page-components` and then import them in `./pages`. Use created examples as boilerplate.

  - Components
    - [ ] Create layout components according project design in `./components` and then use them in `./pages/_app`
    - [ ] Update the style of the flyout component in `./components/CookieConsent/CookieConsentRequest.tsx`.
    - [ ] Update the style for the page spinner in `./components/PageSpinner.tsx`.

  - Modals
    - [ ] Edit generic layout modal style in `./modals/BaseModal.tsx`
    - [ ] Create content for different modals in `./modals/templates`. Check `./modals/templates/ModalExample.tsx` as example.
    - [ ] Register all components in `./modals/templates/index.tsx` in order to work.
    - [ ] use `useModal` to open and pass options and properties to template. View example in `./components/Header.tsx`.

  - Theme Components
    - [ ] Go through `./theme/components` and edit / create more.
      Probably, there's some components that will not need any specific styling like:
        - `Icon`
        - `Div`
        - `Grid`
        - `List`
        - `Main`

  - Slices
    - [ ] Edit slices to match project design in `./slices/[SLICE].js | .jsx | .ts | .tsx`
  </details>
</li>
<li> <details><summary>Before publish</summary>

  - [ ] Update `./pages/server-sitemap.xml.tsx` to match project requirements
  - [ ] Create project in Vercel and link it to git repo
  - [ ] Make sure all env vars are updated locally and in Vercel
  - [ ] Create webhook in Prismic: Settings > Webhooks
    ```
    Name: 'Vercel deploy'
    URL: Create in Vercel: Settings > Git > Deploy Hooks
    ```
  </details>
</li>
</ol>

## Detailed content list
<ul>
<li> <details><summary>Components</summary><blockquote>

  - [x] PageSpinner
  - CookieConsent
    - [x] `useCookieConsent` hook
    - [x] `CookieConsent` wrapper component
    - [x] `CookieConsentRequest` flyout component
  - [x] SEO component
  - [x] Str
  - [x] Header (as example and Prismic data consumer)
</blockquote></details>
</li>

<li> <details><summary>Generic</summary><blockquote>

  - [x] Robots support
  - [x] Sitemap support
  - [x] `useClickOutside` hook
  - [x] `useOnScroll` hook
  - [x] `useOnWindowResize` hook
</blockquote></details>
</li>

<li> <details><summary>Modals</summary><blockquote>

  - [x] `ModalProvider` to register and provide context
  - [x] `ModalManager` to handle all the generic modal behaviors
  - [x] `useModal` hook to open, close and access active modal
  - [x] `BaseModal` as generic layout for all modals
  - [x] templates/ModalExample as example
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