# grunt-selenium

> Starts a Selenium server in the background.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-selenium --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-selenium');
```

## The "selenium" task

### Overview
In your project's Gruntfile, add a section named `selenium` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  selenium: {
    options: {
      version: '2.37.0',
      drivers: [{
        name: 'chrome',
        filename: 'chromedriver'
      }, {
        name: 'ie',
        filename: 'IEDriverServer'
      }],
      hostname: 'localhost',
      port: 4444,
      timeOut: 10000
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.path
Type: `String`
Default value: `'node_modules/protractor/selenium'`

Path to the Selenium server Jar file and web driver files.

#### options.filenamePrefix
Type: `String`
Default value: `'selenium-server-standalone-'`

Prefix for the Selenium server Jar file. The version number and file extension will be appended.

#### options.version
Type: `String`
Default value: `'2.37.0'`

Version number for Selenium server. Appended to the filenamePrefix.

#### options.drivers
Type: `Array`
Default value: `'[{ name: 'chrome', filename: 'chromedriver' }]'`

Array of webdrivers to use.

#### options.drivers.name
Type: `String`

Name of the webdriver, used in the command line argument to pass the driver: `-Dwebdriver.name.driver=...`.

#### options.drivers.filename
Type: `Array`

Filename of the webdriver, without extension.

#### options.hostname
Type: `String`
Default value: `'localhost'`

Hostname or IP address of Selenium.

#### options.port
Type: `Integer`
Default value: `'4444'`

Port number of Selenium.

#### options.timeOut
Type: `Integer`
Default value: `'10000'`

Time out in milliseconds. If Selenium server doesn't start within the
given time, the server is stopped.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  selenium: {
    options: {
      version: '2.37.0'
    },
    e2e-unix: {
      options: {
        drivers: [{
          name: 'chrome',
          filename: 'chromedriver'
        }]
      }
    },
    e2e-win: {
      options: {
        drivers: [{
          name: 'ie',
          filename: 'IEDriverServer'
        }]
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
