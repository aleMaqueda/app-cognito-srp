module.exports = {
	// Example setup for your project:
	// The entry module that requires or imports the rest of your project.
	// Must start with `./`!
    entry: './src/entry.js',
    mode: "development",
	// Place output files in `./dist/my-app.js`
	output: {
		path: __dirname + '/dist',
		filename: 'app.js',
	},
};