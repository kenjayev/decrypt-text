// all variables call in HTML page
let inputValue = document.getElementById("inputValue"),
    outputValue = document.getElementById("outputValue"),
    inputValueLabel = document.getElementById("inputValueLabel"),
    keyKod = 15,
    isYourWords = true;

// Each changes use this function and output result
inputValue.addEventListener("input", () => {
    // ASCII numbers arr, coding numbers
    let stringCharsCodes = inputValue.value.split("").map((item) => {
        let result = isYourWords ? shifirla(item) : qaytar(item);
        return result;
    });

    // convert ASCII numbers to letters
    let newString = "";
    for (let code of stringCharsCodes) {
        newString += String.fromCharCode(code);
    }

    //output our result
    outputValue.value = newString;
});

// replays result function, it call in html
function almashtir() {
    isYourWords = !isYourWords;

    // replay values
    let inputValueV = inputValue.value;
    inputValue.value = outputValue.value;
    outputValue.value = inputValueV;

    // Auto focus input Area
    inputValue.focus();

    // input change for decode
    if (!isYourWords) {
        inputValueLabel.textContent = "Shifirlangan matnni kriting: ";
        inputValue.setAttribute(
            "placeholder",
            "Shifirlangan Kodni bu yerga joylang"
        );
    }

    // input change for code
    else {
        inputValueLabel.textContent = "Shifirlanuvchi so'z: ";
        inputValue.setAttribute(
            "placeholder",
            "Shifirlanuvchi so'zni bu yerga kiriting"
        );
    }
}

// Coding ASCII numbers
function shifirla(item) {
    // Mains our Key Number
    let result = item.charCodeAt() - keyKod;

    // this is for Entre, its ASCII code is 10
    if (result == 10 - keyKod) {
        result = 10;
    }
    // for decreased numbers
    else if (result < 32) {
        result = 126 + result - 31;
    }
    return result;
}

// DeCoding ASCII numbers
function qaytar(item) {
    // Plus our Key Number
    let result = item.charCodeAt() + keyKod;

    // this is for Entre, its ASCII code is 10
    if (result == 10 + keyKod) {
        result = 10;
    }
    // For excesses numbers
    else if (result > 126) {
        result = result - 126 + 31;
    }
    return result;
}
