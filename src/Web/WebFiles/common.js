// =========================
// CURRENT DATE & TIME
// =========================

const currentDateElement =
    document.getElementById("currentDate");

const currentTimeElement =
    document.getElementById("currentTime");


// =========================
// DATE & TIME FUNCTION
// =========================

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

// =========================
// SYSTEM STATUS
// =========================

let systemOnline = true;

const headerSystemStatusElement =
    document.getElementById("headerSystemStatus");


// =========================
// UPDATE SYSTEM STATUS
// =========================

function updateSystemStatus() {

    if (!headerSystemStatusElement) {
        return;
    }

    headerSystemStatusElement.textContent =
        systemOnline
            ? "Online"
            : "Offline";
}

// =========================
// START DATE & TIME
// =========================

updateDateTime();
updateSystemStatus();

setInterval(function() {
    updateDateTime();
    updateSystemStatus();
}, 10000);