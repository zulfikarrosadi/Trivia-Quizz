function getCategoriesURL() {
	let APIResource = []
	let randomCategoriesNumber = []
	const TOTAL_CATEGORIES = 5

	// get 5 random number from 1 - 200
	for (let i = 0; i < TOTAL_CATEGORIES; i++) {
		let randomNumber = Math.ceil(Math.random() * 200)
		randomCategoriesNumber.push(randomNumber)
	}

	// create link url to get random categories based on random number
	for (let i = 0; i < randomCategoriesNumber.length; i++) {
		const id = randomCategoriesNumber[i];
		APIResource.push(`http://jservice.io/api/category?id=${id}`)
	}

	return APIResource
}

function fetchQuizData() {
	let quizURL = [...getCategoriesURL()]

	let fetchQuizArray = quizURL.map(async (url) => {
		return await fetch(url).then(response => response.json())
	})

	return Promise.all(fetchQuizArray).then(results => results)
}

async function showCategories() {
	const quizData = await fetchQuizData()

}
showCategories()