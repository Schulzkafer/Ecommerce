module.exports.cvvCodeValidator = function (arg) {
    console.log('start')
        if (!arg || typeof arg != 'string') return "You should type correct value";
        if (arg.length != 3) return "CVV number must be 3 characters long";
        if ((/[^0-9]/g).test(arg)) return "CVV number must contain 3 digits";
        console.log('finish')
}