const arrayPictures = []
for (let i = 0; i < 24; i++) {
    const image = new Image()
    image.src = `./pictures/${i + 1}.jpg`
    image.classList.add('gallery__item')
    arrayPictures.unshift(image)
}

arrayPictures.map(el => {
    document.querySelector('.gallery').insertAdjacentElement('afterbegin', el)

    el.onclick = function(click) {
        document.querySelector('.modal').classList.remove('visually-hidden')
        const copy = el.cloneNode(true)
        document.querySelector('.modal__main-picture').appendChild(copy)

        document.querySelector('.modal__button-close').onclick = function() {
            copy.remove()
            document.querySelector('.modal').classList.add('visually-hidden')
        }
    }
})
