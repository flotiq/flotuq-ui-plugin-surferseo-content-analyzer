[[_TOC_]]

# SurferSeo integration plugin

## Usage

### Overview

This plugin integrates Surfer SEO into your application, enabling advanced text analysis for selected input fields. It
provides real-time SEO insights and recommendations, helping you optimize your content directly within your workflow.

### Configuration

The plugin requires you to select a Content Type Definition (CTD) and a rich text field for which the SEO analysis will
be performed. The analysis window will be displayed in the sidebar during content creation and editing, providing
real-time SEO analysis of the content from the selected rich text field. This seamless integration ensures that users
can optimize their content as they work, without needing to switch between tools

> **Note**: The plugin also supports optional fields such as title, whose content will be processed as an `<h1>`.
> lead, whose content will be analyzed as a `<p>` and FAQ, whose content will also be included in the analysis.

![](.docs/images/settings-screen.png)

**The fields selected in the plugin configuration will be passed for analysis in the following format.**

```html

<body>
   <h1>{{Title}}</h1>
   <p>{{Lead}}</p>
   {{source}}
   
   <h2>Frequently Asked Questions</h2>
   <div>
       <h3>{{question.1}}</h3>
       <div>{{question.1}}</div>
   </div>
   <div>
       <h3>{{question.2}}</h3>
       <div>{{question.2}}</div>
   </div>
   {{...}}
</body>
```

It's worth noting that if an optional field is not selected, it will not be included in the analysis. For example, if
the title field is left empty, the `<h1>` tag **will not be sent for analysis.**

### Usage

> **Note**: You must be logged into your Surfer SEO account and enable third-party cookies in your browser for this
> integration to function properly.

First, select the keywords you want to target for analyzing your content. These keywords will guide the SEO
recommendations and help optimize your text effectively. Choosing relevant keywords is essential to ensure the analysis
aligns with your goals.

![](.docs/images/select-key-words.png)

Next, select the tag of interest from the list of available tags.

![](.docs/images/tag-list.png)

Now, the content of the selected field will be analyzed based on the tags you have chosen.

![](.docs/images/analize.png)

You can read more about SurferSeo
plugin [here](https://surferseo.notion.site/Surfer-Guidelines-in-your-CMS-ba2ea6b1a3234850bc1b49caa1a7acda)

## Quick start

1. `yarn` - to install dependencies
2. `yarn start` - to start development mode - rebuild on file modifications
3. update your `plugin-manifest.json` file to contain the production URL and other plugin information
4. `yarn build` - to build plugins

## Dev environment

Dev environment is configured to use:

* `prettier` - best used with automatic format on save in IDE
* `eslint` - it is built into both `start` and `build` commands

## Output

The plugins are built into a single `dist/index.js` file. The manifest is copied to `dist/plugin-manifest.json` file.

## Deployment

<!-- TO DO -->

## Loading the plugin

**Warning:** While developing, you can use  `https://localhost:3053/plugin-manifest.json` address to load the plugin
manifest. Make sure your browser trusts the local certificate on the latter, to be able to use it e.g.
with `https://editor.flotiq.com`

### URL

**Hint**: You can use localhost url from development mode `https://localhost:3053/index.js`

1. Open Flotiq editor
2. Open Chrome Dev console
3. Execute the following script
   ```javascript
   FlotiqPlugins.loadPlugin('plugin-id', '<URL TO COMPILED JS>')
   ```
4. Navigate to the view that is modified by the plugin

### Directly

1. Open Flotiq editor
2. Open Chrome Dev console
3. Paste the content of `dist/index.js`
4. Navigate to the view that is modified by the plugin

### Deployment

**Hint**: You can use localhost url from development mode `https://localhost:3053/plugin-manifest.json`

1. Open Flotiq editor
2. Add a new plugin and paste the URL to the hosted `plugin-manifest.json` file
3. Navigate to the view that is modified by the plugin
