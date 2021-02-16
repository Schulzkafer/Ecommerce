function checkPasswordCommon(arg) {
if (arg.length < 5 | arg.length > 30) return "Password must be between 5 and 30 characters long";
if ((/[а-яё]/gi).test(arg)) return "Password must contain only Roman characters, symbols and numbers";
if ((/[0-9]/g).test(arg)) return "Password must include at least one number";
}