const sensorData = {
    temperature: null,
    humidity: 60,
    power: 125,
    solar: 85,
    battery: 78,
    waterLevel: 65,
    lightsStatus: "Off",
    irrigationStatus: "Off",
    securityStatus: "Armed",
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

const waterLevelElement =
    document.getElementById("waterLevel");

const lightsStatusElement =
    document.getElementById("lightsStatus");

const irrigationStatusElement =
    document.getElementById("irrigationStatus");

const securityStatusElement =
    document.getElementById("securityStatus");

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

function updateTemperature() {

    if (sensorData.temperature === null) {
        temperatureElement.textContent = "No data";
        return;
    }

    temperatureElement.textContent =
        sensorData.temperature.toFixed(1);
}


/* =========================
   DASHBOARD
   ========================= */

function updateDashboard() {

    updateTemperature();


    humidityElement.textContent =
        sensorData.humidity;


    powerElement.textContent =
        sensorData.power;


    solarElement.textContent =
        sensorData.solar;


    batteryElement.textContent =
        sensorData.battery;
    
    waterLevelElement.textContent =
    sensorData.waterLevel;

    lightsStatusElement.textContent =
        sensorData.lightsStatus;

    irrigationStatusElement.textContent =
        sensorData.irrigationStatus;

    securityStatusElement.textContent =
        sensorData.securityStatus;


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