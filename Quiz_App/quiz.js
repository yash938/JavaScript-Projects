function total() {
    let count = 0;
    if (document.getElementById("option1d").checked == true) {
        count = count + 1;
    }

    if (document.getElementById("option2c").checked == true) {
        count = count + 1;
    }

    if (document.getElementById("option3a").checked == true) {
        count = count + 1;
    }

    if (document.getElementById("option4a").checked == true) {
        count = count + 1;
    }

    if (document.getElementById("option5c").checked == true) {
        count = count + 1;
    }

    function clearRadioButton() {
        var radioButtonArray = document.getElementsByClassName('option');

        for (var i = 0; radioButtonArray.length; i++){
            var radioButton = radioButtonArray[i];
            radioButton.checked = false;
        }
    }
    
    if (confirm("Your raw score is : " + count + " out of 5")) {
        clearRadioButton();
    }
    
}    

