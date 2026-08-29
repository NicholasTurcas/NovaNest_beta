#include "SystemManager.h"
#include "../Config/Config.h"
#include <Arduino.h>

void SystemManager::begin() {
    Serial.println();
    Serial.println("================================");
    Serial.println("          NOVANEST");
    Serial.println("       ESP8266 SYSTEM");
    Serial.println("================================");

    Serial.print("Device: ");
    Serial.println(Config::DEVICE_NAME);

    Serial.println("System initializat.");

    wifiManager.begin();
    NovaNestData testData;

    testData.temperature = 23.5;
    testData.humidity = 48.0;
    testData.powerConsumption = 125.50;
    testData.solarProduction = 320.20;
    testData.batteryLevel = 78.0;
    testData.systemOnline = true;

    webServer.setData(testData);

    if (wifiManager.isConnected()) {
        webServer.begin();
    }
}

void SystemManager::update() {
    wifiManager.update();
    webServer.update();
}