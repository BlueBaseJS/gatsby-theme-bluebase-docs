# gatsby-theme-bluebase-docs

> This project is a fork of [gatsby-theme-apollo-docs](https://github.com/apollographql/gatsby-theme-apollo)

This is an entirely configuration-based Gatsby theme that generates a documentation website based on a series of Markdown or MDX files. It also exports a series of [components](#components) that can be used within MDX pages.

- [Installation](#installation)
- [Configuration](#configuration)
  - [`versions`](#versions)
  - [`sidebarCategories`](#sidebarcategories)
  - [`navConfig`](#navconfig)
- [Creating pages](#creating-pages)
- [Components](#components)
  - [`Button`](#button)
  - [`ButtonLink`](#buttonlink)
  - [`ButtonWrapper`](#buttonwrapper)
  - [`ExpansionPanel`](#expansionpanel)
  - [`ExpansionPanelList`](#expansionpanellist)
  - [`ExpansionPanelListItem`](#expansionpanellistitem)
  - [`MultiCodeBlock`](#multicodeblock)
- [Deployment](#deployment)
- [Migration](#migration)
- [Examples](#examples)

## Installation

If you're using this package, you'll also need to install `gatsby` and its peer dependencies, `react` and `react-dom`. Next, install the theme:

```bash
$ npm install gatsby-theme-bluebase-docs
```

## Configuration

You can configure `gatsby-theme-bluebase-docs` for use with any set of docs using the provided configuration options. You may also use [component shadowing](../gatsby-theme-apollo-core#logotitle) to customize elements like the logo or color scheme.

```js
// gatsby-config.js
module.exports = {
	pathPrefix: '/docs/apollo-server',
	plugins: [
		{
			resolve: 'gatsby-theme-bluebase-docs',
			options: {
				root: __dirname,
				subtitle: 'Apollo Server',
				description: 'A guide to using Apollo Server',
				githubRepo: 'apollographql/apollo-server',
				defaultVersion: '2',
				versions: {
					1: 'origin/version-1',
				},
				sidebarCategories: {
					null: ['index', 'getting-started', 'whats-new'],
					Features: [
						'features/mocking',
						'features/errors',
						'features/data-sources',
					],
				},
			},
		},
	],
};
```

| Option name       | Type   | Description                                                                                                          |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| root              | string | Must be `__dirname`                                                                                                  |
| siteName          | string | The main title for the website, used in the `<title>` element and top left corner of the site                        |
| subtitle          | string | The page title that gets rendered above the sidebar navigation                                                       |
| description       | string | The site description for SEO and social (FB, Twitter) tags                                                           |
| contentDir        | string | The directory where docs content exists (`docs/source` by default)                                                   |
| githubRepo        | string | The owner and name of the content repository on GitHub                                                               |
| spectrumPath      | string | The path to be appended to Spectrum links                                                                            |
| trackingId        | string | Your Google Analytics tracking ID                                                                                    |
| algoliaApiKey     | string | Your [Algolia DocSearch](https://community.algolia.com/docsearch/) API key                                           |
| algoliaIndexName  | string | The name of your DocSearch index                                                                                     |
| baseUrl           | string | The origin where your website will be hosted (e.g. `https://www.apollographql.com`)                                  |
| twitterHandle     | string | Your Twitter handle, without the "@"                                                                                 |
| versions          | array  | An array of objects representing the versions that the website should generate                                       |
| sidebarCategories | object | An object mapping categories to page paths (see [`sidebarCategories` reference](#sidebarcategories))                 |
| navConfig         | object | An object defining the top-left navigation links (see [`navConfig` reference](#navconfig))                           |
| checkLinksOptions | object | Options accepted by [`gastby-remark-check-links`](https://github.com/trevorblades/gatsby-remark-check-links#options) |

### `versions`

If omitted, only one version of docs will be built, based on the files in the theme consumer repository. If provided, the `versions` option expects an object mapping older versions' labels to their respective git branch. The current filesystem will still determine the "default" version. The default label for this version is "Latest", but is configurable by the `defaultVersion` option.

```js
defaultVersion: '2.5',
versions: {
  '2.4': 'version-2.4'
}
```

### `sidebarCategories`

The `sidebarCategories` option is an object keyed by category titles. Each entry in the object is an array of page paths. The path should resemble the location of a Markdown/MDX file in the git repository, relative to `contentDir`, and without the _.md_ extension. Sidebar navigation items that are **not** a member of a category live under the `null` key. To add an external link to your sidebar, your can provide a string formatted like a Markdown link.

```js
{
  null: [
    'index',
    'getting-started',
    'whats-new'
  ],
  Features: [
    'features/mocking',
    'features/errors',
    'features/data-sources'
  ],
  'External links': [
    '[Principled GraphQL](https://principledgraphql.com/)'
  ]
}
```

### `navConfig`

The `navConfig` option should be an object keyed by page paths, with their values being some configuration for their link in the nav. You should supply a `text` property, and may want to use optional `matchRegex` and/or `subpages` properties.

- `matchRegex` allows for finer control over when a nav item should appear active. If omitted, an equality comparison between the current page path and the path key will be used.
- `subpages` is an object with paths as keys and link text as values. It's used to render a dropdown below the main link on hover.

```js
{
  '/docs': {
    text: 'Platform',
    matchRegex: '^/docs/(?!tutorial)'
  },
  '/docs/tutorial/introduction': {
    text: 'Tutorial',
    matchRegex: '^/docs/tutorial'
  },
  '/docs/react': {
    text: 'Client',
    subpages: {
      '/docs/react': 'React + React Native',
      '/docs/angular': 'Angular',
      'https://github.com/akryum/vue-apollo': 'Vue.js',
      '/docs/link': 'Apollo Link',
      '/docs/ios': 'Native iOS',
      '/docs/android': 'Native Android',
      '/docs/scalajs': 'Scala.js'
    }
  }
}
```

## Creating pages

This theme generates pages based on Markdown or MDX files in the [`contentDir`](#configuration) directory of a repo. Your Markdown/MDX files should contain some frontmatter defining their titles and descriptions.

```markdown
---
title: Introduction
description: What is Apollo Server and what does it do?
---

Apollo Server is the best way to quickly build a production-ready, self-documenting API for GraphQL clients, using data from any source.
```

Page URLs will be derived from the file paths of your Markdown. You can nest Markdown files within directories to create pages with additional path segments.

## Components

This theme exports React components that you can use in MDX files throughout a documentation website.

### `Button`

A button that follows our [Space Kit](https://github.com/apollographql/space-kit) design system. See [the project in Zeplin](https://app.zeplin.io/project/5c7dcb5ab4e654bca8cde54d/screen/5cc9f226cbd69a34a84890ae) for a visual look at the different button variations.

| Prop     | Type   | Default value | Description                          |
| -------- | ------ | ------------- | ------------------------------------ |
| children | node   | N/A           | The content of the button            |
| size     | string | "medium"      | One of "small", "medium", or "large" |
| color    | string | "standard"    | Either "standard" or "branded"       |
| variant  | string | "standard"    | Either "standard" or "hidden"        |

### `ButtonLink`

A button that functions as an internal link using [Gatsby Link](https://www.gatsbyjs.org/docs/gatsby-link/). It accepts all props that the [`Button`](#button) and [`Link`](<(https://www.gatsbyjs.org/docs/gatsby-link/)>) components accept.

```jsx
import { ButtonWrapper, ButtonLink } from 'gatsby-theme-bluebase-docs';

<ButtonWrapper>
	<ButtonLink size="large" color="branded" to="/tutorial/introduction">
		Try it out!
	</ButtonLink>
	<ButtonLink size="large" to="/intro/platform">
		Learn more
	</ButtonLink>
</ButtonWrapper>;
```

### `ButtonWrapper`

A presentational component that only takes `children` and is designed to render a row of [`Button`](#button) or [`ButtonLink`](#buttonlink) components, center-aligned and evenly spaced.

### `ExpansionPanel`

An expandable panel of content used to hide complex information or instructions that might be a tangent from the main topic of the content it lives within.

| Prop     | Type   | Description                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| children | node   | The content of the panel, usually includes an `ExpansionPanelList` |
| title    | string | The title of the panel, visible even when the panel is closed      |

### `ExpansionPanelList`

A wrapper element that should be used in conjunction with [`ExpansionPanelListItem`](#expansionpanellistitem) components. It renders an `li` element with some styles baked in.

### `ExpansionPanelListItem`

A list item for use with the `ExpansionPanelList`. It comes with a cicular area to its left to render a number, glyph, or some way to indicate progress through a set of instructions. You can write Markdown within these elements if you keep everything detabbed and add an empty line between your content and the component's opening and closing tags.

| Prop     | Type   | Description                                                                            |
| -------- | ------ | -------------------------------------------------------------------------------------- |
| children | node   | The content of the list item, usually a block of Markdown                              |
| number   | string | The number displayed to the left of the list item, or a checkmark if "check" is passed |

```js
import {
	ExpansionPanel,
	ExpansionPanelList,
	ExpansionPanelListItem,
} from 'gatsby-theme-bluebase-docs';

<ExpansionPanel title="How to use the ExpansionPanel component">
	Add a line break _between_ JSX tags and content to parse the content as
	*Markdown*
	<ExpansionPanelList>
		<ExpansionPanelListItem number="1">
			<h4>h4 works well as a heading here</h4>- markdown - works - here
		</ExpansionPanelListItem>
		<ExpansionPanelListItem number="check">
			<h4>That's it!</h4>> MDX is super fun
		</ExpansionPanelListItem>
	</ExpansionPanelList>
</ExpansionPanel>;
```

### `MultiCodeBlock`

Wraps adjacent code blocks to allow users to toggle between them using a dropdown menu.

````js
import {MultiCodeBlock} from 'gatsby-theme-bluebase-docs';

<MulitCodeBlock>

```js
// a JavaScript code block
```

```ts
// a TypeScript code block
```

</MultiCodeBlock>
````

## Deployment

All docs sites will eventually be deployed into a subdirectory, as configured by the `pathPrefix` option&mdash;/docs/apollo-server, for example. [Read this guide](../gatsby-theme-apollo-core/#deploying-to-a-subdirectory) to learn more about publishing to a subdirectory.

## Migration

To migrate an older Hexo site to this theme, [follow this guide](MIGRATION.md).

## Examples

- [Apollo](https://www.apollographql.com/docs)
- [Analytics](https://getanalytics.io)

Are you using this theme in your own project? Submit a PR with your website added to this list!
