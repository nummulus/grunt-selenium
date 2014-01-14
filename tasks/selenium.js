/*
 * grunt-selenium
 * https://github.com/nummulus/grunt-selenium
 *
 * Copyright (c) 2014 Johan Flint
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var http = require('http');
var os = require('os');
var path = require('path');

module.exports = function(grunt) {
	grunt.registerMultiTask('selenium', 'Starts a Selenium server in the background.', function() {
		var options = this.options({
			path: 'node_modules/protractor/selenium',
			filenamePrefix: 'selenium-server-standalone-',
			version: '2.37.0',
			drivers: [{
				name: 'chrome',
				filename: 'chromedriver'
			}],
			hostname: 'localhost',
			port: 4444,
			timeOut: 10000
		});

		var done = this.async();

		var serverFile = path.join(options.path, options.filenamePrefix + options.version + '.jar');
		if (!fileExists(serverFile)) {
			grunt.fail.warn('Selenium server file not found: ' + serverFile);
		}

		var args = ['-jar'];
		args.push(serverFile);

		options.drivers.forEach(function(driver) {
			var file = path.join(options.path, executableName(driver.filename));
			if (!fileExists(file)) {
				grunt.fail.warn('Webdriver "' + driver.name + '" not found: ' + file);
			} else {
				args.push('-Dwebdriver.' + driver.name + '.driver=' + file);
			}
		});

		grunt.log.ok('Starting Selenium server');
		var seleniumServer = require('child_process').spawn(
			'java', args, { stdio: 'inherit'}
		);

		seleniumServer.on('close', function(code) {
			if (code === 0) {
				grunt.log.ok('Selenium server stopped')
			} else {
				grunt.log.error('Selenium server unexpectedly stopped with code ' + code);
			}
		});

		var timeOutTimer = setTimeout(function() {
			grunt.log.error('Selenium server didn\' start within ' + options.timeOut + ' ms, stopping server');
			clearTimeout(connectTimer);
			seleniumServer.kill();
		}, options.timeOut);

		function connect() {
			http.get('http://' + options.hostname + ':' + options.port, function() {
				clearTimeout(timeOutTimer);
				grunt.log.ok('Selenium server started');
				done();
			}).on('error', function() {
				connectTimer = setTimeout(connect, 200);
			});
		}

		var connectTimer = setTimeout(connect, 200);

		function executableName(file) {
			if (os.type() == 'Windows_NT') {
				return file + '.exe';
			}
			return file;
		}

		function fileExists(file) {
			return fs.existsSync(file);
		}
	});

	grunt.registerTask('selenium-shutdown', 'Stops a running Selenium server', function() {
		var options = this.options({
			hostname: 'localhost',
			port: 4444
		});

		var done = this.async();
		var url = 'http://' + options.hostname + ':' + options.port + '/selenium-server/driver/?cmd=shutDownSeleniumServer';

		http.get(url, function() {
			grunt.log.ok('Selenium server stopped');
			done();
		}).on('error', function(e) {
				grunt.log.error('Unable to stop Selenium server: ' + e.message);
				done();
			});
	});
};