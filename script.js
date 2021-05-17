// http://jservice.io/api/random
function fetchQuizData(resource) {
	return fetch(resource)
		.then(response => response.json())
		.then(result => result)
}

function getCategoriesURL() {
	let API_Resource = []
	let random_categories_number = []

	// get 5 random number from 1 - 200
	for (let i = 0; i < 5; i++) {
		let random_number = Math.ceil(Math.random() * 200)
		random_categories_number.push(random_number)
	}

	// create link url to get random categories based on random number
	for (let i = 0; i < random_categories_number.length; i++) {
		const id = random_categories_number[i];
		API_Resource.push(`http://jservice.io/api/category?id=${id}`)
	}

	return API_Resource
}
