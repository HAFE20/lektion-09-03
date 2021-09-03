console.log('Detta körs i frontend!');

async function fetchTools() {
	const productDiv = document.querySelector('.products')
	try {
		// Skicka request till backend
		const response = await fetch('/tools', { method: 'GET' })
		const data = await response.json()
		// Data: Tools[], name price stored
		const elements = data.map(tool => {
			let li = document.createElement('li')
			li.innerText = `${tool.name}....${tool.price} kr (${tool.stored} i lager)`
			return li
		})
		elements.forEach(li => productDiv.append(li))

	} catch(error) {
		console.log('ERROR', error.message);
	}
}

fetchTools()
