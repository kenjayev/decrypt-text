let inputValue = document.getElementById("inputValue"),
    outputValue = document.getElementById("outputValue"),
    inputValueQ = document.getElementById("inputValueQ"),
    outputValueQ = document.getElementById("outputValueQ");

function shifirla() {
    let stringChars = inputValue.value.split("");
    let stringCharsCodes = stringChars.map((item) => {
        let result = item.charCodeAt() + 3;
        if (result > 126) {
            result = 31 + result - 126;
        }
        return result;
    });
    let newString = "";
    for (let code of stringCharsCodes) {
        newString += String.fromCharCode(code);
    }
    outputValue.value = newString;
}

function qaytar() {
    let stringChars = inputValueQ.value.split("");
    let stringCharsCodes = stringChars.map((item) => {
        let result = item.charCodeAt() - 3;
        if (result < 32) {
            result = 126 + result - 31;
        }
        return result;
    });
    let newString = "";
    for (let code of stringCharsCodes) {
        newString += String.fromCharCode(code);
    }
    outputValueQ.value = newString;
}
