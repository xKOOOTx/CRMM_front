let id = arrayItem.id;
let name = arrayItem.name;
let description = arrayItem.description;
let avatar = arrayItem.avatar;
let rating = arrayItem.rating;
let mainContent = document.getElementById('mainContent')

mainContent.insertAdjacentHTML('afterbegin', (
    `
                <div class="content__wrapper flex">
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
            `
))
