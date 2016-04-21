var favicons = require('favicons');
var minimatch = require('minimatch');
var path = require('path');


module.exports = exports = function(options) {
  var defaults = {
    src: '**/favicon.png',
    dest: false,
    appName: null,                  // Your application's name. `string` 
    appDescription: null,           // Your application's description. `string` 
    developerName: null,            // Your (or your developer's) name. `string` 
    developerURL: null,             // Your (or your developer's) URL. `string` 
    background: "#fff",             // Background colour for flattened icons. `string` 
    path: "favicons/",                      // Path for overriding default icons path. `string` 
    url: "/",                       // Absolute URL for OpenGraph image. `string` 
    display: "standalone",          // Android display: "browser" or "standalone". `string` 
    orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string` 
    version: "1.0",                 // Your application's version number. `number` 
    logging: false,                 // Print logs to console? `boolean` 
    online: false,                  // Use RealFaviconGenerator to create favicons? `boolean` 
    icons: null
  }
  var icons = {
    android: false,              // Create Android homescreen icon. `boolean` 
    appleIcon: false,            // Create Apple touch icons. `boolean` 
    appleStartup: false,         // Create Apple startup images. `boolean` 
    coast: false,                // Create Opera Coast icon. `boolean` 
    favicons: true,             // Create regular favicons. `boolean` 
    firefox: false,              // Create Firefox OS icons. `boolean` 
    opengraph: false,            // Create Facebook OpenGraph image. `boolean` 
    twitter: false,              // Create Twitter Summary Card image. `boolean` 
    windows: false,              // Create Windows 8 tile icons. `boolean` 
    yandex: false                // Create Yandex browser icon. `boolean` 
  }
  
  options = options ? Object.assign(defaults, options) : defaults;
  options.icons = options.icons ? Object.assign(icons, options.icons) : icons;

  return function metalsmithFavicons(files, metalsmith, done) {
    var destDir = null;
    var srcPath = null;
    var srcFile = null;

    var callback = function (err, res) {
      if (err) {
        // console.log(error.status);  // HTTP error code (e.g. `200`) or `null` 
        // console.log(error.name);    // Error name e.g. "API Error" 
        // console.log(error.message); // Error description e.g. "An unknown error has occurred"
        throw new Error(err);
      }

      // console.log('i---\n', res.images);   // Array of { name: string, contents: <buffer> } 
      // console.log('f---\n', res.files);    // Array of { name: string, contents: <string> } 
      // console.log('h---\n', res.html);     // Array of strings (html elements) 

      for(var i = 0, img; img = res.images[i++];) {
        img.filename = img.name;
        files[path.join(destDir, img.name)] = img;
      }

      for(var i = 0, f; f = res.files[i++];) {
        f.filename = f.name;
        files[path.join(destDir, f.name)] = f;
      }

      metalsmith._metadata.favicons = { html: res.html }

      done();
    }

    for(var f in files) {
      if(minimatch(f, options.src, { matchBase: true })) {
        destDir = options.dest || path.dirname(f);
        srcPath = f;
        srcFile = files[f];
        break;
      }
    }

    if(!srcFile) {
      console.warn('[metalsmith-favicons] No favicon file matching `' + options.src + '` was found, skipping.');
      done();
      return;
    }

    options.path = path.join('/', destDir);
    favicons(srcFile.contents, options, callback);
  }
}
