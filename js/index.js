let userInput = document.querySelector("#input");
let searchBtn = document.querySelector("#search-btn");
let forcastContainer = document.querySelector(".forcast-container");
let numberOfDays = 3;
let data;

function getDateDetails(index) {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(data.forecast.forecastday[index].date);
    let dateDetails = {};
    dateDetails.day = weekDays[date.getDay()];
    dateDetails.date = date.getDate();
    dateDetails.month = months[date.getMonth()];
    return dateDetails;
}

function displayDays() {
    let { icon: firstDayIcon, text: firstDayConditionText } = data.current.condition;

    forcastContainer.innerHTML="";
    for (let i = 0; i < numberOfDays; i++) {
        if (i === 0) {
            // console.log(i);
            forcastContainer.innerHTML += `
                <div class="col-md-4 p-3 ">
                    <div class="first-day result h-100 p-3 rounded-3">
                        <div class="time d-flex justify-content-between p-3">
                            <p class="first-day-day">${getDateDetails(i).day}</p>
                            <p class="first-day-date">${getDateDetails(i).date} ${getDateDetails(i).month}</p>
                        </div>
                        <div class="temp-container d-flex flex-column gap-2 ">
                            <p class="city">${data.location.name}</p>
                            <p class="first-day-temp-c fs-1">${data.current.temp_c}°C</p>
                            <p class="first-day-condition-text">${firstDayConditionText}</p>
                        </div>
                        <div class="icon ">
                            <img src="${firstDayIcon}" class="first-day-img" alt="">
                        </div>
                    </div>
                </div> `;
        }
        else {
            // console.log(i);
            forcastContainer.innerHTML += `
                <div class="col-md-4 p-3 ">
                    <div class="second-day result h-100 p-3 rounded-3">
                        <div class="time d-flex justify-content-between p-3">
                            <p class="second-day-day">${getDateDetails(i).day}</p>
                            <p class="second-day-date">${getDateDetails(i).date} ${getDateDetails(i).month}</p>
                        </div>
                        <div class="temp-container d-flex flex-column gap-2 text-center">
                            <p class="second-day-max-temp-c fs-4 mb-0">${data.forecast.forecastday[i].day.maxtemp_c}°C</p>
                            <p class="second-day-min-temp-c">${data.forecast.forecastday[i].day.mintemp_c}°C</p>
                            <p class="second-day-condition-text">${data.forecast.forecastday[i].day.condition.text}</p>
                        </div>
                        <div class="icon text-center">
                            <img src="${data.forecast.forecastday[i].day.condition.icon}" class="second-day-img" alt="">
                        </div>
                    </div>
                </div>`

        }
    }
    forcastContainer.classList.remove("d-none");
}

function createDays() {
    let city = document.querySelector(".first-day .temp-container .city");
    city.innerHTML = data.location.name

    let { icon: firstDayIcon, text: firstDayConditionText } = data.current.condition;
    document.querySelector(".first-day-day").innerText = getDateDetails(0).day;
    document.querySelector(".first-day-date").innerText = getDateDetails(0).date + " " + getDateDetails(0).month;
    document.querySelector(".first-day-img").setAttribute("src", firstDayIcon);
    document.querySelector(".first-day-temp-c").innerText = data.current.temp_c + "°C";
    document.querySelector(".first-day-condition-text").innerText = firstDayConditionText;

    let { maxtemp_c: secDayMaxTempC, mintemp_c: secDayMinTempC } = data.forecast.forecastday[1].day;
    let { icon: secDayIcon, text: secDayConditionText } = data.forecast.forecastday[1].day.condition;

    document.querySelector(".second-day-day").innerText = getDateDetails(1).day;
    document.querySelector(".second-day-date").innerText = getDateDetails(1).date + " " + getDateDetails(1).month;
    document.querySelector(".second-day-img").setAttribute("src", secDayIcon);
    document.querySelector(".second-day-max-temp-c").innerText = secDayMaxTempC + "°C";
    document.querySelector(".second-day-min-temp-c").innerText = secDayMinTempC + "°C";
    document.querySelector(".second-day-condition-text").textContent = secDayConditionText;

    let { maxtemp_c: thirdDayMaxTempC, mintemp_c: thirdDayMinTempC } = data.forecast.forecastday[2].day;
    let { icon: thirdDayIcon, text: thirdDayConditionText } = data.forecast.forecastday[2].day.condition;

    document.querySelector(".third-day-day").innerText = getDateDetails(2).day;
    document.querySelector(".third-day-date").innerText = getDateDetails(2).date + " " + getDateDetails(2).month;
    document.querySelector(".third-day-img").setAttribute("src", thirdDayIcon);
    document.querySelector(".third-day-max-temp-c").innerText = thirdDayMaxTempC + "°C";
    document.querySelector(".third-day-min-temp-c").innerText = thirdDayMinTempC + "°C";
    document.querySelector(".third-day-condition-text").innerText = thirdDayConditionText;

    forcastContainer.classList.remove("d-none");
}
function getweather() {
    return new Promise((callback) => {
        let weather = new XMLHttpRequest();
        weather.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=683375e78e184d24a39170014233107&q=${userInput.value || "cairo"}&days=${numberOfDays}`);
        weather.send();
        weather.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.status === 200) {
                data = JSON.parse(this.responseText);
                console.log(data);
                callback();
            }
        })
    });
}

function mainFunc(){
    (async function () {
        await getweather();
        // createDays();
        displayDays();
    })();
}

window.addEventListener("load", function () {
    mainFunc();
})

searchBtn.addEventListener("click", function () {
    mainFunc();
});

userInput.addEventListener("keyup",function(){
    mainFunc();
})


