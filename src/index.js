const { getColor } = require('./apiMock');
const colorClasses = require('./classes');
const readline = require('readline-sync');

/**
 * ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ Instructions to run application:                                                                               │
 * │                                                                                                                │
 * │ You need to pass a stringify array of colors in the order you want the output on (green first, then blue, ...) │
 * │ Then pass the type of output you want back (default hex)                                                       │
 * │                                                                                                                │
 * │ @param stringifiedArray: '["green","blue","red","black","white"]'                                              │
 * │ @param type?: HEX | RGB                                                                                        │
 * │ @param isSync?: boolean | string                                                                               │
 * │ @command node src/index.js '["green","blue","red"]' HEX                                                        │
 * └────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 */

 (() => {
	// Uncomment for debugging
	// console.log("DEBUG: ", process.argv)

	// Simple error handling
	if(!process.argv[2]) {
    console.log('Insufficient arguments! Give at least the stringified array of color names!');
		process.exit(1);
	}

	const colorsInput = JSON.parse(process.argv[2]);
	const type = process.argv[3] ? process.argv[3].toUpperCase() : 'HEX';
	const isSync = !!process.argv[4];

	getColors(colorsInput, async (colors) => {
  	const apiColors = await Promise.all(colors);
		const colorCodes = apiColors.map(color => color ? color[type] : null);

		if(!isSync) {
			// Print all colors
			console.log("Result: ", colorCodes);
			process.exit();
		}

		const it = colorCodes.values();
		let result = it.next();

		// Loop through each color
		while(!result.done) {
			console.log(result.value);
			
			// Ask the user if it want's to get the next color or end the process
			if (!readline.keyInYNStrict("Next color?")) {
				console.log("Terminating process...");
				process.exit();
			}

			result = it.next();
		}
	});
})();

/**
 * Get colors from the classes and then save each promise made to the API in a single array.
 * @param {Array} values containing the color names
 * @param {requestCallback} callback to resolve the promises
 */
async function getColors(values, callback) {
	const colors = values.reduce((acc, key) => {
		colorClass = colorClasses.get(key);
		color = new colorClass();
		acc.push(getColor(color.name));

		return acc;
	}, []);
	callback(colors);
}
