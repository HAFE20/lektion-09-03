// Importera Express + middleware
const express = require('express')

// Importera datan (databas)
const tools = require('./data.js')

// Konfigurera servern
const app = express()
const PORT = 1337


// Installera middleware på servern
// app.use( express.urlencoded )  <- används vid autentisering
app.use( express.json() )  // hantera JSON body vid POST request




// Endpoints
app.get('/tools', (req, res) => {
	res.send(tools)
})
function isProperIndex(index, maxIndex) {
	return index >= 0 && index < maxIndex
}
app.get('/tools/:index', (req, res) => {
	// Kontrollera att parametern är korrekt
	let index = Number(req.params.index)
	if( isProperIndex(index, tools.length) ) {
		res.send(tools[index])
	} else {
		// res.sendStatus(400)
		res.status(400).send('Tool does not exist')
	}
})

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
app.post('/tools', (req, res) => {
	console.log('POST /tools, body=', req.body);
	// Kontrollera att req.body är korrekt utformat
	let maybeBody = req.body
	if( !isToolsObject(maybeBody) ) {
		res.status(400).send('Bad tool object')
		return
	}

	tools.push(req.body)
	res.sendStatus(200)
})

app.put('/tools/:index', (req, res) => {
	// 1. kontrollera att index är okej
	// 2. kontrollera att req.body är okej
	// 3. ersätt tool-objektet i arrayen på index "index" med req.body
	let index = Number(req.params.index)
	if( !isProperIndex(index, tools.length) ) {
		res.status(400).send('Bad tool index')
	}
	else if( !isToolsObject(req.body) ) {
		res.status(400).send('Bad tool object')
	}
	else {
		tools[index] = req.body
		res.sendStatus(200)
	}
})
// PUT
// DELETE


// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})
