// =========================
// SETTINGS - LANGUAGE
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const languageSelect =
        document.getElementById("languageSelect");

    // Load saved language
    if (languageSelect) {
        languageSelect.value = currentLanguage;

        languageSelect.addEventListener("change", () => {
            setNovaNestLanguage(languageSelect.value);
        });
    }


    // =========================
    // SETTINGS - THEME
    // =========================

    const themeSelect = document.getElementById("themeSelect");

    if (themeSelect) {
        // Load saved theme preference
        themeSelect.value = currentThemePreference;

        // Change theme
        themeSelect.addEventListener("change", () => {
            setNovaNestTheme(themeSelect.value);
        });
    }


    // =========================
    // SETTINGS - NOTIFICATIONS
    // =========================

    const notificationControls = [
        "notificationsEnabled",
        "batteryNotifications",
        "securityNotifications",
        "waterNotifications"
    ];

    // Load saved notification preferences
    notificationControls.forEach(id => {
        const control = document.getElementById(id);

        if (!control) return;

        const savedValue = localStorage.getItem(
            `novaNest_${id}`
        );

        control.checked = savedValue === "true";

        control.addEventListener("change", () => {
            localStorage.setItem(
                `novaNest_${id}`,
                control.checked
            );
        });
    });

    // =========================
    // SETTINGS - SYSTEM STATUS
    // =========================

    const settingsStatus =
        document.getElementById("settingsSystemStatus");

    function updateSettingsStatus() {
        if (!settingsStatus) return;

        settingsStatus.textContent = systemOnline
            ? translations[currentLanguage].online
            : translations[currentLanguage].offline;
    }

    updateSettingsStatus();

    setInterval(updateSettingsStatus, 10000);

});