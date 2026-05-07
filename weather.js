
const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityname");
const card = document.querySelector(".card")
const apikey = "3bfc7d8cc6edee8f7d3eba0cb2d54036"


weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    console.log("sumbmitted")

    const city = cityinput.value;

    if (city) {
        try {

            const weatherdata = await getweatherdata(city)
            displayweather(weatherdata)


        }
        catch (error) {
            console.error(error)
            displayerror(error)
        }

    } else {
        displayerror("could not fetch data")
    }

})

async function getweatherdata(city) {

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    const response = await fetch(apiurl);

    console.log(response)

    if (!response.ok) {
        throw new Error("could not fetch data")
    } else {
        return await response.json()
    }
}

function displayweather(data) {

    console.log(data)
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data

    card.textContent = ""

    const citydisplay = document.createElement("h1")
    const citytemp = document.createElement("p")
    const cityhumidity = document.createElement("p")
    const citydesc = document.createElement("p")
    const weatheremoji = document.createElement("p")

    citydisplay.textContent = city
    citytemp.textContent = `${(temp - 273.15).toFixed(1)}°C`
    cityhumidity.textContent = `Humidity: ${humidity}%`
    citydesc.textContent = description
    weatheremoji.textContent = getweatheremoji(id)

    citydisplay.classList.add("citydisplay")
    citytemp.classList.add("tempdisplay")
    cityhumidity.classList.add("humiditydisplay")
    citydesc.classList.add("descweather")
    weatheremoji.classList.add("weatheremoji")


    card.appendChild(citydisplay)
    card.appendChild(citytemp)
    card.appendChild(cityhumidity)
    card.appendChild(citydesc)
    card.appendChild(weatheremoji)


    card.style.display = "flex"

}

function getweatheremoji(id) {

    switch (true) {
        case (id >= 200 && id < 300):
            return "⚡";
        case id >= 300 && id < 400:
            return "🌦️";
        case id >= 500 && id < 600:
            return "🌧️";
        case id >= 600 && id < 700:
            return "❄️";
        case id >= 700 && id < 800:
            return "🌀";
        case id == 800:
            return "☀️";
        case id > 800:
            return "☁️";
        default:
            return "❓"

    }

}

function displayerror(message) {

    const displayerror = document.createElement("p");
    displayerror.textContent = message
    displayerror.classList.add("error")

    card.textContent = ""
    card.style.display = "flex"

    card.appendChild(displayerror)
}
