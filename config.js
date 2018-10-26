const fs = require('fs');
const path = require('path');
const replace = require('replace');

const ENV = require('./env');
//const src = (ENV === 'development' ? 'http://localhost:8081/' : '') + 'index.html';
const src = 'https://one-menu-b2c.herokuapp.com';
const config = path.resolve('./config.xml');

try {
	replace({
		regex: /<content +src="[^"]+\" *\/>/,
		replacement: "<content src=\""+src+"\"/>",
		paths: [config],
		silent: true,
	});
} catch (err) {
	console.error('ERROR: Could not replace content src in: ' + config, err);
	process.exit(1);
}
