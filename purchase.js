function validate() {
    let amount = document.getElementById("amount").value;
    let network = document.getElementById("network").value;
    let phone = document.getElementById("phone").value;
    let errors = document.getElementById("errors")
    errors.innerText ="";

    if (isNaN(amount) || amount < 100 ) {
        errors.innerText = "Please enter valid amount greater than 100";
        return false;
    }

    if (isNaN(phone) || phone.length < 11 ) {
        errors.innerText = "Please enter valid 11 digits phone number";
        return false;
    }

    if (network== "" ) {
        errors.innerText = "Please Select a network";
        return false;
    }

    let url = "https://sandbox.wallets.africa/bills/airtime/purchase";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const data = {
        "Code": network,
        "Amount": amount,
        "PhoneNumber": phone,
        "SecretKey": "hfucj5jatq8h"
      }

    makeCall(proxyurl + url, data)
    .then(response => {
        displayData(response); // JSON data parsed by `response.json()` call
      });
}

function displayData(response) {
    let errors = document.getElementById("errors");
    let success = document.getElementById("success");

    if (response.ResponseCode = "400") {
        errors.innerText = response.Message;
    }else{
        success.innerText = response.Message;
    }
}

async function makeCall(url, data) {

    const response = await fetch(url, {
        method: 'POST', 
        cache: 'no-cache', 
        credentials: 'same-origin', // Bearer uvjqzm5xl6bw
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer uvjqzm5xl6bw"
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })

    return response.json();
}