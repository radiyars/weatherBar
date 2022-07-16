

// const link = 'http://api.weatherstack.com/current?access_key=';
// const accessKey = '090de3a3864352b810cc2f2b8f12b161';
const apiKey = 'bac193800a0d15cae3dae7acaa16c3d8';

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}



let store = {
	lat: '56.139918',
	lon: '47.247728',
	cityName: 'Чебы',
	description: '',
	temperature: 0,
	feelsLike: '',
	windSpeed: '',
	calcultaionTime: '',
	timeZone: '',
}


const fetchData = async () => {
	const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${store.lat}&lon=${store.lon}&lang=ru&units=metric&appid=${apiKey}`);
	const data = await result.json();
	const {
		weather: [{ description }],
		main: { temp: temperature, feels_like: feelsLike, },
		wind: { speed: windSpeed, },
		dt: calcultaionTime,
		timezone: timeZone,
		name: cityName,
	} = data;
	// console.log(data);
	// console.log(description);
	store = {
		cityName,
		description,
		temperature: (temperature > 0 ? '+' : '-') + Math.round(temperature) + '°',
		feelsLike,
		windSpeed,
		calcultaionTime: getHoursAndMinutesFromUnixTimeStamp(calcultaionTime),
		feelsLike: (temperature > 0 ? '+' : '-') + Math.round(feelsLike) + '°',
	}

	console.log(store);
	readComponent();
}

const readComponent = () => {
	weatherСity.innerHTML = store.cityName;
	weatherDescription.innerHTML = store.description;
	weatherTemperature.innerHTML = store.temperature;
	weatherFeelsLike.innerHTML = store.feelsLike;
}
fetchData();

const weatherСity = document.querySelector('.weather__city');
const weatherDescription = document.querySelector('.weather__description');
const weatherTemperature = document.querySelector('.weather__temperature');
const weatherFeelsLike = document.querySelector('.weather__feels-like');

// .temperature__city {
// }
// .temperature__date-time {
// }
// .temperature__body {
// }
// .temperature__img {
// }
// .temperature__current-tempearure {
// }
// .temperature__propetis {
// }

function getHoursAndMinutesFromUnixTimeStamp(unixTimeStamp) {
	const date = new Date(unixTimeStamp * 1000);
	const hours = '0' + date.getHours();
	const minutes = '0' + date.getMinutes();
	return hours.slice(-2) + ':' + minutes.slice(-2)

}


// const convertTime12to24 = (time12h, utcOffset) => {
// 	let [time, modifier] = time12h.split(' ');

// 	let [hours, minutes] = time.split(':');

// 	hours = +hours + +utcOffset;

// 	if ((hours) > 12) {
// 		hours = +hours - +12;
// 		switch (modifier) {
// 			case 'AM': modifier = 'PM'
// 				break
// 			case 'PM': modifier = 'AM'
// 		}
// 	}

// 	if (modifier === 'PM') {
// 		hours = +hours + +12;
// 	}

// 	if (hours === 24) {
// 		hours = '00';
// 	} else if (hours < 10) {
// 		hours = '0' + hours;
// 	}

// 	return `${hours}:${minutes}`;
// }

