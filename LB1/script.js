const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById('phone-number');
const choiseRadioInput = document.getElementById("choise-radi");
const messageButton = document.getElementById("Send-message");

phoneInput.addEventListener('input', function (e) {
    let input = e.target.value.replace(/\D/g, '').substring(3);
    let formattedInput = '+380';

    if (input.length > 0) {
        formattedInput += ' ' + input.substring(0, 2);
    }
    if (input.length >= 3) {
        formattedInput += ' ' + input.substring(2, 5);
    }
    if (input.length >= 6) {
        formattedInput += ' ' + input.substring(5, 7);
    }
    if (input.length >= 8) {
        formattedInput += ' ' + input.substring(7, 9);
    }

    e.target.value = formattedInput;
});
phoneInput.addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && phoneInput.value.length <= 5) {
        e.preventDefault();
    }
});


messageButton.addEventListener("click", checkData);

function checkData() {
    if (
        nameInput.value == "" ||
        lastNameInput.value == "" ||
        emailInput.value == "" ||
        phoneInput.value == "" ||
        messageButton.value == "" 
        ){
            alert("You have not entered all the data")
        }
    else if(
        phoneInput.value.length < 17
    ){
        alert("Phone number is incorrect") 
    }
    else{
        alert("Your message have been saved. Wait for response!")
    }
}