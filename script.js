const body = document.querySelector('body')
body.insertAdjacentHTML('beforeend', '<header>')
body.querySelector('header').insertAdjacentHTML('beforeend', `<h1>Minesweeper</h1>`)

body.insertAdjacentHTML('beforeend', `<section></section>`)
const section = body.querySelector('section')

body.insertAdjacentHTML('beforeend', '<footer><ul><li class="github"><a href="http://github.com/PaHaNchickT">GitHub</a></li><li class="by">Made by Pavel Terno</li><li>2023</li></ul></footer>')