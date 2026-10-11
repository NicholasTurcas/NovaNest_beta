// =========================
// LANGUAGE SYSTEM
// =========================

function applyTranslations() {
    const language = translations[currentLanguage];

    if (!language) return;

    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");

        if (language[key]) {
            element.textContent = language[key];
        }
    });

    updateDateTime();
    updateSystemStatus();
}


// =========================
// CHANGE LANGUAGE
// =========================

function setNovaNestLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;

    localStorage.setItem("novaNestLanguage", language);

    applyTranslations();

    
    window.dispatchEvent(
    new Event("novaNestLanguageChanged")
);
}


// =========================
// CURRENT DATE & TIME
// =========================

const currentDateElement =
    document.getElementById("currentDate");

const currentTimeElement =
    document.getElementById("currentTime");


function updateDateTime() {
    const now = new Date();

    const locale = currentLanguage === "ro" ? "ro-RO" : "en-GB";

    const date = now.toLocaleDateString(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    const time = now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit"
    });

    if (currentDateElement) {
        currentDateElement.textContent = date;
    }

    if (currentTimeElement) {
        currentTimeElement.textContent = time;
    }
}


// =========================
// SYSTEM STATUS
// =========================

let systemOnline = true;

const headerSystemStatusElement =
    document.getElementById("headerSystemStatus");


function updateSystemStatus() {
    if (!headerSystemStatusElement) return;

    const language = translations[currentLanguage];

    headerSystemStatusElement.textContent =
        systemOnline
            ? language.online
            : language.offline;
}


// =========================
// INITIALIZATION
// =========================

applyTranslations();

setInterval(function() {
    updateDateTime();
    updateSystemStatus();
}, 10000);