module.exports.checkCardNumberCommon = function (arg) {
   if (!arg || typeof arg != 'string') return "You should type correct value";
   if ((arg.match(/[0-9]/g) || []).length != 16 && arg.length != 19) return "Card number must be 16 characters long";
   if ((/[^0-9\s]/g).test(arg)) return "Card number must contain 16 digits";
}

module.exports.cvvCodeValidator = function (arg) {
   if (!arg || typeof arg != 'string') return "You should type correct value";
   if (arg.length != 3) return "CVV number must be 3 characters long";
   if ((/[^0-9]/g).test(arg)) return "CVV number must contain 3 digits";
}

module.exports.checkSumCommon = function (arg) {
   if (!arg || typeof arg != 'string') return "You should type correct value";
   if ((/[^0-9]/g).test(arg)) return "The value must be integer and consist only of digits";
   if (arg.length < 2) return "The minimum value is ten dollars";
   if (arg.length > 5) return "The maximum value is 99999 dollars";
}