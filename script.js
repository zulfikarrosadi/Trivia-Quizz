// return 5 random categories api endpoint from 1 - 200 categories
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

// get quiz data based on random categories url
function fetchQuizData() {
	let quizURL = [...getCategoriesURL()]

	// fetching each diffrent quiz url
	// then turn the result to json and put it on array

	let fetchQuizArray = quizURL.map(async (url) => {
		return await fetch(url).then(response => response.json())
	})

	return Promise.all(fetchQuizArray).then(results => results)
}

async function showCategories() {
	const quizData = await fetchQuizData()

}
showCategories()