// all variables call in HTML page
let inputValue = document.getElementById("inputValue"), /// input value for coding or decoding
    outputValue = document.getElementById("outputValue"), /// output value for coding or decoding for result
    inputValueLabel = document.getElementById("inputValueLabel"), /// Label for input value
    copyBtn = document.getElementById("copy-btn"), /// Button for copy result text
    modal = document.getElementById("modal"), /// Message to copying result text
    typeCodeSelect = document.getElementById("typeCode"), /// Selected by type coding
    typroffText = document.getElementById("typroffText"), /// which coding type. for write html text
    keyKodInput = document.getElementById("key"), /// input for key word
    save_key = document.getElementById("save_key"), ///btn which save key word
    outputKey = document.getElementById("outputKey"), /// output span for key word
    codeOrDecode = document.getElementById("codeOrDecode"), /// write html page what syte type code or Decode
    keyKod = 3, /// key for coding or decoding
    isYourWords = true;

///Select our type coding
typeCodeSelect.addEventListener("change", (e) => {
    if (typeCodeSelect.value == "sezar") {
        keyKod = 3;
        keyToInoutVAlue();
    } else if (typeCodeSelect.value == "bolakay") {
        keyKod = 15;
        keyToInoutVAlue();
    }

    /// write in html to type coding
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
        ((64 < result && result <= 90) || (97 <= result && result <= 122)) &&
        typeCodeSelect.value == "sezar"
    ) {
        result += keyKod;
        if (result > 90 && result < 97) {
            result = result - 90 + 64;
        } else if (result > 122) {
            result = result - 122 + 96;
        }
    }

    if (31 < result && result <= 126 && typeCodeSelect.value == "bolakay") {
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
        typeCodeSelect.value == "sezar"
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

    if (31 < result && result <= 126 && typeCodeSelect.value == "bolakay") {
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
    //     navigator.clipboard.writeText(`"${typeCodeSelect.value} : ${keyKod} : ${
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
            <p>Shifirlash turi: <b>${typeCodeSelect.value}</b> </p>
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
save_key.addEventListener("click", () => {
    if (keyKodInput.value) {
        if (typeCodeSelect.value == "sezar") {
            keyKod = +keyKodInput.value % 26;
        }
        if (typeCodeSelect.value == "bolakay") {
            keyKod = +keyKodInput.value % 95;
        }
    }

    keyKodInput.value = "";
    keyToInoutVAlue();
    mainStartCode();
});

/// print in html our key value
function keyToInoutVAlue() {
    outputKey.textContent = keyKod;
}
keyToInoutVAlue();
