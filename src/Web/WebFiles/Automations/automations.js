//IRRIGATION
const irrigationEnabled = document.getElementById("irrigationEnabled");
const irrigationStart = document.getElementById("irrigationStart");
const irrigationStop = document.getElementById("irrigationStop");
const irrigationMaxRuntime = document.getElementById("irrigationMaxRuntime");
const irrigationStatus = document.getElementById("irrigationStatus");


function updateIrrigationLimits() {
    const startValue = Number(irrigationStart.value);
    const stopValue = Number(irrigationStop.value);

    irrigationStart.min = stopValue + 1;
    irrigationStop.max = startValue - 1;
}


function updateIrrigationStatus() {

    if (!irrigationEnabled.checked) {
        irrigationStatus.textContent = "Inactive";
        return;
    }

    irrigationStatus.textContent = "Active";
}


irrigationEnabled.addEventListener("change", function () {
    updateIrrigationStatus();
});


irrigationStart.addEventListener("input", function () {
    updateIrrigationLimits();
    updateIrrigationStatus();
});

irrigationStop.addEventListener("input", function () {
    updateIrrigationLimits();
    updateIrrigationStatus();
});


irrigationMaxRuntime.addEventListener("input", function () {
    updateIrrigationStatus();
});

updateIrrigationLimits();

updateIrrigationStatus();

// TEMPERATURE
const temperatureEnabled = document.getElementById("temperatureEnabled");

// heatingStart = Temperature maximum
const temperatureMax = document.getElementById("heatingStart");

// heatingStop = Temperature minimum
const temperatureMin = document.getElementById("heatingStop");

const temperatureStatus = document.getElementById("temperatureStatus");


function updateTemperatureLimits(changedInput = null) {
    let maxValue = Number(temperatureMax.value);
    let minValue = Number(temperatureMin.value);

    // Limite generale: 0–50°C
    maxValue = Math.max(0, Math.min(50, maxValue));
    minValue = Math.max(0, Math.min(50, minValue));

    // Păstrăm diferența de minimum 1°C
    if (changedInput === temperatureMax && maxValue <= minValue) {
        if (maxValue === 0) {
            maxValue = 1;
            minValue = 0;
        } else {
            minValue = maxValue - 1;
        }
    } else if (changedInput === temperatureMin && minValue >= maxValue) {
        if (minValue === 50) {
            minValue = 49;
            maxValue = 50;
        } else {
            maxValue = minValue + 1;
        }
    } else if (maxValue <= minValue) {
        if (maxValue === 0) {
            maxValue = 1;
            minValue = 0;
        } else {
            minValue = maxValue - 1;
        }
    }

    temperatureMax.value = maxValue;
    temperatureMin.value = minValue;

    temperatureMax.min = minValue + 1;
    temperatureMax.max = 50;

    temperatureMin.min = 0;
    temperatureMin.max = maxValue - 1;
}


function updateTemperatureStatus() {
    if (!temperatureEnabled.checked) {
        temperatureStatus.textContent = "Inactive";
        return;
    }

    temperatureStatus.textContent = "Active";
}


// EVENT LISTENERS
temperatureEnabled.addEventListener("change", function () {
    updateTemperatureStatus();
});

temperatureMax.addEventListener("input", function () {
    updateTemperatureLimits(temperatureMax);
});

temperatureMin.addEventListener("input", function () {
    updateTemperatureLimits(temperatureMin);
});

updateTemperatureLimits();
updateTemperatureStatus();

//SOLAR/BATTERY
const batteryEnabled = document.getElementById("batteryEnabled");
const batteryThreshold = document.getElementById("batteryThreshold");
const batteryStatus = document.getElementById("batteryStatus");


function updateBatteryStatus() {

    if (!batteryEnabled.checked) {
        batteryStatus.textContent = "Inactive";
        return;
    }

    batteryStatus.textContent = "Active";
}


batteryEnabled.addEventListener("change", function () {
    updateBatteryStatus();
});


batteryThreshold.addEventListener("input", function () {
    updateBatteryStatus();
});


updateBatteryStatus();

//LIGHTING
const lightingEnabled = document.getElementById("lightingEnabled");
const lightingThreshold = document.getElementById("lightingThreshold");
const lightingStatus = document.getElementById("lightingStatus");


function updateLightingStatus() {

    if (!lightingEnabled.checked) {
        lightingStatus.textContent = "Inactive";
        return;
    }

    lightingStatus.textContent = "Active";
}


lightingEnabled.addEventListener("change", function () {
    updateLightingStatus();
});


lightingThreshold.addEventListener("input", function () {
    updateLightingStatus();
});


updateLightingStatus();

// WATER MANAGEMENT
const waterManagementEnabled = document.getElementById("waterManagementEnabled");
const waterStart = document.getElementById("waterStart");
const waterStop = document.getElementById("waterStop");
const waterManagementStatus = document.getElementById("waterManagementStatus");


function updateWaterManagementStatus() {

    if (!waterManagementEnabled.checked) {
        waterManagementStatus.textContent = "Inactive";
        return;
    }

    waterManagementStatus.textContent = "Active";
}

function updateWaterManagementLimits() {
    const startValue = Number(waterStart.value);
    const stopValue = Number(waterStop.value);

    waterStart.max = stopValue - 1;
    waterStop.min = startValue + 1;
}

waterStart.addEventListener("input", function () {
    updateWaterManagementLimits();
});

waterStop.addEventListener("input", function () {
    updateWaterManagementLimits();
});

waterManagementEnabled.addEventListener("change", function () {
    updateWaterManagementStatus();
});


updateWaterManagementLimits();
updateWaterManagementStatus();

// SECURITY
const securityEnabled = document.getElementById("securityEnabled");
const securityDisarmDuration = document.getElementById("securityDisarmDuration");
const securityStatus = document.getElementById("securityStatus");

function updateSecurityStatus() {
    if (securityEnabled.checked) {
        securityStatus.textContent = "Armed";
    } else {
        securityStatus.textContent = "Inactive";
    }
}

securityEnabled.addEventListener("change", function () {
    updateSecurityStatus();
});

securityDisarmDuration.addEventListener("change", function () {
    let duration = Number(securityDisarmDuration.value);

    if (duration < 1) {
        duration = 1;
    } else if (duration > 60) {
        duration = 60;
    }

    securityDisarmDuration.value = duration;
});

updateSecurityStatus();

// SAVE AUTOMATION SETTINGS
const automationInputs = document.querySelectorAll(
    "#automationsContainer input"
);

function saveAutomationSettings() {
    const settings = {};

    automationInputs.forEach(input => {
        if (!input.id) return;

        settings[input.id] = input.type === "checkbox"
            ? input.checked
            : input.value;
    });

    localStorage.setItem(
        "novaNestAutomations",
        JSON.stringify(settings)
    );
}

// RESTORE AUTOMATION SETTINGS
function loadAutomationSettings() {
    const savedSettings = localStorage.getItem("novaNestAutomations");

    if (!savedSettings) return;

    const settings = JSON.parse(savedSettings);

    automationInputs.forEach(input => {
        if (!input.id || settings[input.id] === undefined) return;

        if (input.type === "checkbox") {
            input.checked = settings[input.id];
            input.dispatchEvent(new Event("change"));
        } else {
            input.value = settings[input.id];
            input.dispatchEvent(new Event("input"));
            input.dispatchEvent(new Event("change"));
        }
    });
}

automationInputs.forEach(input => {
    input.addEventListener("change", saveAutomationSettings);
    input.addEventListener("input", saveAutomationSettings);
});

loadAutomationSettings();