function isProperIndex(index, maxIndex) {
	return index >= 0 && index < maxIndex
}

function isToolsObject(maybe) {
	if( (typeof maybe) !== 'object' ) {
		return false
	}
	// tool-objekt ska ha egenskaperna: name, price, stored
	let keys = Object.keys(maybe)
	if( !keys.includes('name') || !keys.includes('price') || !keys.includes('stored') ) {
		return false
	}

	// Vi kan också kontrollera att maybeBody.name / price / stored har rimliga värden

	return true
}

module.exports = { isProperIndex, isToolsObject }
