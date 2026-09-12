const sensorData = {
    temperature: 28.5,
    temperatureError: false,

    humidity: 60,
    humidityError: false,

    power: 125,
    powerError: false,

    solar: 80,
    solarError: false,

    battery: 90,
    batteryError: true,

    waterLevel: 75,
    waterLevelError: false,

    lightsStatus: "Off",
    lightsError: false,

    irrigationStatus: "Off",
    irrigationError: false,

    securityStatus: "Armed",
    securityError: false,

    systemOnline: true,
};

/* =========================
   ELEMENTS
   ========================= 
*/

/* =========================
   TEMPERATURE
   ========================= 
*/

const temperatureElement =
    document.getElementById("temperature");

const temperatureCard = 
    document.getElementById("temperatureCard");

temperatureCard.addEventListener("click", function() {
    alert("Temperature card clicked");
});


/* =========================
   HUMIDITY
   ========================= 
*/

const humidityElement =
    document.getElementById("humidity");

const humidityCard = 
    document.getElementById("humidityCard");

humidityCard.addEventListener("click", function() {
    alert("Humidity card clicked");
});


/* =========================
   POWER CONSUMPTION
   ========================= 
*/

const powerElement =
    document.getElementById("powerConsumption");

const powerCard = 
    document.getElementById("powerCard");

powerCard.addEventListener("click", function() {
    alert("Power Consumption card clicked");
});


/* =========================
   SOLAR PRODUCTION
   ========================= 
*/

const solarElement =
    document.getElementById("solarProduction");

const solarCard =
    document.getElementById("solarCard");

solarCard.addEventListener("click", function() {
    alert("Solar Production card clicked");
});


/* =========================
   BATTERY
   ========================= 
*/

const batteryElement =
    document.getElementById("batteryLevel");

const batteryCard =
    document.getElementById("batteryCard");

batteryCard.addEventListener("click", function() {
    alert("Battery card clicked");
});


/* =========================
   WATER LEVEL
   ========================= 
*/

const waterLevelElement =
    document.getElementById("waterLevel");

const waterCard =
    document.getElementById("waterCard");   

waterCard.addEventListener("click", function() {
    alert("Water Level card clicked");
});


/* =========================
   LIGHTS
   ========================= 
*/

const lightsStatusElement =
    document.getElementById("lightsStatus");

const lightsCard =
    document.getElementById("lightsCard");

lightsCard.addEventListener("click", function() {
    alert("Lights card clicked");
});


/* =========================
   IRIGATION
   ========================= 
*/

const irrigationStatusElement =
    document.getElementById("irrigationStatus");

const irrigationCard =
    document.getElementById("irrigationCard");

irrigationCard.addEventListener("click", function() {
    alert("Irrigation card clicked");
});

/* =========================
   SECURITY
   ========================= 
*/

const securityStatusElement =
    document.getElementById("securityStatus");

const securityCard =
    document.getElementById("securityCard");

securityCard.addEventListener("click", function() {
    alert("Security card clicked");
});


/* =========================
   CURRENT DATE & TIME
   ========================= 
*/

const currentDateElement =
    document.getElementById("currentDate");

const currentTimeElement =
    document.getElementById("currentTime");

const headerSystemStatusElement =
    document.getElementById("headerSystemStatus");


/* =========================
   DATE & TIME
   ========================= 
*/

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
   TEMPERATURE
   ========================= 
*/

function updateTemperature() {

    if (!sensorData.systemOnline) {
        temperatureElement.textContent = "Offline";
        temperatureCard.classList.add("offline");
        temperatureCard.classList.remove("error");
        return;
    }

    temperatureCard.classList.remove("offline");

    if (sensorData.temperatureError) {
        temperatureElement.textContent = "Error";
        temperatureCard.classList.add("error");
        return;
    }

temperatureCard.classList.remove("error");
    if (sensorData.temperature === null) {
        temperatureElement.textContent = "No data";
        return;
    }

    temperatureElement.textContent =
        sensorData.temperature.toFixed(1) + " °C";
}


/* =========================
   HUMIDITY
   ========================= 
*/

function updateHumidity() {

    if (!sensorData.systemOnline) {
        humidityElement.textContent = "Offline";
        humidityCard.classList.add("offline");
        humidityCard.classList.remove("error");
        return;
    }

    humidityCard.classList.remove("offline");

    if (sensorData.humidityError) {
        humidityElement.textContent = "Error";
        humidityCard.classList.add("error");
        return;
    }

    humidityCard.classList.remove("error");

    if (sensorData.humidity === null) {
        humidityElement.textContent = "No data";
        return;
    }

    humidityElement.textContent =
        sensorData.humidity + " %";
}


/* =========================
   POWER CONSUMPTION
   ========================= 
*/

