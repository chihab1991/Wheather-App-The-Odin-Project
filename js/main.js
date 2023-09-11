const API_Key = "ad94c5e499cf4b59a58141931222001";
const weatherForm = document.querySelector(".weather-form");
let fetching = false;
const fetchingHtml = `<div class="spinner"><i class="fa-solid fa-spinner fa-spin"></i></div>`;

const main = document.querySelector(".main");
const getWeather = async (city) => {
	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${city}`
		);
		const data = await response.json();
		if (data.error)
			return `<div class="error">
		<h3>${data.error.message}</h3>
	</div>`;
		return `<div class="weather">
		<h2>City Name: ${data.location.name}, Country: ${data.location.country}</h2>
		<h4>Temp: ${data.current.temp_c}°C</h4>
		<h4>Weather : ${data.current.condition.text}</h4>
		<img src="${data.current.condition.icon}" alt="${data.current.condition.text} icon">
		<h4>Last Updated: ${data.current.last_updated}</h4>
	</div>`;
	} catch (error) {
		return `<div class="error">
		<h3>Ooops something went wrong!!!</h3>
	</div>`;
	}
};

window.onload = async () => {
	main.innerHTML = fetchingHtml;

	main.innerHTML = await getWeather("paris");
};
weatherForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	main.innerHTML = fetchingHtml;
	const location = document.getElementById("location");

	main.innerHTML = await getWeather(location.value);
	location.value = "";
});
