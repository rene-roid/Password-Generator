const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_-+=";

let length = document.getElementById("length");
let includeUppercase = document.getElementById("uppercase");
let includeNumbers = document.getElementById("numbers");
let includeSymbols = document.getElementById("symbols");

let input_result = document.getElementById("pass_result");

let curr_random = () => {
    let final_string = "";
    final_string += lowercase;
    if (includeUppercase.checked) {
        final_string += uppercase;
    }
    if (includeNumbers.checked) {
        final_string += numbers;
    }
    if (includeSymbols.checked) {
        final_string += symbols;
    }
    console.log(final_string);
    final_string = final_string.split('').sort(function(){return 0.5-Math.random()}).join('');
    return final_string;
}

let generatePassword = () => {
    let final_string = curr_random();
    let password = "";
    for (let i = 0; i < length.value; i++) {
        password += final_string[Math.floor(Math.random() * final_string.length)];
    }
    input_result.value = password;
}

let copyPassword = () => {
    input_result.select();
    document.execCommand("copy");
    // alert("Password copied to clipboard");
}

generatePassword();