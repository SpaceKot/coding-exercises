'use strict';

function convert(sum, initialCurrency, convertCurrency) {
    const allCurrencies = [
        { name: 'USD', mult: 1 },
        { name: 'RUB', mult: 1/60 },
        { name: 'EUR', mult: 1.1 }
    ]

    const initial = allCurrencies.find(c => c.name === initialCurrency)
    if (!initial) {
        return null;
    }

    const convert = allCurrencies.find(c => c.name === convertCurrency)
    if (!convert) {
        return null;
    }

    return Intl.NumberFormat('ru-Ru', { style: 'currency', currency: convert.name })
    .format(sum * initial.mult / convert.mult);

}

console.log(convert(10000, 'RUB', 'USD'));
console.log(convert(10000, 'RUB', 'EUR'));
console.log(convert(100, 'USD', 'RUB'));
console.log(convert(100, 'USD', 'EUR'));
console.log(convert(100, 'EUR', 'RUB'));
console.log(convert(100, 'TG', 'RUB'));
console.log(convert(100, 'EUR', 'TG'));







