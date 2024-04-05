const pass = document.getElementById('password');
const confirmPass = document.getElementById('confirm');
const message = document.querySelector('#formMessage');
const rangevalueOutput = document.getElementById('rangevalueOutput');
const range = document.getElementById('rate');

confirmPass.addEventListener('focusout', checkSame);

function checkSame() {
    if (pass.value !== confirmPass.value) {
        message.textContent = '❗Key Phrases DO NOT MATCH!';
        message.style.color = 'red';
        message.style.margin = '10px';
        confirmPass.value = '';
        confirmPass.focus();
    } else {
        message.textContent = '';
        message.style.display = "none";
    }
}

range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalueOutput.innerHTML = range.value;
}
