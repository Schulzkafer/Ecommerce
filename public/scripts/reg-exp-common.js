
function checkPasswordCommon(arg) {
   if (!arg || typeof arg != 'string') return "You should type correct value";
   if (arg.length < 5 || arg.length > 30) return "Password must be between 5 and 30 characters long";
   if ((/[а-яё]/gi).test(arg)) return "Password must contain only Roman characters, symbols and numbers";
   if ((/[0-9]/g).test(arg)) return "Password must include at least one number";
}


function checkNameSurnameCommon(arg) {
   if (!arg || typeof arg != 'string') return "You should type correct value";
   if (arg.length < 1 || arg.length > 50) return "must be between 1 and 50 characters long";
}

function checkEmailCommon(arg) {
   if (!arg || typeof arg != 'string') return "You should type correct value";
   if (arg.length < 5 || arg.length > 50) "Email must be between 5 and 30 characters long";
   if (!(/.+@.+\..+/i).test(arg)) return "Email must contain '.' and '@'";
}


function checkCardNumberCommon(arg) {
   if (!arg || typeof arg != 'string') return "You should type correct value";
   if ((arg.match(/[0-9]/g) || []).length != 16 && arg.length != 19) return "Card number must be 16 characters long";
   if ((/[^0-9\s]/g).test(arg)) return "Card number must contain 16 digits";
}

function checkcvvCodeCommon(arg) {
   console.log('hahahah')
   if (!arg || typeof arg != 'string') return "You should type correct value";
   if (arg.length != 3) return "CVV number must be 3 characters long";
   if ((/[^0-9]/g).test(arg)) return "CVV number must contain 3 digits";
}

function checkSumCommon(arg) {
   if (!arg || typeof arg != 'string') return "You should type correct value";
   if ((/[^0-9]/g).test(arg)) return "The value must be integer and consist only of digits";
   if (arg.length < 2) return "The minimum value is ten dollars";
   if (arg.length > 5) return "The maximum value is 99999 dollars";
}

function verifyNumberCardInputCommon(arg) {
   let val = document.querySelector(arg).value;
   if (val.length > 19 || (/[^0-9\s]/g).test(val)) {
      document.querySelector(arg).value = val.slice(0, -1);
      return;
   }
   val = val.replace(/\s/g, '');
   let newArg = '';
   for (let i = 0; i < val.length; i++) {
      if (i == 4 || i == 8 || i == 12) {
         newArg = newArg + ' ';
      }
      newArg += val[i];
   }
   document.querySelector(arg).value = newArg;
}

function verifycvvNumberInputCommon(arg) {
   let val = document.querySelector(arg).value;
   if (val.length > 3 || (/[^0-9\s]/g).test(val)) {
      document.querySelector(arg).value = val.slice(0, -1);
      return;
   }
}



