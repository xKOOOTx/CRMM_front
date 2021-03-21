const url = 'https://my-json-server.typicode.com/Vespand/crmm-tasks/users';

const arr = [];
const toHighArr = [];
const toLowArr = [];
const mainContent = document.getElementById('mainContent');
const modalWindow = document.getElementById('modal');
const body = document.body;



let status = function (response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
}
let json = function (response) {
    return response.json()
}

fetch(url)
    .then(status)
    .then(json)
    .then(function(data) {
        arr.push(data)
        clear();
        render(data)

    })
    .catch(function (error) {
        console.log('error', error)
    })

function render(data) {
    data.forEach(function (arrayItem, index) {
        let div =
            `
                    <div class="content__wrapper flex" id="${arrayItem.id}" data-modal="${arrayItem.id}">
                        <div class="flex">
                            <div class="content__avatar" style="background: url(${arrayItem.avatar}) center no-repeat; background-size: cover;"></div>
                                <div class="content__initials">
                                    <h3>Пользователь:</h3>
                                    <p>${arrayItem.name}</p>
                            </div>
                        </div>
                        <div class="content__rating">
                            <img src="img/star.png" alt="rating_star">
                            <p class="content__rating_value">${arrayItem.rating}</p>
                        </div>
                    </div>
                `;
        setTimeout(() => {
            const modalBtn = document.getElementById(`${arrayItem.id}`);
            modalBtn.addEventListener('click', () => {
                modalWindow.classList.remove('displayNone');
                body.classList.add('no-scroll');
                let div =
                    `
                    <div class="modal__wrapper" id="modalWrapper">
                        <div class="modal__wrapper_header">
                            <div class="modal__wrapper_header_text">Профиль пользователя:</div>
                            <button class="modal__wrapper_header_close" id="closeBtn">
                                <img src="img/close_btn.png" alt="close">
                            </button>
                        </div>
                        <div class="modal__wrapper_main">
                            <div class="modal__wrapper_avatar" style="background: url(${arrayItem.avatar}) center no-repeat; background-size: cover;"></div>
                            <div class="modal__wrapper_text">
                                <span class="modal__wrapper_text_header">Имя:</span>
                                <span class="modal__wrapper_text_mainText">${arrayItem.name}</span>
                                <span class="modal__wrapper_text_header">Баллы:</span>
                                <span class="modal__wrapper_text_mainText">${arrayItem.rating}</span>
                                <span class="modal__wrapper_text_header">Позиция в рейтинге:</span>
                                <span class="modal__wrapper_text_mainText">${index + 1}</span>
                            </div>
                        </div>
                        <div class="modal__wrapper_footer">
                            <span>О себе:</span>
                            <span>${arrayItem.description}</span>
                        </div>
                    </div>
                    `;

                modalWindow.innerHTML = '';
                modalWindow.insertAdjacentHTML('afterbegin', div)

                const modalWindowWrapper = modalWindow.querySelector('.modal__wrapper');
                const closeBtn = document.getElementById('closeBtn');

                console.log(arrayItem.id)
                modalWindowWrapper.addEventListener('click', event => {
                    event.stopPropagation();
                })
                closeBtn.addEventListener('click', event => {
                    closeModal(modalWindow);
                })
                modalWindow.addEventListener('click', event => {
                    closeModal(modalWindow);
                })
                function closeModal(modalWindow) {
                    modalWindow.classList.add('displayNone');
                    body.classList.remove('no-scroll');
                }
            })
        }, 1)
        mainContent.insertAdjacentHTML('afterbegin', '')
        mainContent.insertAdjacentHTML('afterbegin', div)

    })
}

