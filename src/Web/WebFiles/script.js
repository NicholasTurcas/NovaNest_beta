console.log("NovaNest JavaScript pornit!");

const temperatureElement = document.getElementById("temperature");
console.log(temperatureElement);
const temperature = 27.5; 
temperatureElement.textContent = temperature + " °C";

const humidityElement = document.getElementById("humidity");
const humidity = 60;

humidityElement.textContent = humidity + " %";

const powerElement = document.getElementById("powerConsumption");
const power = 125;

powerElement.textContent = power + " W";

const solarElement = document.getElementById("solarProduction");
const solar = 85;

solarElement.textContent = solar + " W";

const batteryElement = document.getElementById("batteryLevel");
const battery = 78; 

batteryElement.textContent = battery + " %";

const systemElement = document.getElementById("systemOnline");
const systemOnline = true;
systemElement.textContent = systemOnline ? "Online" : "Offline";    

const timestampElements = document.querySelectorAll(".timestamp");
console.log(timestampElements);

const now = new Date();

const hours = now.getHours();
const minutes = now.getMinutes();

const minutesFormatted = minutes.toString().padStart(2, "0");
const hoursFormatted = hours.toString().padStart(2, "0");

timestampElements.forEach(element => {
    element.textContent = hoursFormatted + ":" + minutesFormatted;
});
