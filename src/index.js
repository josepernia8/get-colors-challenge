const { getColor } = require('./apiMock');
const colorClasses = require('./classes');

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

(() => {
	// Uncomment for debugging
	// console.log("DEBUG: ", process.argv)

	const colorsInput = JSON.parse(process.argv[2]);
	const type = process.argv[3] ? process.argv[3].toUpperCase() : 'HEX';

	getColors(colorsInput, async (colors) => {
  	const apiColors = await Promise.all(colors);
		const colorCodes = apiColors.map(color => color ? color[type] : null);

		// Result
		console.log("Result: ", colorCodes);
	});
})();

/**
 * ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ Instructions to run application:                                                                               │
 * │                                                                                                                │
 * │ You need to pass a stringify array of colors in the order you want the output on (green first, then blue, ...) │
 * │ Then pass the type of output you want back (default hex)                                                       │
 * │                                                                                                                │
 * │ @param stringifyArray: '["green","blue","red","black","white"]'                                                │
 * │ @param type: HEX | RGB                                                                                         │
 * │ @command node src/index.js '["green","blue","red"]' HEX                                                        │
 * └────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 */
