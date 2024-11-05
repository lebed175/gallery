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
        copy.classList.add('opened')
        copy.classList.remove('gallery__item')
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
        };

        document.querySelector('.modal__main-next').onclick = function (click) {
            currentPhotoNumber++
            document.querySelector('.modal__text').textContent = `${currentPhotoNumber} / 24`
            copy.remove()
            nextPhoto()
            let next = arrayPictures[currentPhotoIndex].cloneNode(true)
            next.classList.remove('gallery__item')
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
        };

        document.querySelector('.modal__main-prev').onclick = function (click) {
            currentPhotoNumber--
            document.querySelector('.modal__text').textContent = `${currentPhotoNumber} / 24`
            copy.remove()
            prevPhoto()
            let prev = arrayPictures[currentPhotoIndex].cloneNode(true)
            prev.classList.remove('gallery__item')
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
        };

        if (currentPhotoNumber === 1) {
            document.querySelector('.modal__main-prev').classList.add('arrow-disabled')
        }

        if (currentPhotoNumber === 24) {
            document.querySelector('.modal__main-next').classList.add('arrow-disabled')
        };
    }
});

const burger = new Image()
burger.src = `./icons/burger.png`
burger.classList.add('burger')

function burgerSizeHide() {
    document.querySelector('.navigation__list').classList.add('visually-hidden')
    document.querySelector('.navigation').appendChild(burger)
};

function burgerSizeShow() {
    burger.remove()
    document.querySelector('.navigation__list').classList.remove('visually-hidden')
};

window.addEventListener('resize', function () {
    if (window.innerWidth <= 662) {
        burgerSizeHide()
    } else {
        burgerSizeShow()
    }
});

burger.onclick = function () {
    document.querySelector('.modal2').classList.remove('visually-hidden')

    document.querySelector('.modal2__button-close').onclick = function () {
        document.querySelector('.modal2').classList.add('visually-hidden')
    }

    document.querySelector('.modal2__content').onclick = function (click) {
        if (click.target.classList.contains('modal2__list') || click.target.classList.contains('modal2__item')) {
            return
        } else {
            document.querySelector('.modal2').classList.add('visually-hidden')
        }
    }
};
