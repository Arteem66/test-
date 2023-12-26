'use strict'
//==========================================
const $ = document.querySelector.bind(document)
const quiz = $('.quiz')
const warning = $('.warning')
const btnNext = $('.quiz__next-btn')
let questionNumber = 0
let userScore = 0
let count = 0

let cheackNumber = []
getRandomNumber()

function getRandomNumber() {
	count = Math.floor(Math.random() * questions.length)

	for (let i = 0; i < 2; i++) {
		if (cheackNumber.includes(count)) {
			console.log('Число ' + count + ' есть в массиве')
			count = Math.floor(Math.random() * questions.length)
			console.log('Новое число ' + count)
			i = 0
		} else {
			cheackNumber.push(count)
			i = cheackNumber.length
		}
	}

	return count
}

if (typeof questions !== 'undefined' && questions.length > 0) {
	quiz.classList.remove('hidden')
	showQuestions(count)
} else {
	warning.classList.remove('hidden')
}

btnNext.addEventListener('click', nextQuestion)

function showQuestions(index) {
	const imgBox = $('.quiz__top-img')
	const title = $('.quiz__title')
	const list = $('.quiz__list')
	const total = $('.quiz__total')

	imgBox.setAttribute('src', `${img[index]}`)

	title.innerHTML = `${questions[index].question}`

	list.innerHTML = ''
	questions[index].options.forEach(item => {
		const text = `<li class = "quiz__option">${item}</li>`
		list.insertAdjacentHTML('beforeend', text)
	})

	const options = list.querySelectorAll('.quiz__option')
	options.forEach(item => item.setAttribute('onclick', 'optionSelected(this)'))

	total.innerHTML = `${(questionNumber += 1)} из ${questions.length}`
}

function optionSelected(answer) {
	const userAnswer = answer.textContent
	const correctAnswer = questions[count].answer
	const options = document.querySelectorAll('.quiz__option')
	const iconCorrect = "<span'>&#10004;</span>"
	const iconIncorrect = "<span'>&#9940;</span>"

	if (userAnswer == correctAnswer) {
		userScore += 1
		answer.classList.add('correct')
		answer.insertAdjacentHTML('beforeend', iconCorrect)

		options.forEach(item => item.classList.add('disabled'))
	} else {
		answer.classList.add('incorrect')
		answer.insertAdjacentHTML('beforeend', iconIncorrect)

		options.forEach(item => {
			if (item.textContent == correctAnswer) {
				setTimeout(() => {
					item.classList.add('correct')
					item.insertAdjacentHTML('beforeend', iconCorrect)
				}, 100)
			}
		})

		options.forEach(item => item.classList.add('disabled'))
	}
}

function nextQuestion() {
	const option = $('.quiz__option')
	const result = $('.result')
	const resultText = $('.result__text')

	if (
		questionNumber + 1 == questions.length &&
		option.classList.contains('disabled')
	) {
		result.classList.remove('hidden')
		quiz.classList.add('hidden')

		if (userScore <= 7) {
			resultText.innerHTML = `Отшиваем тебя <br> Правильно ${userScore} из ${questions.length}`
		} else if (userScore <= 13) {
			resultText.innerHTML = `Ты Чушпан, а не пацан! <br> Правильно ${userScore} из ${questions.length}`
		} else if (userScore <= 18) {
			resultText.innerHTML = `Эй Скорлупа!! <br> Правильно ${userScore} из ${questions.length}`
		} else {
			resultText.innerHTML = `Старшый!!! <br> Правильно ${userScore} из ${questions.length}`
		}
		return
	}

	if (option.classList.contains('disabled')) {
		getRandomNumber()
		showQuestions(count)
	} else {
		alert('Выберите один из вариантов ответа')
	}
}
