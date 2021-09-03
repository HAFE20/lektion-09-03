// Importera Express + middleware
const express = require('express')
const cors = require('cors')


// Importera datan (databas)
const tools = require('./data.js')

// Konfigurera servern
const app = express()
const PORT = 1337
let countRequests = 0

// Installera middleware på servern
app.use( cors() )  // behövs egentligen bara för publika API:n

// app.use( express.urlencoded )  <- används vid autentisering
app.use( express.json() )  // hantera JSON body vid POST request

app.use( (req, res, next) => {
	// Logger - skriver ut information som vi kan använda för att debugga
	// Vi vill veta: vilken HTTP method, vilken resurs, kanske mera?
	countRequests++
	console.log(`${countRequests}:  ${req.method}  ${req.url}`, req.body);

	// Alla middleware måste sluta antingen med res.send eller next()
	next()
} )

app.use( '/web', express.static(__dirname + '../public') )


// JSON.parse()       sträng -> objekt
// JSON.stringify()   objekt -> sträng



// Endpoints
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

app.get('/tools', (req, res) => {
	res.send(tools)
})

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

app.post('/tools', (req, res) => {
	// console.log('POST /tools, body=', req.body);
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

app.delete('/tools/:index', (req, res) => {
	let index = Number(req.params.index)
	if( !isProperIndex(index, tools.length) ) {
		res.status(400).send('Bad tool index')
	} else {
		tools.splice(index, 1)
		res.sendStatus(200)
	}
})


// Nästa steg:
// 1. flytta ut valideringsfunktionerna till: validate.js
// 2. flytta GET+POST+PUT+DELETE (hela tools-resursen) till en egen fil: routes/tools.js


// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})
