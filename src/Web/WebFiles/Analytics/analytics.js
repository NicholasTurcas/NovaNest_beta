// =========================
// LABELS TIME SPAN
// =========================

// 24h labels
function get24HourLabels() {

    const labels = [];
    const now = new Date();

    labels.push("00:00");

    for (let hour = 2; hour <= now.getHours(); hour += 2) {
        labels.push(
            String(hour).padStart(2, "0") + ":00"
        );
    }

    // Adaugă ora actuală dacă nu este deja prezentă
    const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

    if (!labels.includes(currentTime)) {
        labels.push(currentTime);
    }

    return labels;
}

// 7 days labels
function get7DayLabels() {

    const labels = [];
    const now = new Date();

    const dayNames = [
        "Sun", "Mon", "Tue", "Wed",
        "Thu", "Fri", "Sat"
    ];

    for (let i = 6; i >= 0; i--) {

        const date = new Date(now);

        date.setDate(now.getDate() - i);

        labels.push(
            dayNames[date.getDay()]
        );
    }

    return labels;
}

// 30 days labels
function get30DayLabels() {

    const labels = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {

        const date = new Date(now);

        date.setDate(now.getDate() - i);

        labels.push(
            String(date.getDate()).padStart(2, "0") +
            "/" +
            String(date.getMonth() + 1).padStart(2, "0")
        );
    }

    return labels;
}

// Function to get labels
function getLabels(period) {

    if (period === "24h") {
        return get24HourLabels();
    }

    if (period === "7d") {
        return get7DayLabels();
    }

    if (period === "30d") {
        return get30DayLabels();
    }

    return [];
}


// GET DATA FROM API
async function getAnalyticsData(module, period) {
    const response = await fetch(
        `/api/analytics?module=${module}&period=${period}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
    }

    return await response.json();
}

// =========================
// ANALYTICS DATA
// =========================

const analyticsData = {

    temperature: {
        title: "Temperature",
        unit: "°C",
        labels: [
            "00:00", "02:00", "04:00", "06:00",
            "08:00", "10:00", "12:00", "14:00",
            "16:00", "18:00", "20:00", "22:00"
        ],
        values: [
            24.1, 23.8, 23.5, 23.7,
            24.2, 25.4, 27.1, 28.5,
            29.0, 28.2, 26.7, 25.3
        ]
    },

    humidity: {
        title: "Humidity",
        unit: "%",
        labels: [
            "00:00", "02:00", "04:00", "06:00",
            "08:00", "10:00", "12:00", "14:00",
            "16:00", "18:00", "20:00", "22:00"
        ],
        values: [
            68, 67, 66, 64,
            62, 60, 58, 57,
            55, 57, 60, 63
        ]
    },

    power: {
        title: "Power Consumption",
        unit: "W",
        labels: [
            "00:00", "02:00", "04:00", "06:00",
            "08:00", "10:00", "12:00", "14:00",
            "16:00", "18:00", "20:00", "22:00"
        ],
        values: [
            110, 105, 100, 115,
            130, 150, 180, 165,
            190, 175, 145, 125
        ]
    },

    solar: {
        title: "Solar Production",
        unit: "W",
        labels: [
            "00:00", "02:00", "04:00", "06:00",
            "08:00", "10:00", "12:00", "14:00",
            "16:00", "18:00", "20:00", "22:00"
        ],
        values: [
            0, 0, 0, 20,
            80, 150, 220, 250,
            210, 130, 40, 0
        ]
    },

    battery: {
        title: "Battery",
        unit: "%",
        labels: [
            "00:00", "02:00", "04:00", "06:00",
            "08:00", "10:00", "12:00", "14:00",
            "16:00", "18:00", "20:00", "22:00"
        ],
        values: [
            92, 90, 88, 87,
            86, 88, 91, 94,
            96, 95, 93, 91
        ]
    },

    water: {
        title: "Water Level",
        unit: "%",
        labels: [
            "00:00", "02:00", "04:00", "06:00",
            "08:00", "10:00", "12:00", "14:00",
            "16:00", "18:00", "20:00", "22:00"
        ],
        values: [
            78, 77, 76, 75,
            74, 72, 70, 68,
            67, 69, 72, 75
        ]
    }

};

// =========================
// ANALYTICS CHART
// =========================

const chartCanvas = document.getElementById("temperatureChart");
const chartTitle = document.querySelector(".analytics-chart h3");
const analyticsModules = document.querySelectorAll(".analytics-module");
const analyticsPeriods =
    document.querySelectorAll(".analytics-period");

let analyticsChart = new Chart(chartCanvas, {
    type: "line",

    data: {
        labels: analyticsData.temperature.labels,

        datasets: [{
            label: analyticsData.temperature.title,
            data: analyticsData.temperature.values,

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
                    text: analyticsData.temperature.unit
                }
            }
        }
    }
});

// =========================
// MODULE SWITCHING
// =========================

analyticsModules.forEach(function(module) {

    module.addEventListener("click", async function() {

        const selectedModule =
            module.dataset.module;

        // Perioada selectată momentan
        const activePeriod =
            document.querySelector(".analytics-period.active");

        const selectedPeriod =
            activePeriod.dataset.period;

        // Schimbă modulul activ
        analyticsModules.forEach(function(item) {
            item.classList.remove("active");
        });

        module.classList.add("active");

        // Ia datele din API
        const data =
            await getAnalyticsData(
                selectedModule,
                selectedPeriod
            );

        // Schimbă titlul
        chartTitle.textContent =
            data.title;

        // Schimbă datele graficului
        analyticsChart.data.labels =
            data.labels;

        analyticsChart.data.datasets[0].label =
            data.title;

        analyticsChart.data.datasets[0].data =
            data.values;

        // Schimbă unitatea axei Y
        analyticsChart.options.scales.y.title.text =
            data.unit;

        // Procentele au axa 0-100
        if (data.unit === "%") {

            analyticsChart.options.scales.y.min = 0;
            analyticsChart.options.scales.y.max = 100;

        } else {

            delete analyticsChart.options.scales.y.min;
            delete analyticsChart.options.scales.y.max;
        }

        // Reafișează graficul
        analyticsChart.update();

    });

});

// =========================
// PERIOD SWITCHING
// =========================

analyticsPeriods.forEach(function(period) {

    period.addEventListener("click", async function() {

        const selectedPeriod =
            period.dataset.period;

        // Schimbă perioada activă
        analyticsPeriods.forEach(function(item) {
            item.classList.remove("active");
        });

        period.classList.add("active");

        // Modul selectat momentan
        const activeModule =
            document.querySelector(".analytics-module.active");

        const selectedModule =
            activeModule.dataset.module;

        // Ia datele din API
        const data =
            await getAnalyticsData(
                selectedModule,
                selectedPeriod
            );

        // Pune datele în grafic
        analyticsChart.data.labels =
            data.labels;

        analyticsChart.data.datasets[0].data =
            data.values;

        // Reafișează graficul
        analyticsChart.update();

    });

});