'use strict';

class User {
    #login;
    #_password;

    constructor(login, password) {
        this.#login = login;
        this.#password = password; //вызывается сеттер
    }

    set #password(pass) {
        this.#_password = pass.split('').reverse().join('');
    }

    get #password() {
        return this.#_password.split('').reverse().join('');
    }

    get login() {
        return this.#login
    }


    checkPassword(pass) {
        return this.#password === pass;
    }

    changePassword(oldPass, newPass){
        console.log(this.#password)
        if(!this.checkPassword(oldPass)){
            return false;
        }
        this.#password = newPass;
    }
}


const user = new User('a@a.ru', '123');
console.log(user);
console.log(user.login);
console.log(user.checkPassword('234'));
console.log(user.checkPassword('123'));
console.log(user.changePassword('123', '234'));