const sortToHighBtn = document.getElementById('sortToHighBtn');
const sortToLowBtn = document.getElementById('sortToLowBtn');
sortToHighBtn.addEventListener('click', function () {
    {
        sortToLowBtn.classList.toggle('displayNone');
        sortToHighBtn.classList.toggle('displayNone');
        let sort = arr[0].sort((a, b) => a.rating > b.rating ? 1 : -1);
        clear();
        renderToHigh(sort)
        function renderToHigh(sort) {
            sort.forEach(function (arrayItem, index) {
                let div =
                    `
                    <div class="content__wrapper flex" id="${arrayItem.id}" data-modal="${arrayItem.id}">
                        <div class="flex">
                            <div class="content__avatar" style="background: url(${arrayItem.avatar}) center no-repeat; background-size: cover;"></div>
                                <div class="content__initials">
                                    <h3>Пользователь:</h3>
                                    <p>${arrayItem.name}</p>
                            </div>
                        </div>
                        <div class="content__rating">
                            <img src="img/star.png" alt="rating_star">
                            <p class="content__rating_value">${arrayItem.rating}</p>
                        </div>
                    </div>
                `;
                mainContent.insertAdjacentHTML('afterbegin', '')
                mainContent.insertAdjacentHTML('afterbegin', div)
                setTimeout(() => {
                    const modalBtn = document.getElementById(`${arrayItem.id}`);
                    modalBtn.addEventListener('click', () => {
                        modalWindow.classList.remove('displayNone');
                        body.classList.add('no-scroll');
                        let div =
                            `
                    <div class="modal__wrapper" id="modalWrapper">
                        <div class="modal__wrapper_header">
                            <div class="modal__wrapper_header_text">Профиль пользователя:</div>
                            <button class="modal__wrapper_header_close" id="closeBtn">
                                <img src="img/close_btn.png" alt="close">
                            </button>
                        </div>
                        <div class="modal__wrapper_main">
                            <div class="modal__wrapper_avatar" style="background: url(${arrayItem.avatar}) center no-repeat; background-size: cover;"></div>
                            <div class="modal__wrapper_text">
                                <span class="modal__wrapper_text_header">Имя:</span>
                                <span class="modal__wrapper_text_mainText">${arrayItem.name}</span>
                                <span class="modal__wrapper_text_header">Баллы:</span>
                                <span class="modal__wrapper_text_mainText">${arrayItem.rating}</span>
                                <span class="modal__wrapper_text_header">Позиция в рейтинге:</span>
                                <span class="modal__wrapper_text_mainText">${index + 1}</span>
                            </div>
                        </div>
                        <div class="modal__wrapper_footer">
                            <span>О себе:</span>
                            <span>${arrayItem.description}</span>
                        </div>
                    </div>
                    `;

                        modalWindow.innerHTML = '';
                        modalWindow.insertAdjacentHTML('afterbegin', div)

                        const modalWindowWrapper = modalWindow.querySelector('.modal__wrapper');
                        const closeBtn = document.getElementById('closeBtn');

                        console.log(arrayItem.id)
                        modalWindowWrapper.addEventListener('click', event => {
                            event.stopPropagation();
                        })
                        closeBtn.addEventListener('click', event => {
                            closeModal(modalWindow);
                        })
                        modalWindow.addEventListener('click', event => {
                            closeModal(modalWindow);
                        })
                        function closeModal(modalWindow) {
                            modalWindow.classList.add('displayNone');
                            body.classList.remove('no-scroll');
                        }
                    })
                }, 500)

            })
        }

    }
})

sortToLowBtn.addEventListener('click', function () {
    {
        sortToLowBtn.classList.toggle('displayNone');
        sortToHighBtn.classList.toggle('displayNone');
        let sort = arr[0].sort((a, b) => a.rating < b.rating ? 1 : -1);
        clear();
        renderToLow(sort)
        function renderToLow(sort) {
            sort.forEach(function (arrayItem, index) {
                let div =
                    `
                    <div class="content__wrapper flex" id="${arrayItem.id}" data-modal="${arrayItem.id}">
                        <div class="flex">
                            <div class="content__avatar" style="background: url(${arrayItem.avatar}) center no-repeat; background-size: cover;"></div>
                                <div class="content__initials">
                                    <h3>Пользователь:</h3>
                                    <p>${arrayItem.name}</p>
                            </div>
                        </div>
                        <div class="content__rating">
                            <img src="img/star.png" alt="rating_star">
                            <p class="content__rating_value">${arrayItem.rating}</p>
                        </div>
                    </div>
                `;
                mainContent.insertAdjacentHTML('afterbegin', '')
                mainContent.insertAdjacentHTML('afterbegin', div)
                setTimeout(() => {
                    const modalBtn = document.getElementById(`${arrayItem.id}`);
                    modalBtn.addEventListener('click', () => {
                        modalWindow.classList.remove('displayNone');
                        body.classList.add('no-scroll');
                        let div =
                            `
                    <div class="modal__wrapper" id="modalWrapper">
                        <div class="modal__wrapper_header">
                            <div class="modal__wrapper_header_text">Профиль пользователя:</div>
                            <button class="modal__wrapper_header_close" id="closeBtn">
                                <img src="img/close_btn.png" alt="close">
                            </button>
                        </div>
                        <div class="modal__wrapper_main">
                            <div class="modal__wrapper_avatar" style="background: url(${arrayItem.avatar}) center no-repeat; background-size: cover;"></div>
                            <div class="modal__wrapper_text">
                                <span class="modal__wrapper_text_header">Имя:</span>
                                <span class="modal__wrapper_text_mainText">${arrayItem.name}</span>
                                <span class="modal__wrapper_text_header">Баллы:</span>
                                <span class="modal__wrapper_text_mainText">${arrayItem.rating}</span>
                                <span class="modal__wrapper_text_header">Позиция в рейтинге:</span>
                                <span class="modal__wrapper_text_mainText">${index + 1}</span>
                            </div>
                        </div>
                        <div class="modal__wrapper_footer">
                            <span>О себе:</span>
                            <span>${arrayItem.description}</span>
                        </div>
                    </div>
                    `;

                        modalWindow.innerHTML = '';
                        modalWindow.insertAdjacentHTML('afterbegin', div)

                        const modalWindowWrapper = modalWindow.querySelector('.modal__wrapper');
                        const closeBtn = document.getElementById('closeBtn');

                        console.log(arrayItem.id)
                        modalWindowWrapper.addEventListener('click', event => {
                            event.stopPropagation();
                        })
                        closeBtn.addEventListener('click', event => {
                            closeModal(modalWindow);
                        })
                        modalWindow.addEventListener('click', event => {
                            closeModal(modalWindow);
                        })
                        function closeModal(modalWindow) {
                            modalWindow.classList.add('displayNone');
                            body.classList.remove('no-scroll');
                        }
                    })
                }, 500)

            })
        }
    }
})



function clear() {
    mainContent.innerHTML = '';
}




