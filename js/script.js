const url = 'https://my-json-server.typicode.com/Vespand/crmm-tasks/users';

const arr = [];
const toHighArr = [];
const toLowArr = [];
const mainContent = document.getElementById('mainContent')



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
    data.forEach(function (arrayItem) {
        let div =
            `
                    <div class="content__wrapper flex" id="contentWrapper">
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
    })
}

const sortToHighBtn = document.getElementById('sortToHighBtn');
const sortToLowBtn = document.getElementById('sortToLowBtn');
sortToHighBtn.addEventListener('click', function () {
    {
        const toHigh = [];
        let sort = arr[0].sort((a, b) => a.rating > b.rating ? 1 : -1);
        clear();
        renderToHigh(sort)
        function renderToHigh(sort) {
            sort.forEach(function (arrayItem) {
                mainContent.insertAdjacentHTML('afterbegin',
                    `
                    <div class="content__wrapper flex" id="contentWrapper">
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
                `)

            })
        }
    }
})

sortToLowBtn.addEventListener('click', function () {
    {
        const toLow = [];
        let sort = arr[0].sort((a, b) => a.rating < b.rating ? 1 : -1);
        clear();
        renderToHigh(sort)
        // toHigh.push(sort)
        // console.log(toHigh[0])
        function renderToHigh(sort) {
            sort.forEach(function (arrayItem) {
                // let mainContent = document.getElementById('mainContent')
                // let div =
                mainContent.insertAdjacentHTML('afterbegin',
                    `
                    <div class="content__wrapper flex" id="contentWrapper">
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
                `)

            })
        }
    }
})

/*sortToHighBtn.addEventListener('click', function () {
    {
        const toHigh = [];
        function sort (){
                        let flag = true  // создаём флаг
                            ,   predicates = {
                                'asc' : function(a, b){ return (a.rating>b.rating) - (b.rating>a.rating) }
                            ,   'desc': function(a, b){ return (a.rating<b.rating) - (b.rating<a.rating) }
                        }
                        return function(arr){
                            flag = !flag // который при каждом вызове переключаем
                            arr.sort(predicates[flag ? 'asc' : 'desc'])
                            // и сортируем в зависимости от его значения
                        }
                    }
                    sort(arr[0])
        console.log(arr[0])
        clear();
        // renderToHigh(sort)
        /!*function renderToHigh(sort) {
            sort.forEach(function (arrayItem) {
                mainContent.insertAdjacentHTML('afterbegin',
                    `
                    <div class="content__wrapper flex" id="contentWrapper">
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
                `)

            })
        }*!/
    }
})*/

function clear() {
    mainContent.innerHTML = '';
}
