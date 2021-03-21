const url = 'https://my-json-server.typicode.com/Vespand/crmm-tasks/users';

const arr = [];
const mainContent = document.getElementById('mainContent');
const modalWindow = document.getElementById('modal');
const body = document.body;


// Getting json from API
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
        arr.push(data);
        clear();
        sort(data);
        foo(data);

    })
    .catch(function (error) {
        console.log('error', error);
    })

/** Sorting main array
 * returns sorted array from low to high data value
 * @param { array } data
*/

function sort (data) {
    return data.sort((a, b) => a.rating < b.rating ? 1 : -1);
}

/** iterating data array
 * rendering filter from low to high
 * rendering modal window
 * @param data
 */
function foo(data) {
    data.forEach(function (arrayItem, index) {
        let div = `
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

                modalWindowWrapper.addEventListener('click', event => {
                    event.stopPropagation();
                })
                closeBtn.addEventListener('click', () => {
                    closeModal(modalWindow);
                })
                modalWindow.addEventListener('click', () => {
                    closeModal(modalWindow);
                })
                function closeModal(modalWindow) {
                    modalWindow.classList.add('displayNone');
                    body.classList.remove('no-scroll');
                }
            })
        }, 1);
        mainContent.insertAdjacentHTML('afterbegin', '');
        mainContent.insertAdjacentHTML('afterbegin', div);
    })
}

const sortToHighBtn = document.getElementById('sortToHighBtn');
const sortToLowBtn = document.getElementById('sortToLowBtn');

/*
    getting filter button from low to high value
    toggling it with another filter button from high to low value
 */
sortToHighBtn.addEventListener('click', () => {
    sortToLowBtn.classList.toggle('displayNone');
    sortToHighBtn.classList.toggle('displayNone');
    let reversedArr = arr[0].reverse();
    clear();
    renderToHigh(reversedArr);

/** iterating reversedArr array
 * rendering filter from low to high rating value
 * @param reversedArr
 */
    function renderToHigh(reversedArr) {
        reversedArr.forEach(function (arrayItem, index) {
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

//  inserting content in div  class = '.content__main' // id = 'mainContent'

            mainContent.insertAdjacentHTML('afterbegin', '')
            mainContent.insertAdjacentHTML('afterbegin', div)

//  rendering modal window

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
                                        <span class="modal__wrapper_text_mainText">${arr[0].length - (index)}</span>
                                    </div>
                                </div>
                                <div class="modal__wrapper_footer">
                                    <span>О себе:</span>
                                    <span>${arrayItem.description}</span>
                                </div>
                            </div>
                        `;

//  inserting content in div  class = '.modal' // id = 'modal'

                    modalWindow.innerHTML = '';
                    modalWindow.insertAdjacentHTML('afterbegin', div)

                    const modalWindowWrapper = modalWindow.querySelector('.modal__wrapper');
                    const closeBtn = document.getElementById('closeBtn');

//  preventing closing by clicking inside modal window

                    modalWindowWrapper.addEventListener('click', event => {
                        event.stopPropagation();
                    })

//  closing modal window by clicking close button

                    closeBtn.addEventListener('click', () => {
                        closeModal(modalWindow);
                    })

//  closing modal window by clicking outside modal window (clicking on body mask)

                    modalWindow.addEventListener('click', () => {
                        closeModal(modalWindow);
                    })


                    /** adding display: none to modal window and removing no-scroll from body
                     * @param modalWindow
                     */
                    function closeModal(modalWindow) {
                        modalWindow.classList.add('displayNone');
                        body.classList.remove('no-scroll');
                    }
                })
            }, 1)

        })
    }
});

sortToLowBtn.addEventListener('click', () => {
    sortToLowBtn.classList.toggle('displayNone');
    sortToHighBtn.classList.toggle('displayNone');
    let data = arr[0]
    clear()
    renderToLow(data);

/** iterating renderToLow array
 * rendering filter from high to low rating value
 * @param data
 */
    function renderToLow(data) {
        sort(data);
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

//  inserting content in div  class = '.content__main' // id = 'mainContent'

            mainContent.insertAdjacentHTML('afterbegin', '')
            mainContent.insertAdjacentHTML('afterbegin', div)

//  rendering modal window

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

//  inserting content in div  class = '.modal' // id = 'modal'

                    modalWindow.innerHTML = '';
                    modalWindow.insertAdjacentHTML('afterbegin', div)

                    const modalWindowWrapper = modalWindow.querySelector('.modal__wrapper');
                    const closeBtn = document.getElementById('closeBtn');

//  preventing closing by clicking inside modal window

                    modalWindowWrapper.addEventListener('click', event => {
                        event.stopPropagation();
                    })

//  closing modal window by clicking close button

                    closeBtn.addEventListener('click', () => {
                        closeModal(modalWindow);
                    })

//  closing modal window by clicking outside modal window (clicking on body mask)

                    modalWindow.addEventListener('click', () => {
                        closeModal(modalWindow);
                    })

/** adding display: none to modal window and removing no-scroll from body
* @param modalWindow
*/

                    function closeModal(modalWindow) {
                        modalWindow.classList.add('displayNone');
                        body.classList.remove('no-scroll');
                    }
                })
            }, 1)

        })
    }

});


//  clearing mainContent div
function clear() {
    mainContent.innerHTML = '';
}
