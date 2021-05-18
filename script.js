const answerForm = document.querySelector('.answer-form')
const answerField = document.querySelector('#answerField')
const categoriesWrapper = document.querySelector('.categories-wrapper')

const showAnswerBtn = document.querySelector('.show-answer-btn')
const nextQuestionBtn = document.querySelector('.next-question-btn')
const submitAnswerBtn = document.querySelector('.submit-answer-btn')
const changeCategoriesBtn = document.querySelector('.change-categories-btn')

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
	const categoriesTitle = []
	let str = `<p>Choose Category</p>`

	// if fetchQuizData() is not returning undefined or null and is it true
	// then it will get all titles and push it to categoriesTitle array

	if (quizData !== undefined && quizData !== null) {
		quizData.forEach(data => {
			categoriesTitle.push(data.title)
		})
	} else return

	// build category item element and injecting to html
	categoriesTitle.forEach(title => {
		str += `<li><button class="category-item"> ${title} </button></li>`
	})
	categoriesWrapper.insertAdjacentHTML('afterbegin', str)
}
showCategories()