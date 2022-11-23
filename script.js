let list = document.querySelector(".list");
let media = document.querySelector(".media");
let currencyRow = document.querySelector('#container');
let p1= document.querySelector('.area1>p');
let p2= document.querySelector('.area2>p');
let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2')
let one = document.getElementsByName("one");
let two = document.getElementsByName("two");

let first;
let second;
// Changing of color
currencyRow.addEventListener('click', event=>{
    if(event.target.classList.contains('currency1')) func(event);
    else if(event.target.classList.contains('currency2')) func(event);
})
// Functions
function func(event){
    let arr = [...event.target.parentElement.children];
    arr.forEach(item => {
        if (item.classList.contains("active")) {
            item.classList.remove("active");
        };
    });
    event.target.classList.add("active");
}

// Calculation
function calc(){
    one.forEach(item => {
        if (item.classList.contains("active")) {
            first = item.innerText;
        };
    })
    two.forEach(item => {
        if (item.classList.contains("active")) {
            second = item.innerText;
        };
    })
    fetch(`https://api.exchangerate.host/latest?base=${first}&symbols=${second}`)
        .then(response => {
            return response.json()})
        .then((data) => {
            input2.value = Number(input1.value) * data.rates[second];
            p1.innerText = `1 ${first} = ${data.rates[second]} ${second}`;
            p2.innerText = `1 ${second} = ${1 / data.rates[second]} ${first}`;
        }).catch(error => {alert("Check your internet connection");console.log("Check your internet connection")})
}
// Calculation2
function calc2(){
    one.forEach(item => {
        if (item.classList.contains("active")) {
            first = item.innerText;
        }
    })
    two.forEach(item => {
        if (item.classList.contains("active")) {
            second = item.innerText;
        };
    })
    fetch(`https://api.exchangerate.host/latest?base=${second}&symbols=${first}`)
        .then(r => r.json())
        .then((data) => {
            input1.value = Number(input2.value) * data.rates[first];
            p2.innerText = `1 ${second} = ${1 / data.rates[first]} ${first}`;
            p1.innerText = `1 ${first} = ${data.rates[first]} ${second}`;
        }).catch(error => {alert("Check your internet connection");console.log("Check your internet connection")})
}

input1.addEventListener('keypress', calc);
input2.addEventListener('keypress', calc2);

function navBar(){
    list.classList.toggle("show");
}
media.addEventListener("click", navBar);