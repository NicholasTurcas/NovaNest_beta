const sensorData = {
    temperature: 28.5,
    humidity: 60,
    power: 125,
    solar: 85,
    battery: 78,
    systemOnline: true
};


/* =========================
   ELEMENTS
   ========================= */

const temperatureElement =
    document.getElementById("temperature");

const humidityElement =
    document.getElementById("humidity");

const powerElement =
    document.getElementById("powerConsumption");

const solarElement =
    document.getElementById("solarProduction");

const batteryElement =
    document.getElementById("batteryLevel");

const currentDateElement =
    document.getElementById("currentDate");

const currentTimeElement =
    document.getElementById("currentTime");

const headerSystemStatusElement =
    document.getElementById("headerSystemStatus");


/* =========================
   DATE & TIME
   ========================= */

function updateDateTime() {

    const now = new Date();


    const date = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });


    const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
    });


    currentDateElement.textContent = date;

    currentTimeElement.textContent = time;
}


/* =========================
   DASHBOARD
   ========================= */

function updateDashboard() {

    temperatureElement.textContent =
        sensorData.temperature.toFixed(1);


    humidityElement.textContent =
        sensorData.humidity + " %";


    powerElement.textContent =
        sensorData.power + " W";


    solarElement.textContent =
        sensorData.solar + " W";


    batteryElement.textContent =
        sensorData.battery + " %";


    headerSystemStatusElement.textContent =
        sensorData.systemOnline
            ? "Online"
            : "Offline";


    updateDateTime();
}


/* =========================
   START
   ========================= */

updateDashboard();


setInterval(updateDashboard, 10000);