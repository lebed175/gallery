const arrayPictures = []
for (let i = 0; i < 24; i++) {
    const image = new Image()
    image.src = `./pictures/${i + 1}.jpg`
    image.classList.add('gallery__item')
    image.classList.add(`${i + 1}`)
    arrayPictures.unshift(image)
};

let currentPhotoIndex = 0;
let currentPhotoNumber = 0

function nextPhoto() {
    currentPhotoIndex--
};

function prevPhoto() {
    currentPhotoIndex++
};


arrayPictures.map((el, index) => {
    document.querySelector('.gallery').insertAdjacentElement('afterbegin', el)

    el.onclick = function (click) {
        document.querySelector('.modal').classList.remove('visually-hidden')
        currentPhotoNumber = Number(el.classList[1])
        currentPhotoIndex = arrayPictures.indexOf(el)
        const copy = el.cloneNode(true)
        document.querySelector('.modal__main-picture').appendChild(copy)
        document.querySelector('.modal__text').textContent = `${currentPhotoNumber} / 24`

        document.querySelector('.modal__button-close').onclick = function () {
            copy.remove()
            document.querySelector('.modal').classList.add('visually-hidden')
            if (document.querySelector('.modal__main-picture').childElementCount === 1) {
                document.querySelector('.modal__main-picture').firstChild.remove()
            }

            document.querySelector('.modal__main-next').classList.remove('arrow-disabled')
            document.querySelector('.modal__main-prev').classList.remove('arrow-disabled')
        }

        document.querySelector('.modal__main-next').onclick = function (click) {
            currentPhotoNumber++
            document.querySelector('.modal__text').textContent = `${currentPhotoNumber} / 24`
            copy.remove()
            nextPhoto()
            let next = arrayPictures[currentPhotoIndex].cloneNode(true)
            next.classList.add('opened')
            document.querySelector('.modal__main-picture').appendChild(next)

            try {
                if (document.querySelector('.modal__main-picture').firstChild.nextSibling.classList.contains('opened')) {
                    document.querySelector('.modal__main-picture').firstChild.remove()
                }
            } catch (error) {
                console.log(error)
            }

            if (currentPhotoNumber !== 1) {
                document.querySelector('.modal__main-prev').classList.remove('arrow-disabled')
            }

            if (currentPhotoNumber === 24) {
                document.querySelector('.modal__main-next').classList.add('arrow-disabled')
            }

            console.log(currentPhotoNumber)
        }

        document.querySelector('.modal__main-prev').onclick = function (click) {
            currentPhotoNumber--
            document.querySelector('.modal__text').textContent = `${currentPhotoNumber} / 24`
            copy.remove()
            prevPhoto()
            let prev = arrayPictures[currentPhotoIndex].cloneNode(true)
            prev.classList.add('opened')
            document.querySelector('.modal__main-picture').appendChild(prev)

            if (currentPhotoNumber === 1) {
                document.querySelector('.modal__main-prev').classList.add('arrow-disabled')
            }

            if (currentPhotoNumber !== 24) {
                document.querySelector('.modal__main-next').classList.remove('arrow-disabled')
            }

            if (document.querySelector('.modal__main-picture').firstChild.nextSibling.classList.contains('opened')) {
                document.querySelector('.modal__main-picture').firstChild.remove()
            }

            console.log(currentPhotoNumber)
        }

        if (currentPhotoNumber === 1) {
            document.querySelector('.modal__main-prev').classList.add('arrow-disabled')
        }

        if (currentPhotoNumber === 24) {
            document.querySelector('.modal__main-next').classList.add('arrow-disabled')
        }
    }
});
