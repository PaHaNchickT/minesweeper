import spTime from '../../assets/modules/sprite-timer.js'
import spEmts from '../../assets/modules/sprite-emotions.js'
import spNumb from '../../assets/modules/sprite-numbers.js'
import spBase from '../../assets/modules/sprite-base.js'


const body = document.querySelector('body')
body.insertAdjacentHTML('beforeend', '<header>')
body.querySelector('header').insertAdjacentHTML('beforeend', `<h1>Minesweeper</h1>`)

body.insertAdjacentHTML('beforeend', `<section></section>`)
const section = body.querySelector('section')

body.insertAdjacentHTML('beforeend', '<footer><ul><li><a href="http://github.com/PaHaNchickT">GitHub</a></li><li><a href="http://ternopavel.ru">Made by Pavel Terno</a></li><li>2023</li></ul></footer>')

console.log(spTime, spEmts, spNumb, spBase)



