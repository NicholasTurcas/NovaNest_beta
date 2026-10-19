// =========================
// NOVANEST TRANSLATIONS
// =========================

const translations = {
    en: {
        online: "Online",
        offline: "Offline",

        navHome: "Home",
        navAnalytics: "Analytics",
        navAutomations: "Automations",
        navSettings: "Settings",

        language: "Language",
        english: "English",
        romanian: "Română",

        // OVERVIEW
        overviewTitle: "Overview",
        temperatureTitle: "Temperature",
        humidityTitle: "Humidity",
        powerTitle: "Power Consumption",
        solarTitle: "Solar Production",
        batteryTitle: "Battery",
        waterTitle: "Water Level",
        lightsTitle: "Lights",
        irrigationTitle: "Irrigation",
        securityTitle: "Security",

        // ANALYTICS
        analyticsTitle: "Analytics",
        analyticsTemperature: "Temperature",
        analyticsHumidity: "Humidity",
        analyticsPower: "Power Consumption",
        analyticsSolar: "Solar Production",
        analyticsBattery: "Battery",
        analyticsWater: "Water Level",
        period7Days: "7 days",
        period30Days: "30 days",

        // AUTOMATIONS
        automationsTitle: "Automations",

        irrigationTitle: "Irrigation",
        irrigationDescription: "Automatic irrigation control",
        irrigationDetails: "Start irrigation when the water level drops below a certain value.",
        irrigationStart: "Start irrigation",
        irrigationStop: "Stop irrigation",
        maximumRuntime: "Maximum runtime",
        status: "Status",
        inactive: "Inactive",

        solarBatteryTitle: "Solar / Battery",
        batteryProtection: "Battery protection",
        criticalBatteryLevel: "Critical battery level",

        temperatureAutomationTitle: "Temperature",
        temperatureDescription: "Automatic temperature control",
        temperatureDetails: "Automatically control heating and cooling based on the room temperature.",
        temperatureMaximum: "Temperature maximum",
        temperatureMinimum: "Temperature minimum",

        batteryProtectionDetails: "Warn the user when the battery level drops below a critical value.",

        lightingTitle: "Lighting",
        lightingDescription: "Automatic outdoor lighting",
        lightingDetails: "Automatically turn on the outdoor lights when it gets dark.",
        turnLightsOnBelow: "Turn lights on below",

        waterManagementTitle: "Water Management",
        waterManagementDescription: "Automatic water refill",
        waterManagementDetails: "Automatically refill the water tank when the water level gets low.",
        startRefillBelow: "Start refill below",
        stopRefillAbove: "Stop refill above",

        securityDescription: "Fingerprint and motion detection",
        securityDetails: "Automatically arm the security system and temporarily disarm it after a valid fingerprint is detected.",
        disarmDuration: "Disarm duration",
        pirSensor: "PIR Sensor",
        noMotion: "No motion",
        fingerprintSensor: "Fingerprint Sensor",
        waiting: "Waiting",
        securityStatus: "Security Status",

        // SETTINGS
        settingsTitle: "Settings",
        systemTitle: "System",
        headerDescription: "Smart Home Dashboard",
        systemName: "System name",
        systemNameDescription: "Name of your smart home system",
        connectionStatus: "Connection status",
        connectionDescription: "Current system connection",
        displayTitle: "Display",
        languageDescription: "Choose your preferred language",
        themeTitle: "Theme",
        themeDescription: "Choose your preferred theme",
        themeSystem: "System",
        themeLight: "Light",
        themeDark: "Dark",
        notificationsTitle: "Notifications",
        enableNotifications: "Enable notifications",
        enableNotificationsDescription: "Receive notifications from NovaNest",
        batteryNotifications: "Low battery",
        batteryNotificationsDescription: "Notify when battery level is low",
        securityNotifications: "Security alerts",
        securityNotificationsDescription: "Notify about security events",
        waterNotifications: "Water level",
        waterNotificationsDescription: "Notify about water level changes",
        aboutTitle: "About",
        projectName: "Project name",
        version: "Version"
    },

    ro: {
        online: "Online",
        offline: "Offline",

        navHome: "Acasă",
        navAnalytics: "Analiză",
        navAutomations: "Automatizări",
        navSettings: "Setări",

        // OVERVIEW
        overviewTitle: "Prezentare generală",
        temperatureTitle: "Temperatură",
        humidityTitle: "Umiditate",
        powerTitle: "Consum de energie",
        solarTitle: "Producție solară",
        batteryTitle: "Baterie",
        waterTitle: "Nivelul apei",
        lightsTitle: "Iluminat",
        irrigationTitle: "Irigare",

        // ANALYTICS
        analyticsTitle: "Analiză",
        analyticsTemperature: "Temperatură",
        analyticsHumidity: "Umiditate",
        analyticsPower: "Consum de energie",
        analyticsSolar: "Producție solară",
        analyticsBattery: "Baterie",
        analyticsWater: "Nivelul apei",
        period7Days: "7 zile",
        period30Days: "30 de zile",

        // AUTOMATIZĂRI
        automationsTitle: "Automatizări",

        irrigationTitle: "Irigare",
        irrigationDescription: "Control automat al irigării",
        irrigationDetails: "Pornește irigarea când nivelul apei scade sub o anumită valoare.",
        irrigationStart: "Pornește irigarea",
        irrigationStop: "Oprește irigarea",
        maximumRuntime: "Durată maximă de funcționare",
        status: "Stare",
        inactive: "Inactiv",

        solarBatteryTitle: "Solar / Baterie",
        batteryProtection: "Protecția bateriei",
        criticalBatteryLevel: "Nivel critic al bateriei",
        batteryProtectionDetails: "Avertizează utilizatorul când nivelul bateriei scade sub o valoare critică.",

        temperatureAutomationTitle: "Temperatură",
        temperatureDescription: "Control automat al temperaturii",
        temperatureDetails: "Controlează automat încălzirea și răcirea în funcție de temperatura camerei.",
        temperatureMaximum: "Temperatură maximă",
        temperatureMinimum: "Temperatură minimă",

        lightingTitle: "Iluminat",
        lightingDescription: "Iluminat exterior automat",
        lightingDetails: "Aprinde automat luminile exterioare când se întunecă.",
        turnLightsOnBelow: "Aprinde luminile sub",

        waterManagementTitle: "Gestionarea apei",
        waterManagementDescription: "Umplere automată cu apă",
        waterManagementDetails: "Umple automat rezervorul când nivelul apei scade.",
        startRefillBelow: "Pornește umplerea sub",
        stopRefillAbove: "Oprește umplerea peste",

        securityTitle: "Securitate",
        securityDescription: "Detectarea amprentelor și a mișcării",
        securityDetails: "Activează automat sistemul de securitate și îl dezactivează temporar după detectarea unei amprente valide.",
        disarmDuration: "Durata dezactivării",
        pirSensor: "Senzor PIR",
        noMotion: "Nicio mișcare",
        fingerprintSensor: "Senzor de amprentă",
        waiting: "În așteptare",
        securityStatus: "Stare de securitate",
        
        // SETTINGS
        settingsTitle: "Setări",
        language: "Limba",
        english: "Engleză",
        romanian: "Română",
        
        systemTitle: "Sistem",
        systemName: "Numele sistemului",
        systemNameDescription: "Numele sistemului tău smart home",
        connectionStatus: "Starea conexiunii",
        connectionDescription: "Conexiunea curentă a sistemului",
        headerDescription: "Panou de control Smart Home",
        displayTitle: "Afișare",
        languageDescription: "Alege limba preferată",
        themeTitle: "Temă",
        themeDescription: "Alege tema preferată",
        themeSystem: "Sistem",
        themeLight: "Luminoasă",
        themeDark: "Întunecată",
        notificationsTitle: "Notificări",
        enableNotifications: "Activează notificările",
        enableNotificationsDescription: "Primește notificări de la NovaNest",
        batteryNotifications: "Baterie descărcată",
        batteryNotificationsDescription: "Notificare când nivelul bateriei este scăzut",
        securityNotifications: "Alerte de securitate",
        securityNotificationsDescription: "Notificări despre evenimente de securitate",
        waterNotifications: "Nivelul apei",
        waterNotificationsDescription: "Notificări despre modificările nivelului apei",
        aboutTitle: "Despre",
        projectName: "Numele proiectului",
        version: "Versiune"
    }
};

// =========================
// CURRENT LANGUAGE
// =========================

let currentLanguage =
    localStorage.getItem("novaNestLanguage") || "en";