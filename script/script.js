

const apiKey = 'bac193800a0d15cae3dae7acaa16c3d8';


let store = {
	// lat: '56.139918',
	// lon: '37.621478',
	lat: '55.751387',
	lon: '37.618621',
	cityName: 'Чебы',
	description: '',
	temperature: 0,
	temperatureMin: 0,
	temperatureMax: 0,
	feelsLike: '',
	windSpeed: '',
	calcultaionTime: '',
	timeZone: '',
	pressure: '',
	icon: ''
}


const fetchData = async () => {
	const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${store.lat}&lon=${store.lon}&lang=ru&units=metric&appid=${apiKey}`);
	const data = await result.json();

	const {
		weather: [{ description, icon }],
		main: { temp: temperature, feels_like: feelsLike, pressure, temp_min: temperatureMin, temp_max: temperatureMax },
		wind: { speed: windSpeed, },
		dt: calcultaionTime,
		timezone: timeZone,
		name: cityName,
	} = data;
	console.log(data);
	store = {
		cityName,
		description,
		temperature: (temperature > 0 ? '+' : '-') + Math.round(temperature) + '°',
		feelsLike,
		windSpeed,
		calcultaionTime: getHoursAndMinutesFromUnixTimeStamp(calcultaionTime),
		feelsLike: (feelsLike > 0 ? '+' : '-') + Math.round(feelsLike) + '°',
		pressure: getMmfromhPa(pressure),
		temperatureMin: (temperatureMin > 0 ? '+' : '-') + Math.round(temperatureMin) + '°',
		temperatureMax: (temperatureMax > 0 ? '+' : '-') + Math.round(temperatureMax) + '°',
		icon: getFontByWeatherIcon(icon),
	}

	readComponent();
}

const readComponent = () => {
	weatherСity.innerHTML = store.cityName;
	weatherTemperature.innerHTML = store.temperature;
	weatherStatus.innerHTML = 'На ' + store.calcultaionTime + ' ' + store.description;
	weatherFeelsLike.innerHTML += store.feelsLike;
	weatherWindSpeed.innerHTML += store.windSpeed + ' м/c';
	weatherPressure.innerHTML += store.pressure + ' мм.рт.ст.';
	weatherTemperatureMin.innerHTML = store.temperatureMin;
	weatherTemperatureMax.innerHTML = store.temperatureMax;
	weatherImg.classList.addSeveral(store.icon);
	// weatherImg.classList.add('fa-solid');
	// weatherImg.classList.add('fa-sun');
}

fetchData();

const weatherСity = document.querySelector('.weather__city');
const weatherTemperature = document.querySelector('.weather__temperature');
const weatherFeelsLike = document.querySelector('.weather__feels-like');
const weatherStatus = document.querySelector('.weather__status');
const weatherWindSpeed = document.querySelector('.weather__wind-speed');
const weatherPressure = document.querySelector('.weather__pressure');
const weatherTemperatureMin = document.querySelector('.weather__temperature-min');
const weatherTemperatureMax = document.querySelector('.weather__temperature-max');
const weatherImg = document.querySelector('.weather__img');





function getHoursAndMinutesFromUnixTimeStamp(unixTimeStamp) {
	const date = new Date(unixTimeStamp * 1000);
	const hours = '0' + date.getHours();
	const minutes = '0' + date.getMinutes();
	return hours.slice(-2) + ':' + minutes.slice(-2)
}

function getMmfromhPa(pressure) {
	return Math.round(pressure * 7.50062 / 10)
}

function getFontByWeatherIcon(icon) {
	switch (icon) {
		case '01d': return 'fa-solid fa-sun';
		case '01n': return 'fa-solid fa-moon';
		case '02d': return 'fa-solid fa-cloud-sun';
		case '03d': return 'fa-solid fa-cloud';
		case '04d': return 'fa-solid fa-clouds';
		case '09d': return 'fa-solid fa-cloud-showers-heavy';
		case '10d': return 'fa-solid fa-cloud-showers';
		case '11d': return 'fa-solid fa-cloud-bolt';
		case '13d': return 'fa-solid fa-snowflake';
		case '50d': return 'fa-solid fa-cloud-fog';
		default:
			return 'fa-solid fa-gears';
	}
}

DOMTokenList.prototype.addSeveral = function (classes) {
	let array = classes.split(' ');
	for (let clas of array) {
		this.add(clas);
	}
}