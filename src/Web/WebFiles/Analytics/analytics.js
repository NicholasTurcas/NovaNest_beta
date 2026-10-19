// =========================
// GET DATA FROM API
// =========================

async function getAnalyticsData(module, period) {
    const response = await fetch(
        `http://10.10.11.179/api/analytics?module=${module}&period=${period}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
    }

    return await response.json();
}

// =========================
// FORMAT TIMESTAMP
// =========================

function formatTimestamp(timestamp, period) {
    const date = new Date(Number(timestamp) * 1000);

    if (period === "24h") {
        return (
            String(date.getHours()).padStart(2, "0") +
            ":" +
            String(date.getMinutes()).padStart(2, "0")
        );
    }

    if (period === "7d") {
        return (
            String(date.getDate()).padStart(2, "0") +
            "/" +
            String(date.getMonth() + 1).padStart(2, "0")
        );
    }

    if (period === "30d") {
        return (
            String(date.getDate()).padStart(2, "0") +
            "/" +
            String(date.getMonth() + 1).padStart(2, "0")
        );
    }

    return timestamp;
}


// =========================
// FORMAT API LABELS
// =========================

function formatLabels(labels, period) {
    return labels.map(function(timestamp) {
        return formatTimestamp(timestamp, period);
    });
}


function getAnalyticsTitle(module) {
    const titleKeys = {
        temperature: "analyticsTemperature",
        humidity: "analyticsHumidity",
        power: "analyticsPower",
        solar: "analyticsSolar",
        battery: "analyticsBattery",
        water: "analyticsWater"
    };

    const key = titleKeys[module];

    return translations[currentLanguage][key] || module;
}


// =========================
// ANALYTICS CHART
// =========================

const chartCanvas =
    document.getElementById("temperatureChart");

const chartTitle =
    document.querySelector(".analytics-chart h3");

const analyticsModules =
    document.querySelectorAll(".analytics-module");

const analyticsPeriods =
    document.querySelectorAll(".analytics-period");

function getAnalyticsChartTheme() {
    const isDark =
        document.documentElement.dataset.theme === "dark";

    return {
        text: isDark ? "#A9BBD0" : "#53636D",
        grid: isDark
            ? "rgba(141, 188, 199, 0.10)"
            : "rgba(83, 99, 109, 0.12)",
        tooltipBackground: isDark ? "#061320" : "#F9FAFB",
        tooltipText: isDark ? "#F9FAFB" : "#17212B",
        tooltipBorder: isDark ? "#0D1C2D" : "#DCEAF0"
    };
}


let analyticsChart = new Chart(chartCanvas, {
    type: "line",

    data: {
        labels: [],

        datasets: [{
            label: "Temperature",
            data: [],

            borderWidth: 2,
            tension: 0.4,
            fill: false
        }]
    },

    
    options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false
        },

        tooltip: {
            backgroundColor: getAnalyticsChartTheme().tooltipBackground,
            titleColor: getAnalyticsChartTheme().tooltipText,
            bodyColor: getAnalyticsChartTheme().tooltipText,
            borderColor: getAnalyticsChartTheme().tooltipBorder,
            borderWidth: 1
        }
    },

    scales: {
        x: {
            ticks: {
                color: getAnalyticsChartTheme().text
            },
            grid: {
                display: false
            },
            border: {
                color: getAnalyticsChartTheme().grid
            }
        },

        y: {
            title: {
                display: true,
                text: "°C",
                color: getAnalyticsChartTheme().text
            },
            ticks: {
                color: getAnalyticsChartTheme().text
            },
            grid: {
                color: getAnalyticsChartTheme().grid
            },
            border: {
                color: getAnalyticsChartTheme().grid
            }
        }
    }
}

});


// =========================
// UPDATE CHART
// =========================

async function updateAnalyticsChart(module, period) {

    try {

        const data =
            await getAnalyticsData(
                module,
                period
            );

        const formattedLabels =
            formatLabels(
                data.labels,
                period
            );
        
            analyticsChart.data.labels = formattedLabels;
        

        const translatedTitle = getAnalyticsTitle(module);

        chartTitle.textContent = translatedTitle;

        analyticsChart.data.datasets[0].label = translatedTitle;

        analyticsChart.data.datasets[0].data =
            data.values;

        analyticsChart.options.scales.y.title.text =
            data.unit;

        if (data.unit === "%") {

            analyticsChart.options.scales.y.min = 0;
            analyticsChart.options.scales.y.max = 100;

        } else {

            delete analyticsChart.options.scales.y.min;
            delete analyticsChart.options.scales.y.max;
        }

        analyticsChart.update();

    }
    catch (error) {

        console.error(
            "Analytics API error:",
            error
        );
    }
}


// =========================
// MODULE SWITCHING
// =========================

analyticsModules.forEach(function(module) {

    module.addEventListener("click", async function() {

        const selectedModule =
            module.dataset.module;

        const activePeriod =
            document.querySelector(
                ".analytics-period.active"
            );

        const selectedPeriod =
            activePeriod.dataset.period;

        analyticsModules.forEach(function(item) {
            item.classList.remove("active");
        });

        module.classList.add("active");

        await updateAnalyticsChart(
            selectedModule,
            selectedPeriod
        );
    });

});


// =========================
// PERIOD SWITCHING
// =========================

analyticsPeriods.forEach(function(period) {

    period.addEventListener("click", async function() {

        const selectedPeriod =
            period.dataset.period;

        analyticsPeriods.forEach(function(item) {
            item.classList.remove("active");
        });

        period.classList.add("active");

        const activeModule =
            document.querySelector(
                ".analytics-module.active"
            );

        const selectedModule =
            activeModule.dataset.module;

        await updateAnalyticsChart(
            selectedModule,
            selectedPeriod
        );
    });

});


// =========================
// INITIAL DATA
// =========================

const allowedModules = [
    "temperature",
    "humidity",
    "power",
    "solar",
    "battery",
    "water"
];

const urlParams = new URLSearchParams(window.location.search);
const requestedModule = urlParams.get("module");

const initialModule = allowedModules.includes(requestedModule)
    ? requestedModule
    : "temperature";

const initialModuleButton = document.querySelector(
    `.analytics-module[data-module="${initialModule}"]`
);

if (initialModuleButton) {
    analyticsModules.forEach(function(item) {
        item.classList.remove("active");
    });

    initialModuleButton.classList.add("active");
}

updateAnalyticsChart(initialModule, "24h");