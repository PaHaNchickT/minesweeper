import spTime from '../../assets/modules/sprite-timer.js'
import spEmts from '../../assets/modules/sprite-emotions.js'
import spNumb from '../../assets/modules/sprite-numbers.js'
import spBase from '../../assets/modules/sprite-base.js'

//////////////////////////////////////////////////making page////////////////////////////////////////////

let isStart = 0,
    bombsSumm,
    isFailed = 0


const body = document.querySelector('body')
body.insertAdjacentHTML('beforeend', '<header>')
body.querySelector('header').insertAdjacentHTML('beforeend', `<h1>Minesweeper</h1>`)

body.insertAdjacentHTML('beforeend', `<section></section>`)
const section = body.querySelector('section')

section.insertAdjacentHTML('beforeend', '<div class="wrapper"></div>')
section.querySelector('.wrapper').insertAdjacentHTML('beforeend', '<div class="pannel"></div>')
section.querySelector('.wrapper').insertAdjacentHTML('beforeend', '<div class="field"></div>')
section.querySelector('.wrapper').insertAdjacentHTML('beforeend', `<div class="bg"></div>`)
const field = section.querySelector('.field')

for (let i = 1; i < 17; i++) {
    for (let j = 1; j < 17; j++) {
        field.insertAdjacentHTML('beforeend', `<div class="cell ${i}-${j}"></div>`)
    }
}
const cells = field.childNodes

// console.log(cells)

body.insertAdjacentHTML('beforeend', '<footer><ul><li><a href="http://github.com/PaHaNchickT">GitHub</a></li><li><a href="http://ternopavel.ru">Made by Pavel Terno</a></li><li>2023</li></ul></footer>')

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////engine/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

body.oncontextmenu = function() { //не вызывать контекстное меню
    return false
}

/////////////////////////////////////////////////////bomb generation/////////////////////////////////////////////////

function bombGen(event) {
    let selected = event.target.classList[1]

    for (field.querySelectorAll('.bomb').length; field.querySelectorAll('.bomb').length < 60;) {
        cells.forEach(e => {
            if ((`${Math.floor(Math.random() * 16) + 1}-${Math.floor(Math.random() * 16) + 1}` === e.classList[1]) && (e.classList[2] !== 'bomb') && (e.classList[1] !== selected)) {
                e.classList.add('bomb')
            }
        })
    }
    radius(event.target).forEach(el => {
        cells[el].classList.remove('bomb')
    })
    bombsSumm = field.querySelectorAll('.bomb').length
    console.log(bombsSumm)
}

/////////////////////////////////////////////////////bomb counter/////////////////////////////////////////////////////

function radius(event) {
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
        pos = []

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

    return pos
}

function bombCounter(event) {
    let bombs = 0

    radius(event).forEach(e => {
        if (cells[e].classList[2] === 'bomb') {
            bombs++
        }
    })

    if (event.classList[2] !== 'bomb') {
        event.classList.add(`b${bombs}`)
    }

}

function bombsNumber() {
    cells.forEach(el => {
        bombCounter(el)
    })
}

////////////////////////////////////////////////////////////radar////////////////////////////////////////////////////

function nextSib(event) {
    let sibles = []
    cells.forEach(e => {
        if (e.classList[3] === 'opened') {
            radius(e).forEach(el => {
                if (cells[el].classList[2] === 'b0') {
                    cells[el].classList.add('opened')
                    sibles.push(cells[el])
                }
            })
        }

    })

    sibles = sibles.filter(function (item, pos) {
        return sibles.indexOf(item) == pos
    })

    sibles.forEach(e => {
        radius(e).forEach(el => {
            cells[el].classList.add('opened')
        })
    })

    if (+event.classList[1].split('-')[1] === 16 && event.classList[2] !== 'bomb') {
        event.classList.add('opened')
        return
    } else if (event.classList[2] !== 'b0' && event.classList[2] !== 'bomb') {
        event.classList.add('opened')
        return
    } else if (event.classList[2] === 'b0') {
        event.classList.add('opened')
        nextSib(event.nextSibling)
    } else {
        return
    }
}

function prevSib(event) {
    let sibles = []
    cells.forEach(e => {
        if (e.classList[3] === 'opened') {
            radius(e).forEach(el => {
                if (cells[el].classList[2] === 'b0') {
                    cells[el].classList.add('opened')
                    sibles.push(cells[el])
                }
            })
        }

    })

    sibles = sibles.filter(function (item, pos) {
        return sibles.indexOf(item) == pos
    })

    sibles.forEach(e => {
        radius(e).forEach(el => {
            cells[el].classList.add('opened')
        })
    })

    if (+event.classList[1].split('-')[1] === 1 && event.classList[2] !== 'bomb') {
        event.classList.add('opened')
        return
    } else if (event.classList[2] !== 'b0' && event.classList[2] !== 'bomb') {
        event.classList.add('opened')
        return
    } else if (event.classList[2] === 'b0') {
        event.classList.add('opened')
        prevSib(event.previousSibling)
    } else {
        return
    }
}

function radar(event) {
    if (event.classList[3] === 'flag') {
        return
    }
    if (event.classList[2] !== 'b0') {
        event.classList.add('opened')
        return
    } 
    nextSib(event)
    prevSib(event)
}

////////////////////////////////////////////////////////bomb explosion///////////////////////////////////////////////

function bombExp(event) {
    if (event.target.classList[3] !== 'flag') {
        field.querySelectorAll('.bomb').forEach(e => {
            if (e.classList[3] !== 'flag') {
                e.classList.add('failed')
            }
        })
        section.querySelector('.wrapper').querySelector('.bg').style.display = 'block'
        isFailed = 1
    } else {
        return
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////onclick func///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

field.addEventListener('click', function (event) {
    if (event.target.classList[2] === 'flag' || event.target.classList[3] === 'flag') {
        return
    }
    if (isStart === 0) {
        bombGen(event)
        bombCounter(event.target)
        bombsNumber()
        event.target.classList.add('opened')
        isStart = 1
        radar(event.target)
    } else {
        if (event.target.classList[2] === 'bomb') {
            bombExp(event)
        }
        event.target.classList.add('opened')
        radar(event.target)
    }
})

field.addEventListener('contextmenu', function (event) {
    if ((event.target.classList[3] === 'flag' && event.target.classList[4] !== 'wtf') || (event.target.classList[2] === 'flag' && event.target.classList[3] !== 'wtf')) {
        event.target.classList.add('wtf')
    } else if ((event.target.classList[3] === 'flag' && event.target.classList[4] === 'wtf') || event.target.classList[2] === 'flag' && event.target.classList[3] === 'wtf') {
        event.target.classList.remove('flag')
        event.target.classList.remove('wtf')
    } else {
        event.target.classList.add('flag')
    }
})




