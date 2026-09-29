// =========================
// GET DATA FROM API
// =========================

async function getAnalyticsData(module, period) {
    const response = await fetch(
        `http://192.168.0.106/api/analytics?module=${module}&period=${period}`
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
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                }
            },

            y: {
                title: {
                    display: true,
                    text: "°C"
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

        chartTitle.textContent =
            data.title;

        analyticsChart.data.labels =
            formattedLabels;

        analyticsChart.data.datasets[0].label =
            data.title;

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

updateAnalyticsChart(
    "temperature",
    "24h"
);