'use strict';


function pizzaTimer(ms) {
    const end = new Date().getTime() + ms;

    const interval = setInterval(() => {
        console.log(
            new Intl.DateTimerFormat('ru-RU', {
                minute: 'numeric',
                second: 'numeric' 
            }).format(end + 100 - new Date())
        );
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
        console.log('!!!')
    }, ms)
}

















