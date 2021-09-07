// Importera Express + middleware + egna moduler
const express = require('express')
const cors = require('cors')
const tools = require('./routes/tools.js')


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

app.use( '/web', express.static(__dirname + '/../public') )



// JSON.parse()       sträng -> objekt
// JSON.stringify()   objekt -> sträng



// Endpoints
app.use('/tools', tools)


// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})
