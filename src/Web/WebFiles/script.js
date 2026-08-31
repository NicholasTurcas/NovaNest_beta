
const sensorData = {
    temperature: 28.5,
    humidity: 60,
    power: 125,
    solar: 85,
    battery: 78,
    systemOnline: true
};

function getCurrentTime() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const minutesFormatted = minutes.toString().padStart(2, "0");
    const hoursFormatted = hours.toString().padStart(2, "0");

    return { hoursFormatted, minutesFormatted };
}

const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const powerElement = document.getElementById("powerConsumption");
const solarElement = document.getElementById("solarProduction");
const batteryElement = document.getElementById("batteryLevel");
const systemElement = document.getElementById("systemOnline");
const timestampElements = document.querySelectorAll(".timestamp");

const temperatureCard = document.querySelector(".data-card");

temperatureCard.addEventListener("click", () => {
    window.location.href = "temperature.html";
});

function updateDashboard() {
    temperatureElement.textContent = sensorData.temperature.toFixed(1) + " °C";
    humidityElement.textContent = sensorData.humidity + " %";
    powerElement.textContent = sensorData.power + " W";
    solarElement.textContent = sensorData.solar + " W";
    batteryElement.textContent = sensorData.battery + " %";
    systemElement.textContent = sensorData.systemOnline ? "Online" : "Offline";
    
    const currentTime = getCurrentTime();

    timestampElements.forEach(element => {
    element.textContent = currentTime.hoursFormatted + ":" + currentTime.minutesFormatted;
    });
}

updateDashboard();  

setInterval(updateDashboard, 10000);