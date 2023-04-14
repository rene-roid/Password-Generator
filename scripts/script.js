const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_-+=";

let length = document.getElementById("length");
let includeUppercase = document.getElementById("uppercase");
let includeNumbers = document.getElementById("numbers");
let includeSymbols = document.getElementById("symbols");
let save = document.getElementById("save_settings_checkbox");

let input_result = document.getElementById("pass_result");

let save_to_localstorage = () => {

    if (save.checked) {
        localStorage.setItem("length", length.value);
        localStorage.setItem("includeUppercase", includeUppercase.checked);
        localStorage.setItem("includeNumbers", includeNumbers.checked);
        localStorage.setItem("includeSymbols", includeSymbols.checked);
        localStorage.setItem("save", save.checked);
    } else {
        localStorage.removeItem("length");
        localStorage.removeItem("includeUppercase");
        localStorage.removeItem("includeNumbers");
        localStorage.removeItem("includeSymbols");
        localStorage.removeItem("save");
    }
}

let load_from_localstorage = () => {
    if (localStorage.getItem("length") != null) {
        length.value = localStorage.getItem("length");
        includeUppercase.checked = localStorage.getItem("includeUppercase") == "true";
        includeNumbers.checked = localStorage.getItem("includeNumbers") == "true";
        includeSymbols.checked = localStorage.getItem("includeSymbols") == "true";
        save.checked = localStorage.getItem("save") == "true";
    }   
}

let reset_settings = () => {
    length.value = 16;
    includeUppercase.checked = true;
    includeNumbers.checked = true;
    includeSymbols.checked = false;
    save_to_localstorage();
}

load_from_localstorage()

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

    if (includeUppercase.checked) {
        password = password.replace(uppercase.charAt(Math.floor(Math.random() * uppercase.length)), password.charAt(Math.floor(Math.random() * password.length)).toUpperCase());
    }
    if (includeNumbers.checked) {
        password = password.replace(numbers.charAt(Math.floor(Math.random() * numbers.length)), Math.floor(Math.random() * 10));
    }
    if (includeSymbols.checked) {
        password = password.replace(symbols.charAt(Math.floor(Math.random() * symbols.length)), symbols.charAt(Math.floor(Math.random() * symbols.length)));
    }

    input_result.value = password;
    save_to_localstorage();
}

let copyPassword = () => {
    input_result.select();
    document.execCommand("copy");
    // alert("Password copied to clipboard");
}

generatePassword()

let save_settings_button = () => {
    if (save.checked) {
        save_to_localstorage();
    } else {
        reset_settings();
    }
}