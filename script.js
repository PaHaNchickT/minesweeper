import spTime from './assets/modules/sprite-timer.js'
// import spEmts from './assets/modules/sprite-emotions.js'

//////////////////////////////////////////////////making page////////////////////////////////////////////

let isStart = 0,
    bombsSumm = 40,
    isFailed = 0,
    flags = 0,
    isTimer = 0,
    timerID,
    currentBomb = bombsSumm

const body = document.querySelector('body')
body.insertAdjacentHTML('beforeend', '<header>')
body.querySelector('header').insertAdjacentHTML('beforeend', `<h1>Minesweeper</h1>`)

body.insertAdjacentHTML('beforeend', `<section></section>`)
const section = body.querySelector('section')

section.insertAdjacentHTML('beforeend', '<div class="wrapper"></div>')
section.querySelector('.wrapper').insertAdjacentHTML('beforeend', '<div class="pannel"></div>')
const pannel = section.querySelector('.wrapper').querySelector('.pannel')

pannel.insertAdjacentHTML('beforeend', '<div class="time-wrapper"></div>')
pannel.insertAdjacentHTML('beforeend', '<div class="home"></div>')
pannel.insertAdjacentHTML('beforeend', '<div class="time-wrapper"></div>')
const timeWrapper = pannel.querySelectorAll('.time-wrapper')

timeWrapper.forEach((wr, ind) => {
    for (let k = 0; k < 3; k++) {
        wr.insertAdjacentHTML('beforeend', `<div class="timer-el el-${ind + 1}-${k + 1}"></div>`)
    }
})
const timerEl = pannel.querySelectorAll('.timer-el')

section.querySelector('.wrapper').insertAdjacentHTML('beforeend', '<div class="field"></div>')
section.querySelector('.wrapper').insertAdjacentHTML('beforeend', `<div class="bg"></div>`)
const field = section.querySelector('.field')

for (let i = 1; i < 17; i++) {
    for (let j = 1; j < 17; j++) {
        field.insertAdjacentHTML('beforeend', `<div class="cell ${i}-${j}"></div>`)
    }
}
const cells = field.childNodes

body.insertAdjacentHTML('beforeend', '<footer><ul><li><a href="http://github.com/PaHaNchickT">GitHub</a></li><li><a href="http://ternopavel.ru">Made by Pavel Terno</a></li><li>2023</li></ul></footer>')

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////engine/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

body.oncontextmenu = function () { //не вызывать контекстное меню
    return false
}

/////////////////////////////////////////////////////bomb generation/////////////////////////////////////////////////

function bombGen(event) {
    let selected = event.target.classList[1]

    radius(event.target).forEach(forb => {
        cells[forb].classList.add('forbidden')
    })

    for (bombsSumm; bombsSumm > 0;) {
        cells.forEach(e => {
            if (field.querySelectorAll('.bomb').length === 40) {
                return
            } else if ((`${Math.floor(Math.random() * 16) + 1}-${Math.floor(Math.random() * 16) + 1}` === e.classList[1]) && (e.classList[2] !== 'bomb' && e.classList[2] !== 'forbidden') && (e.classList[1] !== selected)) {
                e.classList.add('bomb')
                bombsSumm = bombsSumm - 1
            }
        })
    }

    field.querySelectorAll('.forbidden').forEach(e => {
        e.classList.remove('forbidden')
    })
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

    flags = 0
    pos.forEach(e => {
        if (cells[e].classList[3] !== 'opened' && cells[e].classList[3] === 'flag') {
            flags++
        }
    })

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
        gameOver()
    } else {
        return
    }
}

/////////////////////////////////////////////////////number sibl opening/////////////////////////////////////////////

