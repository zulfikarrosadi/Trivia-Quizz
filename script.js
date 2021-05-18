const answerForm = document.querySelector('.answer-form')
const answerField = document.querySelector('#answerField')
const questionWrapper = document.querySelector('.question-wrapper')
const injectStartPoin = document.querySelector('.categories-wrapper p')
const categoriesWrapper = document.querySelector('.categories-wrapper')

let categoriesListItem
let quizData

const startBtn = document.querySelector('.start-game-btn')
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
		return await fetch(url).then(response => {
			if (response.status !== 200) throw new Error('data not found')
			return response.json()
		})
	})
	return Promise.all(fetchQuizArray)
		.then(results => results)
		.catch(error => error)
}

async function getQuizData() {
	quizData = await fetchQuizData()
}
getQuizData()

function showCategories() {

	const categoriesTitle = []
	let str = ``

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
	injectStartPoin.insertAdjacentHTML('beforeend', str)
	categoriesListItem = document.querySelectorAll('.category-item')
}

startBtn.addEventListener('click', async () => {

	startBtn.classList.add('hidden')
	changeCategoriesBtn.classList.remove('hidden')
	injectStartPoin.classList.remove('hidden')

	await showCategories()

	categoriesListItem.forEach(item => {
		item.addEventListener('click', showQuestion)
	})
})

function showQuestion(event) {
	const categoriesTitle = event.target.innerText

	// will filled by whatever quiz category data that user has been choosed
	let choosenQuizData
	let questionStr = ''

	// to find which category that user is choosing 
	// and pass the result to choosenQuizData variable
	quizData.forEach((items) => {
		if (items.title.includes(categoriesTitle)) {
			choosenQuizData = items.clues
		}
	})

	// build question html element
	choosenQuizData.forEach(items => {
		const question = items.question
		questionStr += `<p>${question}</p>`
	})

	// questionWrapper.insertAdjacentHTML('afterbegin', questionStr)
}