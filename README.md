# Frontend Template with Grunt Task Runner 

Frontend Template on steroids


## Getting Started
Grunt and Grunt plugins are installed and managed via npm, the Node.js package manager.
Grunt 0.4.x requires stable Node.js versions >= 0.8.0. Odd version numbers of Node.js are considered unstable development versions.

##Installing the CLI
If you're upgrading from Grunt 0.3, please see Grunt 0.3 Notes

In order to get started, you'll want to install Grunt's command line interface (CLI) globally. You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.

npm install -g grunt-cli
This will put the grunt command in your system path, allowing it to be run from any directory.

Note that installing grunt-cli does not install the Grunt task runner! The job of the Grunt CLI is simple: run the version of Grunt which has been installed next to a Gruntfile. This allows multiple versions of Grunt to be installed on the same machine simultaneously.


##Install Dev Dependencies
```
$ npm install

```
###Watch SASS changes
```
$ grunt

```
###Build Release
```
$ grunt build

```

###Why use a task runner?

In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort.

###Why use Grunt?
The Grunt ecosystem is huge and it's growing every day. With literally hundreds of plugins to choose from, you can use Grunt to automate just about anything with a minimum of effort. If someone hasn't already built what you need, authoring and publishing your own Grunt plugin to npm is a breeze.

### What can this do?

* Local Connect web-server
* Live reloading
* HTML5 Boilerplate
* Integration of PureCSS, Bootstrap or Foundation
* Compiling PHP templates to HTML
* Compiling Sass and Less
* RequireJS
* JS testing with Mocha, Qunit or Jasmine
* Plato Reports
* CSS and JS minification
* Strip unused CSS with grunt-uncss
* Image optimization
* HTML and JS linting
* Custom Modernizr build