function numSib(event) {
    let unOpenned = []
    let bombsAround = +event.target.classList[2][1]
    radius(event.target).forEach(e => {
        if (flags === bombsAround) {
            cells[e].classList.add('opened')
            if (cells[e].classList[2] === 'b0') {
                unOpenned.push(cells[e])
            }
        }
    })
    field.querySelectorAll('.bomb').forEach(b => {
        if (b.classList[2] === 'bomb' && b.classList[3] === 'opened' && b.classList[4] !== 'flag') {
            b.classList.add('failed')
            gameOver()
        }
    })
    field.querySelectorAll('.flag').forEach(f => {
        if (f.classList[3] === 'flag' && f.classList[4] === 'opened' && f.classList[2] !== 'bomb') {
            f.classList.add('failed')
        }
    })

    unOpenned = unOpenned.filter(function (item, pos) {
        return unOpenned.indexOf(item) == pos
    })

    unOpenned.forEach(e => {
        radius(e).forEach(el => {
            if (cells[el].classList[3] !== 'opened') {
                radar(cells[el])
            }
        })
    })
}

////////////////////////////////////////////////////////////timer////////////////////////////////////////////////////

function timer(seconds) {
    isTimer = 1
    timerID = setInterval(() => {
        seconds++
        // console.log(seconds.toString().split(''))

        // timerText.innerHTML = `${minutes} min ${seconds} sec`
        // localStorage.setItem('min', minutes)
        // localStorage.setItem('sec', seconds)
    }, 1000)
}

//////////////////////////////////////////////////////////bomb timer/////////////////////////////////////////////////

function bombTimer(event) {
    console.log(event)
    for (let keys in spTime) {
        if (event.toString().length === 1) {
            timerEl[1].style.backgroundPositionX = `21px`
            if (keys === event.toString().split('')[0]) {
                timerEl[2].style.backgroundPositionX = `${spTime[keys]}px`
            }
        } else {
            if (keys === event.toString().split('')[0]) {
                timerEl[1].style.backgroundPositionX = `${spTime[keys]}px`
            }
            if (keys === event.toString().split('')[1]) {
                timerEl[2].style.backgroundPositionX = `${spTime[keys]}px`
            }
        }
    }
}

//////////////////////////////////////////////////////////game over//////////////////////////////////////////////////

function gameOver() {
    field.querySelectorAll('.bomb').forEach(e => {
        if (e.classList[3] !== 'flag') {
            e.classList.add('failed')
        }
    })
    section.querySelector('.wrapper').querySelector('.bg').style.display = 'block'
    isFailed = 1
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////onclick func///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

field.addEventListener('click', function (event) {
    if (event.target.classList[2] === 'flag' || event.target.classList[3] === 'flag' || event.target.classList[0] === 'field' || (event.target.classList[2] === 'b0' && event.target.classList[3] === 'opened')) {
        return
    }
    if (isStart === 0) {
        timer(0)
        bombGen(event)
        bombCounter(event.target)
        bombsNumber()
        event.target.classList.add('opened')
        isStart = 1
        radar(event.target)
    } else if (event.target.classList[2][0] === 'b' && +event.target.classList[2][1] !== 0 && event.target.classList[3] === 'opened') {
        numSib(event)
    } else {
        if (event.target.classList[2] === 'bomb') {
            bombExp(event)
        }
        event.target.classList.add('opened')
        radar(event.target)
    }

})

field.addEventListener('contextmenu', function (event) {
    if (currentBomb === 0) {
        return
    }
    if ((event.target.classList[3] === 'flag' && event.target.classList[4] !== 'wtf') || (event.target.classList[2] === 'flag' && event.target.classList[3] !== 'wtf')) {
        event.target.classList.add('wtf')
        event.target.classList.remove('flag')
        if (event.target.classList[3] !== 'opened') {
            currentBomb++
            bombTimer(currentBomb)
        }
    } else if (event.target.classList[3] === 'wtf' || event.target.classList[2] === 'wtf' || event.target.classList[4] === 'wtf') {
        event.target.classList.remove('wtf')
    } else {
        event.target.classList.add('flag')
        if (event.target.classList[3] !== 'opened') {
            currentBomb--
            bombTimer(currentBomb)
        }
    }
})




