// all variables call in HTML page
let inputValue = document.getElementById("inputValue"),
    outputValue = document.getElementById("outputValue"),
    inputValueLabel = document.getElementById("inputValueLabel"),
    copyBtn = document.getElementById("copy-btn"),
    modal = document.getElementById("modal"),
    typeCodeSelect = document.getElementById("typeCode"),
    typroffText = document.getElementById("typroffText"),
    keyKodInput = document.getElementById("key"), /// input for key word
    save_key = document.getElementById("save_key"), ///btn which save key word
    outputKey = document.getElementById("outputKey"), /// output span for key word
    keyKod = 3,
    isYourWords = true;

typeCodeSelect.addEventListener("change", (e) => {
    if (typeCodeSelect.value == "sezar") {
        keyKod = 3;
        keyToInoutVAlue();
    } else if (typeCodeSelect.value == "bolakay") {
        keyKod = 15;
        keyToInoutVAlue();
    }

    typroffText.textContent = `${typeCodeSelect.value} Usulidan foydalanib Codlash:`;
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
    let result = item.charCodeAt();
    if (
        (64 < result && result <= 90) ||
        (97 <= result && result <= 122 && typeCodeSelect.value == "sezar")
    ) {
        result += keyKod;
        if (result > 90 && result < 97) {
            result = result - 90 + 64;
        } else if (result > 122) {
            result = result - 122 + 96;
        }
    }

    if (typeCodeSelect.value == "bolakay") {
        result = item.charCodeAt() - keyKod;

        // this is for Entre, its ASCII code is 10
        if (result == 10 - keyKod) {
            result = 10;
        }
        // for decreased numbers
        else if (result < 32) {
            result = 126 + result - 31;
        }
    }
    return result;
}

// DeCoding ASCII numbers
function qaytar(item) {
    let result = item.charCodeAt();
    if (
        (64 < result && result <= 90) ||
        (97 <= result && result <= 122 && typeCodeSelect.value == "sezar")
    ) {
        result -= keyKod;
        if (result < 65) {
            result = result - 65 + 91;
        } else if (result < 97) {
            result = result - 97 + 123;
        }
    }

    if (typeCodeSelect.value == "bolakay") {
        // Plus our Key Number
        result = item.charCodeAt() + keyKod;

        // this is for Entre, its ASCII code is 10
        if (result == 10 + keyKod) {
            result = 10;
        }
        // For excesses numbers
        else if (result > 126) {
            result = result - 126 + 31;
        }
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

save_key.addEventListener("click", () => {
    if (keyKodInput.value) {
        keyKod = +keyKodInput.value;
    }
    keyKodInput.value = "";
    keyToInoutVAlue();
    mainStartCode();
});

function keyToInoutVAlue() {
    outputKey.textContent = keyKod;
}
keyToInoutVAlue();
