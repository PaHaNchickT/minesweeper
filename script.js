import spTime from '../../assets/modules/sprite-timer.js'
import spEmts from '../../assets/modules/sprite-emotions.js'
import spNumb from '../../assets/modules/sprite-numbers.js'
import spBase from '../../assets/modules/sprite-base.js'

//////////////////////////////////////////////////making page////////////////////////////////////////////

let isStart = 0


const body = document.querySelector('body')
body.insertAdjacentHTML('beforeend', '<header>')
body.querySelector('header').insertAdjacentHTML('beforeend', `<h1>Minesweeper</h1>`)

body.insertAdjacentHTML('beforeend', `<section></section>`)
const section = body.querySelector('section')

section.insertAdjacentHTML('beforeend', '<div class="wrapper"></div>')
section.querySelector('.wrapper').insertAdjacentHTML('beforeend', '<div class="pannel"></div>')
section.querySelector('.wrapper').insertAdjacentHTML('beforeend', '<div class="field"></div>')
const field = section.querySelector('.field')

for (let i = 1; i < 17; i++) {
    for (let j = 1; j < 17; j++) {
        field.insertAdjacentHTML('beforeend', `<div class="cell ${i}-${j}"></div>`)
    }
}
const cells = field.querySelectorAll('.cell')

// console.log(cells)

body.insertAdjacentHTML('beforeend', '<footer><ul><li><a href="http://github.com/PaHaNchickT">GitHub</a></li><li><a href="http://ternopavel.ru">Made by Pavel Terno</a></li><li>2023</li></ul></footer>')

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////engine/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////bomb generation/////////////////////////////////////////////////

function bombGen(selected) {
    for (field.querySelectorAll('.bomb').length; field.querySelectorAll('.bomb').length < 90;) {
        cells.forEach(e => {
            if ((`${Math.floor(Math.random() * 16) + 1}-${Math.floor(Math.random() * 16) + 1}` === e.classList[1]) && (e.classList[2] !== 'bomb') && (e.classList[1] !== selected)) {
                e.classList.add('bomb')
            }
        })
    }
}

/////////////////////////////////////////////////////bomb counter/////////////////////////////////////////////////////

function bombCounter(event) {
    let count = event.classList[1].split('-'),
        pos1 = (+count[0] - 2) * 16 + +count[1] - 2,
        pos2 = (+count[0] - 2) * 16 + +count[1] - 1,
        pos3 = (+count[0] - 2) * 16 + +count[1],
        pos4 = (+count[0] - 1) * 16 + +count[1] - 2,
        pos5 = (+count[0] - 1) * 16 + +count[1] - 1,
        pos6 = (+count[0] - 1) * 16 + +count[1],
        pos7 = (+count[0]) * 16 + +count[1] - 2,
        pos8 = (+count[0]) * 16 + +count[1] - 1,
        pos9 = (+count[0]) * 16 + +count[1],
        pos = [],
        bombs = 0

    if (+count[1] === 1 && +count[0] === 1) {
        pos.push(pos6, pos8, pos9)
    } else if (+count[1] === 16 && +count[0] === 1) {
        pos.push(pos4, pos7, pos8)
    } else if (+count[1] === 16 && +count[0] === 16) {
        pos.push(pos1, pos2, pos4)
    } else if (+count[1] === 1 && +count[0] === 16) {
        pos.push(pos2, pos3, pos6)
    } else if (+count[1] === 1 && (+count[0] !== 1 || +count[0] !== 16)) {
        pos.push(pos2, pos3, pos6, pos8, pos9)
    } else if (+count[0] === 1 && (+count[1] !== 1 || +count[1] !== 16)) {
        pos.push(pos4, pos6, pos7, pos8, pos9)
    } else if (+count[1] === 16 && (+count[0] !== 1 || +count[0] !== 16)) {
        pos.push(pos1, pos2, pos4, pos7, pos8)
    } else if (+count[0] === 16 && (+count[1] !== 1 || +count[1] !== 16)) {
        pos.push(pos1, pos2, pos3, pos4, pos6)
    } else {
        pos.push(pos1, pos2, pos3, pos4, pos6, pos7, pos8, pos9)
    }

    pos.forEach(e => {
        if (cells[e].classList[2] === 'bomb') {
            bombs++
        }
    })

    if (event.classList[2] !== 'bomb') {
        event.classList.add(`b${bombs}`)
    }

}

function bombsNumber() {
    if (isStart === 0) {
        cells.forEach(el => {
            bombCounter(el)
        })
    }
}

//////////

function radius() {

}

//////////////////////////////////////////////////////////onclick func///////////////////////////////////////////////

field.addEventListener('click', function (event) {
    if (isStart === 0) {
        bombGen(event.target.classList[1])
        bombCounter(event.target)
        bombsNumber()
        event.target.classList.add('opened')
        isStart = 1
    } else {
        bombCounter(event.target)
    }
})



