// all variables call in HTML page
let inputValue = document.getElementById("inputValue"),
    outputValue = document.getElementById("outputValue"),
    inputValueLabel = document.getElementById("inputValueLabel"),
    copyBtn = document.getElementById("copy-btn"),
    modal = document.getElementById("modal"),
    typeCodeSelect = document.getElementById("typeCode"),
    keyKod = -3,
    isYourWords = true;

typeCodeSelect.addEventListener("change", (e) => {
    if (typeCodeSelect.value == "sezer") {
        keyKod = -3;
    } else if (typeCodeSelect.value == "sezer_pro_max") {
        keyKod = 15;
    }

    mainStartCode();
});
// Each changes use this function and output result
inputValue.addEventListener("input", mainStartCode);

function mainStartCode() {
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
    privetCopy(outputValue);
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

// Copy your result value
function copyResult() {
    console.log(outputValue.value);
    navigator.clipboard.writeText(outputValue.value);
    modal.style.display = "block";
    setTimeout(() => {
        modal.style.display = "none";
    }, 2500);
}

// hidden or block Copy img element
function privetCopy(outputValue) {
    if (outputValue.value.length === 0) {
        copyBtn.style.display = "none";
    } else if (outputValue.value.length > 0) {
        copyBtn.style.display = "block";
    }
}

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
