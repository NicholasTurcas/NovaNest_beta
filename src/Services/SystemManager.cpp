#include "SystemManager.h"
#include "../Config/Config.h"

#include <Arduino.h>
#include <time.h>

void SystemManager::begin() {
    Serial.println();
    Serial.println("================================");
    Serial.println("          NOVANEST");
    Serial.println("       ESP8266 SYSTEM");
    Serial.println("================================");

    Serial.print("Device: ");
    Serial.println(Config::DEVICE_NAME);

    Serial.println("System initializat.");

    historyManager.begin();

    webServer.setHistoryManager(historyManager);

    wifiManager.begin();

    // Sincronizare ora prin NTP
    configTime(
        "EET-2EEST,M3.5.0/3,M10.5.0/4",
        "pool.ntp.org",
        "time.nist.gov"
    );

    Serial.print("[Time] Sincronizare ora");

    time_t now = time(nullptr);

    unsigned long startTime = millis();

    while (now < 1000000000 && millis() - startTime < 10000) {
        delay(500);
        Serial.print(".");
        now = time(nullptr);
    }

    Serial.println();

    if (now >= 1000000000) {
        Serial.println("[Time] Ora sincronizata.");

        Serial.print("[Time] Timestamp: ");
        Serial.println((unsigned long)now);
    }
    else {
        Serial.println("[Time] Sincronizarea a esuat.");
    }

    // Date de test
    currentData.temperature = 23.5;
    currentData.humidity = 48.0;
    currentData.powerConsumption = 125.50;
    currentData.solarProduction = 320.20;
    currentData.batteryLevel = 78.0;
    currentData.systemOnline = true;

    webServer.setData(currentData);

    // Salvam primul punct imediat
    saveHistory();

    lastHistorySave = millis();

    if (wifiManager.isConnected()) {
        webServer.begin();
    }
}

void SystemManager::update() {
    wifiManager.update();
    webServer.update();

    if (millis() - lastHistorySave >= HISTORY_INTERVAL) {
        saveHistory();

        lastHistorySave = millis();
    }
}

void SystemManager::saveHistory() {
    time_t now = time(nullptr);

    if (now < 1000000000) {
        Serial.println("[History] Ora invalida. Nu se salveaza.");
        return;
    }

    HistoryData historyData;

    historyData.timestamp = (unsigned long)now;

    historyData.temperature = currentData.temperature;
    historyData.humidity = currentData.humidity;
    historyData.power = currentData.powerConsumption;
    historyData.solar = currentData.solarProduction;
    historyData.battery = currentData.batteryLevel;
    historyData.waterLevel = 75.0;

    if (historyManager.save(historyData)) {
        Serial.println("[History] Date salvate.");
    }
}