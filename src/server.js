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
app.get('/tools/:index', (req, res) => {
	// Kontrollera att parametern är korrekt
	let index = Number(req.params.index)
	if( index >= 0 && index < tools.length ) {
		res.send(tools[index])
	} else {
		// res.sendStatus(400)
		res.status(400).send('Tool does not exist')
	}
})

app.post('/tools', (req, res) => {
	console.log('POST /tools, body=', req.body);
	// TODO: kontrollera att req.body är korrekt utformat
	// 1. korrekt objekt
	// 2. felaktigt objekt
	// 3. något som inte är ett objekt
	if( true ) {
		tools.push(req.body)
		res.sendStatus(200)
	} else {
		res.sendStatus(400)
	}
})
// PUT
// DELETE


// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})
