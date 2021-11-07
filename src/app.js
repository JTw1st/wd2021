const API_KEY = '933492b29ee5a60be1e5534d8e5327f1';

const getWeatherFromAPI = ({latitude, longitude}) =>
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())

const getWeatherFromTestAPI = () =>
    fetch(`https://my-json-server.typicode.com/meelistenso/test/weather`)
        .then(response => response.json())

import mock from './mock.json';
const getWeatherFromLocalFile = () => mock;

const getCurrentPosition = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => {
        const crd = pos.coords;
        resolve({
            latitude: crd.latitude,
            longitude: crd.longitude,
        });
    }, (err) => {
        reject(err)
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
})

const loadData = async (source) => {
    const position = await getCurrentPosition();
    let weather;
    switch (source) {
        case 'api':
            weather = await getWeatherFromAPI(position);
            break
        case 'testApi':
            weather = await getWeatherFromTestAPI(position);
            break
        case 'file':
            weather = await getWeatherFromLocalFile(position);
            break;
    }
    console.log(weather)
    return weather;
}

const KtoC = (Ktemp) => {
    const Ctemp = Ktemp - 273.15;
    return Math.round(Ctemp);
}

const render = async (source = 'api') => {
    const data = await loadData(source);

    const windContainer = document.getElementById('wind');
    const windDirectionContainer = document.getElementById('wind-direction');
    // const rain = document.getElementById('rain');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const clouds = document.getElementById('clouds');
    const location = document.getElementById('location');
    const feelsLike = document.getElementById('feels-like');
    const temp = document.getElementById('temp');
    const pressure = document.getElementById('pressure');
    const humidity = document.getElementById('humidity');
    const tempRange = document.getElementById('temp-range');

    windContainer.innerText = data?.wind?.speed;
    windDirectionContainer.style.transform = `rotate(${data?.wind?.deg}deg)`;
    // rain.innerText = data?.rain["1h"];
    sunrise.innerText = new Date(data?.sys?.sunrise * 1000).toLocaleTimeString();
    sunset.innerText = new Date(data?.sys?.sunset * 1000).toLocaleTimeString();
    clouds.innerText = data?.clouds?.all;
    location.innerText = data?.name;
    feelsLike.innerText = KtoC(data?.main?.feels_like);
    temp.innerText = KtoC(data?.main?.temp);
    pressure.innerText = data?.main?.pressure;
    humidity.innerText = data?.main?.humidity;
    tempRange.innerText = `${KtoC(data?.main?.temp_min)} - ${KtoC(data?.main?.temp_max)}`;
}

const sourceSelect = document.getElementById('source-select');
console.log(sourceSelect)
sourceSelect.addEventListener('change', e => {
    const value = e.target.value;
    render(value);
})

render()
