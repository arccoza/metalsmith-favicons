# Metalsmith Favicons

A Metalsmith plugin that will generate all your favicons (using [favicons][1]) from a suitable source image.


## Install

`npm install metalsmith-favicons --save`


## Options

metalsmith-favicons takes options similar to [favicons][1], with some small additions and changes.
Below is a list of properties and their defaults.

```js
{
  src: '**/favicon.png',          // A pattern defining your source image used to generate favicons.
  dest: false,                    // The destination directory, same as src dir if not set.
  appName: null,                  // Your application's name. `string`
  appDescription: null,           // Your application's description. `string`
  developerName: null,            // Your (or your developer's) name. `string`
  developerURL: null,             // Your (or your developer's) URL. `string`
  background: "#fff",             // Background colour for flattened icons. `string`
  url: "/",                       // Absolute URL for OpenGraph image. `string`
  display: "standalone",          // Android display: "browser" or "standalone". `string`
  orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
  version: "1.0",                 // Your application's version number. `number`
  logging: false,                 // Print logs to console? `boolean`
  online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
  icons: {
    android: false,              // Create Android homescreen icon. `boolean`
    appleIcon: false,            // Create Apple touch icons. `boolean`
    appleStartup: false,         // Create Apple startup images. `boolean`
    coast: false,                // Create Opera Coast icon. `boolean`
    favicons: true,              // Create regular favicons. `boolean`
    firefox: false,              // Create Firefox OS icons. `boolean`
    opengraph: false,            // Create Facebook OpenGraph image. `boolean`
    twitter: false,              // Create Twitter Summary Card image. `boolean`
    windows: false,              // Create Windows 8 tile icons. `boolean`
    yandex: false                // Create Yandex browser icon. `boolean`
  }
}
```

## Example

metalsmith.json config example:

```js
{
  "plugins": {
    "metalsmith-favicons": {
      src: '**/logo.png',
      dest: 'favicons/',
      icons: {
        android: true, 
        appleIcon: true, 
        favicons: true
      }
    }
  }
}
```

Build script example:

```js
var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var favicons = require('metalsmith-favicons');


metalsmith(__dirname)
  .source('src')
  .destination('pub')
  .use(favicons({
    src: '**/logo.png',
    dest: 'favicons/',
    icons: {
      android: true, 
      appleIcon: true, 
      favicons: true
    }
  }))
  .use(markdown({
    gfm: true,
    tables: true
  }))
  .build(function (err) {
    if (err) {
      throw err;
    }
  });
```

metalsmith-favicons will add a `favicons` property to `metalsmith.metadata()` with one property `html`, 
which is an array of the `meta` and `link` tags for use in your templates. Loop over this `html` array to add the needed 
tags in your html head so your new favicons show up on your site.

An example in Jade:

```js
html
  head
    if favicons && favicons.html
      each item in favicons.html
        != item
```

## Caveats

You need Node 4.x or above, see [favicons][1] for more info.



[1]: https://github.com/haydenbleasel/favicons
