let inputValue = document.getElementById("inputValue"),
    outputValue = document.getElementById("outputValue"),
    inputValueLabel = document.getElementById("inputValueLabel"),
    keyKod = 15,
    isYourWords = true;

inputValue.addEventListener("input", () => {
    let stringCharsCodes = inputValue.value.split("").map((item) => {
        let result = isYourWords ? shifirla(item) : qaytar(item);
        return result;
    });
    let newString = "";
    for (let code of stringCharsCodes) {
        newString += String.fromCharCode(code);
    }
    outputValue.value = newString;
});
function almashtir() {
    isYourWords = !isYourWords;
    let inputValueV = inputValue.value;
    inputValue.value = outputValue.value;
    outputValue.value = inputValueV;
    if (!isYourWords) {
        inputValueLabel.textContent = "Shifirlangan matnni kriting: ";
        inputValue.setAttribute(
            "placeholder",
            "Shifirlangan Kodni bu yerga joylang"
        );
    } else {
        inputValueLabel.textContent = "Shifirlanuvchi so'z: ";
        inputValue.setAttribute(
            "placeholder",
            "Shifirlanuvchi so'zni bu yerga kiriting"
        );
    }

    inputValueLabel.classList.add("animation");
}
function shifirla(item) {
    let result = item.charCodeAt() - keyKod;
    if (result == 10 - keyKod) {
        result = 10;
    } else if (result < 32) {
        result = 126 + result - 31;
    }
    return result;
}
function qaytar(item) {
    let result = item.charCodeAt() + keyKod;
    if (result == 10 + keyKod) {
        result = 10;
    } else if (result > 126) {
        result = result - 126 + 31;
    }
    return result;
}
