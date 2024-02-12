// all variables call in HTML page
let inputValue = document.getElementById("inputValue"), /// input value for coding or decoding, first Textarea
    outputValue = document.getElementById("outputValue"), /// output value for coding or decoding for result, second Textarea
    inputValueLabel = document.getElementById("inputValueLabel"), /// Label for input value, top of first Textarea
    copyBtn = document.getElementById("copy-btn"), /// Button for copy result text
    clear_textarea = document.getElementById("clear_textarea"),
    modal = document.getElementById("modal"), /// Message to copying result text
    typeCodeSelect = document.getElementById("typeCodeSelect"), /// Selected by type coding
    typeCodeRadios = document.querySelectorAll("input[name='typeCoding']"),
    typroffText = document.getElementById("typroffText"), /// which coding type. for write html text
    outputKey = document.getElementById("outputKey"), /// output span for key word
    keyKodInput = document.getElementById("key"), /// input for key word
    keyKod = 3, /// key for coding or decoding
    typeKod = "Sezar", /// type of coding which coding type sezar or bolakay
    isYourWords = true;

///Select our type coding
typeCodeSelect.addEventListener("change", (e) => {
    typeKod = e.target.value;
    changeTypeCoding();
    typeCodeRadios.forEach((radio) => {
        if (typeKod === radio.value) {
            radio.checked = true;
        }
    });
});

/// Select our coding type with radio buttons
typeCodeRadios.forEach((radio) => {
    radio.addEventListener("click", (e) => {
        typeKod = e.target.value;
        changeTypeCoding();
        typeCodeSelect.value = typeKod;
    });
});

/// main change codes
function changeTypeCoding() {
    if (typeKod == "Sezar") {
        keyKod = 3;
        keyToInOutValue();
    } else if (typeKod == "Bolakay") {
        keyKod = 15;
        keyToInOutValue();
    }

    /// write in html to type coding
    typroffText.innerHTML = `${typeKod} Usulidan foydalanib <span id="codeOrDecode">${
        isYourWords ? "Codlash" : "Decodlash"
    }</span>:`;
    /// again work main coding;
    mainStartCode();
}

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
        ((64 < result && result <= 90) || (97 <= result && result <= 122)) &&
        typeKod == "Sezar"
    ) {
        result += keyKod;
        if (result > 90 && result < 97) {
            result = result - 90 + 64;
        } else if (result > 122) {
            result = result - 122 + 96;
        }
    }

    if (31 < result && result <= 126 && typeKod == "Bolakay") {
        result -= keyKod;
        // for decreased numbers
        if (result < 32) {
            result = 126 + result - 31;
        } else if (result > 126) {
            result = result - 126 + 31;
        }
    }
    return result;
}

// DeCoding ASCII numbers
function qaytar(item) {
    let result = item.charCodeAt();
    if (
        ((64 < result && result <= 90) || (97 <= result && result <= 122)) &&
        typeKod == "Sezar"
    ) {
        console.log(result);
        result -= keyKod;
        console.log(result);

        if (result < 65) {
            result = result - 65 + 91;
        }

        if (result < 97 && result > 90) {
            result = result - 97 + 123;
        }
    }

    if (31 < result && result <= 126 && typeKod == "Bolakay") {
        // Plus our Key Number
        result += keyKod;

        // For excesses numbers
        if (result > 126) {
            result = result - 126 + 31;
        } else if (result < 32) {
            result = result - 32 + 127;
        }
    }
    return result;
}

// Copy your result value
function copyResult() {
    // copy text in buffer
    //     navigator.clipboard.writeText(`"${typeKod} : ${keyKod} : ${
    //         isYourWords ? "Code" : "Decode"
    //     }"

    // ${outputValue.value}
    //     `);
    navigator.clipboard.writeText(outputValue.value);

    modal.style.display = "block";
    modal.innerHTML += `
    <p> Natija muvaffaqiyatli nusxalandi</p>
    `;
    setTimeout(() => {
        modal.innerHTML += `
            <p>Shifirlash turi: <b>${typeKod}</b> </p>
        `;
    }, 800);
    setTimeout(() => {
        modal.innerHTML += `
            <p>Kalit: <b>${keyKod}</b> </p>
        `;
    }, 1600);
    setTimeout(() => {
        modal.style.display = "none";
        modal.innerHTML = "";
    }, 3000);
}

// clear btn fpr input textarea
function clearInput() {
    inputValue.value = "";
    mainStartCode();
}

// hidden or block Copy and clear btn element
function privetCopy(outputValue) {
    if (outputValue.value.length === 0) {
        clear_textarea.style.display = "none";
        copyBtn.style.display = "none";
    } else if (outputValue.value.length > 0) {
        clear_textarea.style.display = "block";
        copyBtn.style.display = "block";
    }
}

// replays result function, it call in html
function almashtir() {
    let codeOrDecode = document.getElementById("codeOrDecode"); /// write html page what syte type code or Decode, inside typroffText
    isYourWords = !isYourWords;

    // replay values
    let inputValueV = inputValue.value;
    inputValue.value = outputValue.value;
    outputValue.value = inputValueV;

    // Auto focus input Area
    inputValue.focus();

    // input change for decode
    if (!isYourWords) {
        codeOrDecode.textContent = "Decodlash";
        inputValueLabel.textContent = "Shifirlangan matnni kriting: ";
        inputValue.setAttribute(
            "placeholder",
            "Shifirlangan Kodni bu yerga joylang"
        );
    }

    // input change for code
    else {
        codeOrDecode.textContent = "Codlash";
        inputValueLabel.textContent = "Shifirlanuvchi so'z: ";
        inputValue.setAttribute("placeholder", "Asl so'zni bu yerga kiriting");
    }
}

/// Save our new Kay code
function save_key() {
    if (keyKodInput.value) {
        if (typeKod == "Sezar") {
            keyKod = +keyKodInput.value % 26;
        }
        if (typeKod == "Bolakay") {
            keyKod = +keyKodInput.value % 95;
        }
    }

    keyKodInput.value = "";
    keyToInOutValue();
    mainStartCode();
}

/// print in html our key value
function keyToInOutValue() {
    outputKey.textContent = keyKod;
}
keyToInOutValue();
