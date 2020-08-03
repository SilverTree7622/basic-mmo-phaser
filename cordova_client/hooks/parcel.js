const Bundler = require('parcel-bundler');
const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = async function (ctx) {
	if (!ctx.opts.options) {
		return;
	}

	if (!ctx.opts.options['live-reload'] && !ctx.opts.options['l']) {
		let tmpOutDir;
		let tmpPublicUrl;
		let tmpPop = ctx.opts.platforms[0];

		console.info('-----> Parcel build to each platforms dist');
		// console.info('ctx:', ctx);
		// console.info('tmpPop:', tmpPop);

		if (tmpPop === 'android') {
			tmpOutDir = './dist_android';
			tmpPublicUrl = '/android_asset/www/';
		}
		else if (tmpPop === 'browser') {
			tmpOutDir = './dist_browser';
			tmpPublicUrl = '/';
		}
		else {
			console.info('this is not options');
		}

		try {
			const bundler = new Bundler(path.join(__dirname, '../src/index.html'), {
				outDir: tmpOutDir,
				publicUrl: tmpPublicUrl,
				watch: false,
			});
			await bundler.bundle();

			const content = fs.readFileSync('./config.xml', 'utf8').replace(/<content.*/, `<content src="index.html" />`);
			fs.writeFileSync('./config.xml', content);

		}
		catch (e) {
			console.info('error:', e);
		}
	} else {
		console.info('-----> Parcel start dev server');

		const bundler = new Bundler(path.join(__dirname, '../src/index.html'), {
			outDir: './www',
			publicUrl: '/',
		});

		const app = express();

		app.use(express.static(path.join(__dirname, '../platforms/android/platform_www/')));
		app.use(bundler.middleware());

		const port = await new Promise((resolve, reject) => {
			const listener = app.listen(() => {
				resolve(listener.address().port);
			});
		});

		const ipAddress = getIpAddress();

		const content = fs.readFileSync('./config.xml', 'utf8').replace(/<content.*/, `<content src="http://${ipAddress}:${port}/" />`);
		fs.writeFileSync('./config.xml', content);
	}

	console.info('-----> Parcel end');
};

function getIpAddress() {
	const ifaces = os.networkInterfaces();
	for (const key in ifaces) {
		for (const iface of ifaces[key]) {
			if (iface.family === 'IPv4' && iface.internal === false) {
				return iface.address;
			}
		}
	}
}
