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

function bombGen(jopa) {
    for (field.querySelectorAll('.bomb').length; field.querySelectorAll('.bomb').length < 40;) {
        cells.forEach(e => {
            if ((`${Math.floor(Math.random() * 16)+1}-${Math.floor(Math.random() * 16)+1}` === e.classList[1]) && (e.classList[2] !== 'bomb')) {
                e.classList.add('bomb')
            }
        })
    }
}

//////////////////////////////////////////////////////////onclick func///////////////////////////////////////////////

field.addEventListener('click', function(event) {
    if (isStart === 0) {
        bombGen(event.target.className)
        isStart = 1
        console.log(field.querySelectorAll('.bomb').length) 
    } else {

    }
})



