import spTime from './assets/modules/sprite-timer.js'
import spEmts from './assets/modules/sprite-emotions.js'

//////////////////////////////////////////////////making page////////////////////////////////////////////

let isStart = 0,
    bombsSumm = 40,
    flags = 0,
    finalCells = 0,
    finalCount = 0,
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
const home = pannel.querySelector('.home')

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

    field.querySelectorAll('.forbidden').forEach(e => e.classList.remove('forbidden'))
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
        if (cells[e].classList.contains('flag')) {
            flags++
        }
    })

    return pos
}

function bombCounter(event) {
    let bombs = 0

    radius(event).forEach(e => {
        if (cells[e].classList.contains('bomb')) {
            bombs++
        }
    })

    if (!event.classList.contains('bomb')) {
        event.classList.add(`b${bombs}`)
    }

}

function bombsNumber() {
    cells.forEach(el => {
        bombCounter(el)
    })
}

////////////////////////////////////////////////////////////radar////////////////////////////////////////////////////

function sib(event, side) {
    let sibles = [],
        limit

    if (event.classList[2] === 'flag') {
        return
    }

    side === 'next' ? limit = 16 : limit = 1

    cells.forEach(e => {
        if (e.classList.contains('opened')) {
            radius(e).forEach(el => {
                if (cells[el].classList.contains('b0')) {
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
            if (!cells[el].classList.contains('flag')) {
                cells[el].classList.add('opened')
            }
        })
    })

    if (+event.classList[1].split('-')[1] === limit && !event.classList.contains('bomb')) {
        event.classList.add('opened')
        return
    } else if (!event.classList.contains('b0') && !event.classList.contains('bomb')) {
        event.classList.add('opened')
        return
    } else if (event.classList.contains('b0')) {
        event.classList.add('opened')
        side === 'next' ? sib(event.nextSibling, 'next') : sib(event.previousSibling, 'prev')
    } else {
        return
    }
}

function radar(event) {
    if (event.classList.contains('flag')) {
        return
    }
    if (!event.classList.contains('b0')) {
        event.classList.add('opened')
        return
    }
    sib(event, 'next')
    sib(event, 'prev')

    field.querySelectorAll('.opened').forEach(o => {
        if (o.classList[2] === 'b0') {
            radius(o).forEach(el => {
                if (!cells[el].classList.contains('opened') && !cells[el].classList.contains('flag')) {
                    radar(cells[el])
                }
            })
        }
    })
}

////////////////////////////////////////////////////////bomb explosion///////////////////////////////////////////////

function bombExp(event) {
    if (!event.target.classList.contains('flag')) {
        gameOver()
    } else {
        return
    }
}

///////////////////////////////////////////////////cell-number sibl opening//////////////////////////////////////////

function numSib(event) {
    let unOpenned = []
    let bombsAround = +event.target.classList[2][1]

    radius(event.target).forEach(e => {
        if (cells[e].classList.contains('flag') && !cells[e].classList.contains('bomb')) {
            cells[e].classList.add('wrong')
        }
        if (flags === bombsAround) {
            // if (cells[e].classList[2] === 'flag') { /////////////возможно не нужно и можно удалить
            //     cells[e].classList.add('failed')
            // }
            cells[e].classList.add('opened')
            if (cells[e].classList.contains('b0')) {
                unOpenned.push(cells[e])
            }
        }
    })
    field.querySelectorAll('.bomb').forEach(b => {
        if (b.classList.contains('bomb') && b.classList.contains('opened') && !b.classList.contains('flag')) {
            b.classList.add('failed')
            gameOver()
        }
    })
    field.querySelectorAll('.flag').forEach(f => {
        f.classList.add('unopenned')
        if (f.classList.contains('flag') && f.classList.contains('opened') && f.classList.contains('bomb')) {
            f.classList.add('failed')
        }
    })

    unOpenned = unOpenned.filter(function (item, pos) {
        return unOpenned.indexOf(item) == pos
    })

    unOpenned.forEach(e => {
        radius(e).forEach(el => {
            if (!cells[el].classList.contains('opened')) {
                radar(cells[el])
            }
        })
    })
}

////////////////////////////////////////////////////////////timer////////////////////////////////////////////////////

function timer(seconds) {
    timerID = setInterval(() => {
        seconds++
        for (let keys in spTime) {
            switch (seconds.toString().length) {
                case 1: {
                    if (keys === seconds.toString().split('')[0]) {
                        timerEl[5].style.backgroundPositionX = `${spTime[keys]}px`
                    }
                }
                    break;
                case 2: {
                    if (keys === seconds.toString().split('')[0]) {
                        timerEl[4].style.backgroundPositionX = `${spTime[keys]}px`
                    }
                    if (keys === seconds.toString().split('')[1]) {
                        timerEl[5].style.backgroundPositionX = `${spTime[keys]}px`
                    }
                }
                    break;
                case 3: {
                    if (keys === seconds.toString().split('')[0]) {
                        timerEl[3].style.backgroundPositionX = `${spTime[keys]}px`
                    }
                    if (keys === seconds.toString().split('')[1]) {
                        timerEl[4].style.backgroundPositionX = `${spTime[keys]}px`
                    }
                    if (keys === seconds.toString().split('')[2]) {
                        timerEl[5].style.backgroundPositionX = `${spTime[keys]}px`
                    }
                }
            }
        }
    }, 1000)
}

//////////////////////////////////////////////////////////bomb timer/////////////////////////////////////////////////

function bombTimer(event) {
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
        if (!e.classList.contains('flag')) {
            e.classList.add('failed')
        }
    })
    section.querySelector('.wrapper').querySelector('.bg').style.display = 'block'
    clearInterval(timerID)
    for (let keys in spEmts) {
        if (keys === 'failed') {
            home.style.backgroundPositionX = `${spEmts[keys]}px`
        }
    }

    sound('lose')
}

