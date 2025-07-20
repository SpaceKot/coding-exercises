'use strict';

//1
function req(id) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://dummyjson.com/products/' + id);
    request.send();

    request.addEventListener('load', function() {
        const data = JSON.parse(this.responseText);
        console.log(data);
    })
}


req(1);
req('');
req(3);

console.log('end');



//1.2
//Avareage price for 30 supplies
const request = new XMLHttpRequestRequest();
request.open('GET', 'https://dummyjson.com/products');
request.send();

request.addEventListener('load', function() {
    console.log('--------------------------------')
    const { products } = JSON.parse(this.responseText);
    console.log(products);
    const sum = products.reduce((acc, p) => acc += p.price, 0);
    console.log(sum / products.length)
})



//2
fetch('https://dummyjson.com/products/1')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));


//2.2
fetch('https://dummyjson.com/products')
    .then(
        response => {
            if(!response.ok) {
                throw new Error(`Is error ${response.status}`);
            }
            return response.json();
        },
        //error => console.log(error)      //
    )
    .then(({ products }) => {
        console.log(products);
        return fetch('https://dummyjson.com/products/') + products[0].id;
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log(error)) //
    .finally(() => {                    //
        console.log('Finally');
    });



//------------------------------------------------------------------
//------------------------------------------------------------------
function createSelect(array){
    const el = document.querySelector('.filter'); //div
    console.log(array);
    el.innerHTML = `<select>
        ${array.map(arrEL => `<option value=${arrEL.slug}>${arrEL.slug}</option>`)}
    </select>`
}

function getCategories() {
    fetch('https://dummyjson.com/products/categories')
    .then(response => response.json())
    .then(data => createSelect(data))
    .catch(error => console.error(`Ошибка: ${error}`))
}

getCategories();






//------------------------------------------------------------------
//------------------------------------------------------------------
function getData(url, errorMessage, method = 'GET') {
    return fetch(url, {method})
        .then(response => {
            if (!response.ok) {
                throw new Error(`${errorMessage} ${response.status}`)
            }
            return response.json(); 
        })
}



getData('https://dummyjson.com/products', 'Can not get products')
    .then(({ products }) => {
        console.log(products);
        return getData('https://dummyjson.com/products/', + products[0].id)
    })
    .then(data => console.log(data))
    .catch(error => {
        const el = document.querySelector('.filter');
        el.innerHTML = error.message;
    });



//------------------------------------------------------------------
//------------------------------------------------------------------


const prom = new Promise((resolve, reject) => {
    if (new Date() < new Date('01/01/2024')) {
        reject(new Error('Error'));
    }
    resolve('Success');
});

prom
    .then(data => console.log(data))
    .catch(error => console.log(error))

//------------------------------------------------------------------

function timeout(sec) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, sec * 1000);
    })
}

timeout(1)
    .then(() => {
        console.log(1);
        return timeout(1);
    })
    .then(() => {
        console.log(1);
        return timeout(1);
    })
    .then(() => {
        console.log(1);
    })


//------------------------------------------------------------------
//------------------------------------------------------------------
function myFetch(url){
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();

        request.addEventListener('load', function() {
            if (this.status == 404 || this.status == 500) {
                reject(new Error(this.status));
            }
            resolve(this.responseText);
        });

        request.addEventListener('error', function() {
            reject(new Error(this.status));
         })

         request.addEventListener('timeout', function() {
            reject(new Error('Timeout'));
         })
    })
}

myFetch('https://dummyjson.com/productss')
    .then(data => console.log(data))
    .catch(err => console.error(err));

