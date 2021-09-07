// Endpoint: /tools
const express = require('express')
const router = express.Router()

// Importera valideringsfunktioner
const { isProperIndex, isToolsObject } = require('../validation.js')
// Jämför med: import { useState, useEffect } from 'react'

// Importera datan (databas)
const tools = require('../data.js')


router.get('/', (req, res) => {
	res.send(tools)
})

router.get('/search', (req, res) => {
	//   /tools/search?q=....
	let word = req.query.q
	let found = tools.find(tool => tool.name.includes(word))
	if( !found ) {
		res.sendStatus(404)
	} else {
		res.send(found)
	}
})

router.get('/:index', (req, res) => {
	// Kontrollera att parametern är korrekt
	let index = Number(req.params.index)
	if( isProperIndex(index, tools.length) ) {
		res.send(tools[index])
	} else {
		// res.sendStatus(400)
		res.status(400).send('Tool does not exist')
	}
})

router.post('/', (req, res) => {
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

router.put('/:index', (req, res) => {
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

router.delete('/:index', (req, res) => {
	let index = Number(req.params.index)
	if( !isProperIndex(index, tools.length) ) {
		res.status(400).send('Bad tool index')
	} else {
		tools.splice(index, 1)
		res.sendStatus(200)
	}
})

module.exports = router
