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

    module.addEventListener("click", function() {

        const selectedModule = module.dataset.module;
        const selectedData = analyticsData[selectedModule];

        // Schimbă modulul activ
        analyticsModules.forEach(function(item) {
            item.classList.remove("active");
        });

        module.classList.add("active");

        // Schimbă titlul
        chartTitle.textContent = selectedData.title;

        // Schimbă datele graficului
        analyticsChart.data.labels = selectedData.labels;
        analyticsChart.data.datasets[0].label = selectedData.title;
        analyticsChart.data.datasets[0].data = selectedData.values;

        // Schimbă unitatea axei Y
        analyticsChart.options.scales.y.title.text = selectedData.unit;

        // Reafișează graficul
        analyticsChart.update();
    });

});