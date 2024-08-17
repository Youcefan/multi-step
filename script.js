let nextstep = document.getElementById("next-step");
let goback = document.getElementById("go-back");
let page1 = document.getElementById("personal-info");
let page2 = document.getElementById("select-plan");
let page3 = document.getElementById("add-ons");
let page4 = document.getElementById("finish");
let page5 = document.getElementById("thank");
let content = document.querySelectorAll(".content");
let number = document.querySelectorAll(".step-number");

let name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");

let checkbox = document.getElementById("checkbox");
let yearly = document.getElementById("Yearly");
let monthly = document.getElementById("month");
let infoBox = document.querySelectorAll(".info-box");
let box = document.querySelectorAll(".box");
let boxx = [0,0,0];
let mode = "Monthly";
let price = 0;

let plan = document.getElementById("plan");
let pricePlan = document.getElementById("prix-plan");
let serSpan = document.querySelectorAll(".service span");
let checkSer = document.querySelectorAll(".service input");
let service = document.querySelectorAll(".service");
let serCheck = [0,0,0];
let hsab = document.querySelector(".hsab");

let total = document.querySelector(".total");
let prixTotal = document.getElementById("prix-total");
let Total = document.getElementById("total");

let pages = [page1, page2, page3, page4 , page5];
let turn = 0;
let next = 0;
let mood = "Arcade";


    
    nextstep.onclick = function () {
        verifieValue();
        
        if (next === 1) {
            if (turn < 3) {
                if (turn === 1 && verfierservice() === 0) {
                    for (let i = 0; i < 3; i++) {
                        box[i].style.border = "1px solid red";
                    }
                    return;
                } else {
                    for (let i = 0; i < 3; i++) {
                        box[i].style.border = "1px solid #a1a1a1";
                    }
                    comptable();
                }
        
                if (turn === 2) {
                    SerCheck();
                    priceHelp();
                    nextstep.innerHTML = "Confirm";
                    nextstep.style.background = "rgb(41, 0, 223)";
                } else {
                    nextstep.innerHTML = "Next Step";
                    nextstep.style.background = "rgb(6, 6, 77)";
                }
        
                turn += 1;
                pages[turn - 1].style.display = "none";
                pages[turn].style.display = "flex";
                goback.style.visibility = "visible";
                number[turn - 1].id = "";
                number[turn].id = "active";
            } else if (turn === 3) {
                nextstep.style.display = "none";
                goback.style.display = "none";
                pages[3].style.display = "none";
                pages[4].style.display = "flex";
            }
        }
    } 


goback.onclick = function() {
    if (turn > 0) {
        pages[turn-1].style.display = "flex";
        pages[turn].style.display ="none";
        number[turn].id="";
        number[turn-1].id="active";
        turn -= 1;

         
        if (turn === 2) {
            nextstep.innerHTML = "Next Step";
                    nextstep.style.background = "rgb(6, 6, 77)";
            SerCheck();
            priceHelp();
        }

    }

    if (turn === 0) {
        goback.style.visibility = "hidden";
    }
}

function verifieValue() {
    if (name.value === "") {
        name.style.outline = "auto red";
        next = 0;
        name.previousElementSibling.innerHTML += `<span class="field">This field is required</span>`;
    } else {
        name.previousElementSibling.innerHTML = `Name`;
        name.style.outline = "none";
    }
    if (email.value === "") {
        email.style.outline = "auto red";
        next = 0;
        email.previousElementSibling.innerHTML += `<span class="field">This field is required</span>`;
    } else {
        email.previousElementSibling.innerHTML = `Email Address`;
        email.style.outline = "none";
    }
    if (phone.value === "") {
        phone.style.outline = "auto red";
        next = 0;
        phone.previousElementSibling.innerHTML += `<span class="field">This field is required</span>`;
    } else {
        phone.previousElementSibling.innerHTML = `Phone Number`;
        phone.style.outline = "none";
    }
    if (name.value !== "" && email.value !== "" && phone.value !== "") {
        next = 1;
    }
}