///////////////////////////////////////////////////////////game win//////////////////////////////////////////////////

function gameWin() {
    finalCells = 0
    finalCount = 0

    field.querySelectorAll('.flag').forEach(f => {
        if (f.classList.contains('bomb')) {
            finalCount++
        }
    })
    cells.forEach(e => {
        if (e.classList.contains('opened') && !e.classList.contains('flag')) {
            finalCells++
        }
    })
    
    if ((finalCount === 40 && finalCells === 215) || finalCount === 39 && finalCells === 216) {
        clearInterval(timerID)
        for (let keys in spEmts) {
            if (keys === 'won') {
                home.style.backgroundPositionX = `${spEmts[keys]}px`
            }
        }
        sound('win')
    }
}

/////////////////////////////////////////////////////////////new game////////////////////////////////////////////////

function newGame() {
    field.querySelectorAll('.cell').forEach(e => {
        e.remove()
    })
    for (let i = 1; i < 17; i++) {
        for (let j = 1; j < 17; j++) {
            field.insertAdjacentHTML('beforeend', `<div class="cell ${i}-${j}"></div>`)
        }
    }
    timerEl.forEach(t => {
        if (+t.classList[1][3] === 2) {
            t.style.backgroundPositionX = '21px'
        }
    })
    clearInterval(timerID)
    isStart = 0
    bombsSumm = 40
    currentBomb = 40
    flags = 0
    finalCells = 0
    finalCount = 0
    bombTimer(40)
    section.querySelector('.wrapper').querySelector('.bg').style.display = 'none'
}

///////////////////////////////////////////////////////////////sound/////////////////////////////////////////////////

function sound(event) {
    let audio = new Audio()
    audio.autoplay = true
    audio.src = `./assets/sounds/${event}.mp3`
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////onclick func///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

field.addEventListener('click', function (event) {
    if (event.target.classList.contains('flag') || event.target.classList.contains('field') || (event.target.classList.contains('b0') && event.target.classList.contains('opened'))) {
        return
    }

    gameWin()

    if (isStart === 0) {
        if (event.target.classList.contains('cell') && !event.target.classList.contains('flag')) {
            sound('click')
        }
        timer(0)
        bombGen(event)
        bombCounter(event.target)
        bombsNumber()
        event.target.classList.add('opened')
        isStart = 1
        radar(event.target)
    } else if (event.target.classList[2][0] === 'b' && +event.target.classList[2][1] !== 0 && event.target.classList.contains('opened')) {
        sound('sibling')
        numSib(event)
    } else {
        sound('click')
        if (event.target.classList.contains('bomb')) {
            bombExp(event)
        }
        event.target.classList.add('opened')
        radar(event.target)
    }
})

////////////////////////////////////////////////////////context menu//////////////////////////////////////////////////

field.addEventListener('contextmenu', function (event) {
    if ((currentBomb === 0 && event.target.classList[2] === undefined) || event.target.classList.contains('opened')) {
        return
    } else if (currentBomb === 0 && !event.target.classList.contains('flag')) {
        return
    } else {
        sound('flag')
    }

    gameWin()

    if (event.target.classList.contains('flag') && !event.target.classList.contains('wtf')) {
        event.target.classList.add('wtf')
        event.target.classList.remove('failed')
        event.target.classList.remove('flag')
        if (!event.target.classList.contains('opened')) {
            currentBomb++
            bombTimer(currentBomb)
        }
    } else if (event.target.classList.contains('wtf')) {
        event.target.classList.remove('wtf')
    } else {
        event.target.classList.add('flag')
        if (!event.target.classList.contains('opened')) {
            currentBomb--
            bombTimer(currentBomb)
        } else {
            event.target.classList.add('failed')
        }
    }
})

/////////////////////////////////////////////////////////smile emotions///////////////////////////////////////////////

field.addEventListener('mousedown', function (event) {
    for (let keys in spEmts) {
        if (keys === 'idk') {
            home.style.backgroundPositionX = `${spEmts[keys]}px`
        }
    }
})

field.addEventListener('mouseup', function (event) {
    for (let keys in spEmts) {
        if (keys === 'default') {
            home.style.backgroundPositionX = `${spEmts[keys]}px`
        }
    }
})

home.addEventListener('mousedown', function () {
    for (let keys in spEmts) {
        if (keys === 'pressed') {
            home.style.backgroundPositionX = `${spEmts[keys]}px`
        }
    }
})

home.addEventListener('mouseup', function () {
    for (let keys in spEmts) {
        if (keys === 'default') {
            home.style.backgroundPositionX = `${spEmts[keys]}px`
        }
    }
})

home.addEventListener('click', function (event) {
    newGame()
})