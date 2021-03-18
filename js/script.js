const url = 'https://my-json-server.typicode.com/Vespand/crmm-tasks/users';

const arr = [];

fetch(url)
    .then(response => response.json())
    // .then(commits => arr.push(commits));
    // .then(commits => console.log(commits[0]));
    .then(commits => commits.forEach( function (arrayItem)
        {
            let id = arrayItem.id;
            let name = arrayItem.name;
            let description = arrayItem.description;
            let avatar = arrayItem.avatar;
            let rating = arrayItem.rating;
            console.log(
                `id: ${id}
                 name: ${name}
                 description: ${description}
                 avatar: ${avatar}
                 rating: ${rating}
                 
                 `
            );
            

        }));


// console.log(arr)
// console.log(arr[0].id)

// let result = arr.map(o => Object.keys(o).map(string => `"${string}"`).join(' ')).join(', ');
// console.log(result);
