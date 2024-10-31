const arrayPictures = []
for (let i = 0; i < 24; i++) {
    const image = new Image()
    image.src = `./pictures/${i + 1}.jpg`
    image.classList.add('gallery__item')
    arrayPictures.unshift(image)
};

let currentPhotoIndex = 0;

function nextPhoto() {
    currentPhotoIndex--
};

function prevPhoto() {
    currentPhotoIndex++
};


arrayPictures.map(el => {
    document.querySelector('.gallery').insertAdjacentElement('afterbegin', el)

    el.onclick = function (click) {
        document.querySelector('.modal').classList.remove('visually-hidden')
        currentPhotoIndex = arrayPictures.indexOf(el)
        const copy = el.cloneNode(true)
        document.querySelector('.modal__main-picture').appendChild(copy)

        document.querySelector('.modal__button-close').onclick = function () {
            copy.remove()
            document.querySelector('.modal').classList.add('visually-hidden')
        }

        document.querySelector('.modal__main-next').onclick = function (click) {
            copy.remove()
            nextPhoto()
            let next = arrayPictures[currentPhotoIndex].cloneNode(true)
            next.classList.add('opened')
            document.querySelector('.modal__main-picture').appendChild(next)

            if (document.querySelector('.modal__main-picture').firstChild.nextSibling.classList.contains('opened')) {
                document.querySelector('.modal__main-picture').firstChild.remove()
            }
        }

        document.querySelector('.modal__main-prev').onclick = function (click) {
            copy.remove()
            prevPhoto()
            let prev = arrayPictures[currentPhotoIndex].cloneNode(true)
            prev.classList.add('opened')
            document.querySelector('.modal__main-picture').appendChild(prev)

            if (document.querySelector('.modal__main-picture').firstChild.nextSibling.classList.contains('opened')) {
                document.querySelector('.modal__main-picture').firstChild.remove()
            }
        }
    }
});


// Пофиксить баги:
// 1) При выходе с фото с помощью крестика, и, затем, открытии рандомной фотографии снова, открывается модальное окно с последней фотографией;
// 2) Если листать до упора вправо или влево, то currentPhotoIndex наберёт в себя лишние числа, и, затем, чтобы отлистать обратно нужно прокликать такое кол-во раз, 
// сколько было накликано после упора;
// 3) Доделать момент с цифрой слева сверху модального окна, она будет напрямую связана с currentPhotoIndex;
// 4) Сделать псеводэлемент крестика (это связано с массивом, который вместил в себя лишь 24 элемента, стоит увеличить x2 (???))
// Если обнаружаться ещё баги, то отмечать их и затем исправлять.