function updatePower() {

    if (!sensorData.systemOnline) {
        powerElement.textContent = "Offline";
        powerCard.classList.add("offline");
        powerCard.classList.remove("error");
        return;
    }

    powerCard.classList.remove("offline");

    if (sensorData.powerError) {
        powerElement.textContent = "Error";
        powerCard.classList.add("error");
        return;
    }

    powerCard.classList.remove("error");

    if (sensorData.power === null) {
        powerElement.textContent = "No data";
        return;
    }

    powerElement.textContent =
        sensorData.power + " W";
}


/* =========================
   SOLAR PRODUCTION
   ========================= 
*/

function updateSolar() {

    if (!sensorData.systemOnline) {
        solarElement.textContent = "Offline";
        solarCard.classList.add("offline");
        solarCard.classList.remove("error");
        return;
    }

    solarCard.classList.remove("offline");

    if (sensorData.solarError) {
        solarElement.textContent = "Error";
        solarCard.classList.add("error");
        return;
    }

    solarCard.classList.remove("error");

    if (sensorData.solar === null) {
        solarElement.textContent = "No data";
        return;
    }

    solarElement.textContent =
        sensorData.solar + " W";
}


/* =========================
   BATTERY
   ========================= 
*/

function updateBattery() {

    if (!sensorData.systemOnline) {
        batteryElement.textContent = "Offline";
        batteryCard.classList.add("offline");
        batteryCard.classList.remove("error");
        return;
    }

    batteryCard.classList.remove("offline");

    if (sensorData.batteryError) {
        batteryElement.textContent = "Error";
        batteryCard.classList.add("error");
        return;
    }

    batteryCard.classList.remove("error");

    if (sensorData.battery === null) {
        batteryElement.textContent = "No data";
        return;
    }

    batteryElement.textContent =
        sensorData.battery + " %";
}


/* =========================
   WATER LEVEL
   ========================= 
*/

function updateWaterLevel() {

    if (!sensorData.systemOnline) {
        waterLevelElement.textContent = "Offline";
        waterCard.classList.add("offline");
        waterCard.classList.remove("error");
        return;
    }

    waterCard.classList.remove("offline");

    if (sensorData.waterLevelError) {
        waterLevelElement.textContent = "Error";
        waterCard.classList.add("error");
        return;
    }

    waterCard.classList.remove("error");

    if (sensorData.waterLevel === null) {
        waterLevelElement.textContent = "No data";
        return;
    }

    waterLevelElement.textContent =
        sensorData.waterLevel + " %";
}


/* =========================
   LIGHTS
   ========================= 
*/

function updateLights() {

    if (!sensorData.systemOnline) {
        lightsStatusElement.textContent = "Offline";
        lightsCard.classList.add("offline");
        lightsCard.classList.remove("error");
        return;
    }

    lightsCard.classList.remove("offline");

    if (sensorData.lightsError) {
        lightsStatusElement.textContent = "Error";
        lightsCard.classList.add("error");
        return;
    }

    lightsCard.classList.remove("error");

    if (sensorData.lightsStatus === null) {
        lightsStatusElement.textContent = "No data";
        return;
    }

    lightsStatusElement.textContent =
        sensorData.lightsStatus;
}


/* =========================
   IRRIGATION
   ========================= 
*/

function updateIrrigation() {

    if (!sensorData.systemOnline) {
        irrigationStatusElement.textContent = "Offline";
        irrigationCard.classList.add("offline");
        irrigationCard.classList.remove("error");
        return;
    }

    irrigationCard.classList.remove("offline");

    if (sensorData.irrigationError) {
        irrigationStatusElement.textContent = "Error";
        irrigationCard.classList.add("error");
        return;
    }

    irrigationCard.classList.remove("error");

    if (sensorData.irrigationStatus === null) {
        irrigationStatusElement.textContent = "No data";
        return;
    }

    irrigationStatusElement.textContent =
        sensorData.irrigationStatus;
}


/* =========================
   SECURITY
   ========================= 
*/

function updateSecurity() {

    if (!sensorData.systemOnline) {
        securityStatusElement.textContent = "Offline";
        securityCard.classList.add("offline");
        securityCard.classList.remove("error");
        return;
    }

    securityCard.classList.remove("offline");

    if (sensorData.securityError) {
        securityStatusElement.textContent = "Error";
        securityCard.classList.add("error");
        return;
    }

    securityCard.classList.remove("error");

    if (sensorData.securityStatus === null) {
        securityStatusElement.textContent = "No data";
        return;
    }

    securityStatusElement.textContent =
        sensorData.securityStatus;
}

/* =========================
   DASHBOARD
   ========================= 
*/

function updateDashboard() {

    updateTemperature();

    updateHumidity();

    updatePower();

    updateSolar();

    updateBattery();

    updateWaterLevel();

    updateLights();

    updateIrrigation();

    updateSecurity();


    headerSystemStatusElement.textContent =
        sensorData.systemOnline
            ? "Online"
            : "Offline";


    updateDateTime();
}


/* =========================
   START
   ========================= 
*/

updateDashboard();

setInterval(updateDashboard, 10000);