monthly.style.color = "rgb(6, 6, 77)";
checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        yearly.style.color = "rgb(6, 6, 77)";
        monthly.style.color = "#a1a1a1";
        infoBox[2].innerHTML = `<h2>Pro</h2>
                        <p>$150/yr <br> <span class="month">2 months free </span></p>`;
        infoBox[1].innerHTML =`<h2>Advanced</h2>
                        <p>$120/yr <br> <span class="month">2 months free </span> </p>`;
        infoBox[0].innerHTML = `<h2>Arcade</h2>
                        <p>$90/yr <br> <span class="month">2 months free </span> </p>`;
        mode = "Yearly";
        serSpan[0].innerHTML = `+10$/yr`;
        serSpan[1].innerHTML = `+20$/yr`;
        serSpan[2].innerHTML = `+20$/yr`;
        Total.innerHTML = `Total (par year)`;
    } else {
        yearly.style.color = "#a1a1a1";
        monthly.style.color = "rgb(6, 6, 77)";
        infoBox[0].innerHTML = `<h2>Arcade</h2>
                        <p>$9/mo</p>`;
        infoBox[1].innerHTML =`<h2>Advanced</h2>
                        <p>$12/mo</p>`;
        infoBox[2].innerHTML =`<h2>Pro</h2>
                        <p>$15/mo</p>`;
        mode = "Monthly";
        serSpan[0].innerHTML = `+1$/mo`;
        serSpan[1].innerHTML = `+2$/mo`;
        serSpan[2].innerHTML = `+2$/mo`;
        Total.innerHTML = `Total (par month)`;
    }
    priceHelp();
    comptable();
    SerCheck();
});

for (let i = 0; i < 3; i++) {
    box[i].onclick = function() {
        if (boxx[i] === 0) {
            box[i].style.outline = "auto blue";
            box[i].style.background = "rgba(0, 0, 255, 0.082)";
            for (let j = 0; j < 3; j++) {
                if (j !== i) {
                    box[j].style.outline = "none";
                    box[j].style.background = "none";
                    boxx[j] = 0;
                }
            }
            boxx[i] = 1;
        } else if (boxx[i] === 1) {
            box[i].style.outline = "none";
            box[i].style.background = "none";
            boxx[i] = 0;
        }
        comptable();
        SerCheck();
    }
}

function verfierservice(){
    if (boxx[0] === 1 || boxx[1] === 1 || boxx[2] === 1) {
        return 1;
    }
    return 0;
}

function comptable() {
    if (mode === "Monthly") {
        if (boxx[0] === 1) {
            price = 9;
            mood = "Arcade";
        }
        if (boxx[1] === 1) {
            price = 12;
            mood = "Advanced";
        }
        if (boxx[2] === 1) {
            price = 15;
            mood = "Pro";
        }
    }
    if (mode === "Yearly") {
        if (boxx[0] === 1) {
            price = 90;
            mood = "Arcade";
        }
        if (boxx[1] === 1) {
            price = 120;
            mood = "Advanced";
        }
        if (boxx[2] === 1) {
            price = 150;
            mood = "Pro";
        }
    }
}

for (let i = 0; i < 3; i++) {
    checkSer[i].addEventListener("change", function() {
        if (checkSer[i].checked) {
            service[i].style.background = "rgba(0, 0, 255, 0.082)";
            service[i].style.outline = "auto rgb(66, 66, 252)";
            serCheck[i] = 1;
            SerCheck();
            priceHelp();
        } else {
            service[i].style.background = "none";
            service[i].style.outline = "none";
            serCheck[i] = 0;
            SerCheck();
            priceHelp();
        }
    });
}

function SerCheck() {
    hsab.innerHTML = ``;
    comptable();
    hsab.innerHTML += `<div class="hsab1" id="item4">
        <p id="plan">${mood} (${mode}) <br> <span>change</span></p>
        <span id="prix-plan">$${price}/${mode === "Monthly" ? "mo" : "yr"}</span>
    </div> <hr id="item5">`;

    if (serCheck[0] === 1) {
        hsab.innerHTML += `<div class="hsab1" id="item1">
            <p id="service">Online service</p>
            <span id="prix-service">${mode === "Monthly" ? "+1$/mo" : "+10$/yr"}</span>
        </div>`;
    }
    if (serCheck[1] === 1) {
        hsab.innerHTML += `<div class="hsab1" id="item2">
            <p id="service">Larger storage</p>
            <span id="prix-service">${mode === "Monthly" ? "+2$/mo" : "+20$/yr"}</span>
        </div>`;
    }
    if (serCheck[2] === 1) {
        hsab.innerHTML += `<div class="hsab1" id="item3">
            <p id="service">Customizable profile</p>
            <span id="prix-service">${mode === "Monthly" ? "+2$/mo" : "+20$/yr"}</span>
        </div>`;
    }
}

function priceHelp() {
    let additionalPrice = 0;
    if (serCheck[0] === 1) additionalPrice += mode === "Monthly" ? 1 : 10;
    if (serCheck[1] === 1) additionalPrice += mode === "Monthly" ? 2 : 20;
    if (serCheck[2] === 1) additionalPrice += mode === "Monthly" ? 2 : 20;
    
    prixTotal.innerHTML = `+$${price + additionalPrice}/${mode === "Monthly" ? "mo" : "yr"}`;
}

