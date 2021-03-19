const url = 'https://my-json-server.typicode.com/Vespand/crmm-tasks/users';

const arr = [];
const toHighArr = [];
const toLowArr = [];



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
/*    .then(function (data) {
            for(let i = 0; i < data.length; i++) {
                arr.push(data[i])
                render()
            }
        }
    )*/
    .then(function(data) {
        arr.push(data)
        render(data)
        setTimeout(() => {
            let low  = data.sort((a, b) => a.rating > b.rating ? 1 : -1);
            low.push(toLowArr)
        },1)
        console.log(data)
    })
    .catch(function (error) {
        console.log('error', error)
    })

function render(data) {
    data.forEach(function (arrayItem) {
        let id = arrayItem.id;
        let name = arrayItem.name;
        let description = arrayItem.description;
        let avatar = arrayItem.avatar;
        let rating = arrayItem.rating;
        let idx = arr.indexOf(arrayItem) + 1;
        let mainContent = document.getElementById('mainContent')
        let div =
            `
                    <div class="content__wrapper flex" id="contentWrapper">
                        <div class="flex">
                            <div class="content__avatar" style="background: url(${avatar}) center no-repeat; background-size: cover;"></div>
                                <div class="content__initials">
                                    <h3>Пользователь:</h3>
                                    <p>${name}</p>
                            </div>
                        </div>
                        <div class="content__rating">
                            <img src="img/star.png" alt="rating_star">
                            <p class="content__rating_value">${rating}</p>
                        </div>
                    </div>
                `;
        mainContent.insertAdjacentHTML('afterbegin', '')
        mainContent.insertAdjacentHTML('afterbegin', div)
    })
}

const sortToHighBtn = document.getElementById('sortToHighBtn');
const sortToLowBtn = document.getElementById('sortToLowBtn');

// function sortToLow(data) {
//     data.sort((a, b) => a.rating > b.rating ? 1 : -1);
//     render(data);
// }

