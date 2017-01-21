# WebDesign-HTN
A simple dummy template made for WebDesign lecture.


## Getting Started

Compiled and production-ready code can be found in the `dist` directory or on `releases` section.
The `src` directory contains development code.

### 1. Download WebDesign-HTN on your host.

You can clone the `gh-pages` branch or download the zip from `releases` section on github

### 2. Point to your server to the project directory.

Point the root directry of yur webserver to the directory you placed the project files.

## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, and minifies.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`
* [Bower](http://bower.io) `sudo npm install -g bower`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
2. Run `bower install` to install required assets.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).
	* `gulp --production` compiles files and minify css and js.
4. The result directory is with all the files `dist`

## Browser Compatibility

WebDesign-HTN works in all modern browsers, and IE 9 and above.

WebDesign-HTN is built with modern JavaScript APIs, and CSS3 statements. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all content will be displayed by default.

## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Please apply fixes to both the development and production code. Don't forget to update the version number, and when applicable, the documentation.

## License

The code is available under the [Apache 2.0](LICENSE).