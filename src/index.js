const { getColor } = require('./apiMock');

const { Green, Blue, Red, Black, White } = require('./classes');

async function getColors(values, callback) {
	const colors = [];
	if (values.includes('green')) {
		green = new Green();
		colors[values.indexOf(green.name)] = getColor(green.name);
	}
	if (values.includes('blue')) {
		blue = new Blue()
		colors[values.indexOf(blue.name)] = getColor(blue.name);
	}
	if (values.includes('red')) {
		red = new Red();
		colors[values.indexOf(red.name)] = getColor(red.name);
	}
	if (values.includes('black')) {
		black = new Black();
		colors[values.indexOf(black.name)] = getColor(black.name);
	}
	if (values.includes('white')) {
		white = new White();
		colors[values.indexOf(white.name)] = getColor(white.name);
	}
	callback(colors);
	return colors;
}

(() => {
	// Uncomment for debugging
	// console.log("DEBUG: ", process.argv)

	const colorsInput = JSON.parse(process.argv[2]);

	getColors(colorsInput, async (colors) => {
  	apiColors = await Promise.all(colors);

		let hexColors = []
		apiColors.forEach(color => color ? hexColors.push(color.HEX) : null)

		// Result
		console.log("Result: ", hexColors);
	});
})();

/**
 * To run application:
 * node ~/code-challenge/src/index.js '["green","blue","red"]'
 * 
 */
