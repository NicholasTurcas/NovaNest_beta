#include "WiFiManager.h"
#include "../Config/Config.h"

#include <ESP8266WiFi.h>

void WiFiManager::begin() {
    Serial.println();
    Serial.println("[WiFi] Pornire...");

    WiFi.mode(WIFI_STA);
    WiFi.begin(Config::WIFI_SSID, Config::WIFI_PASSWORD);

    Serial.print("[WiFi] Conectare la: ");
    Serial.println(Config::WIFI_SSID);

    unsigned long startTime = millis();

    while (WiFi.status() != WL_CONNECTED &&
           millis() - startTime < 15000) {

        delay(500);
        Serial.print(".");
    }

    Serial.println();

    if (WiFi.status() == WL_CONNECTED) {
        connected = true;

        Serial.println("[WiFi] Conectat!");
        Serial.print("[WiFi] IP: ");
        Serial.println(WiFi.localIP());
    }
    else {
        connected = false;

        Serial.println("[WiFi] Nu s-a putut realiza conexiunea.");
    }
}

void WiFiManager::update() {
    bool currentStatus = WiFi.status() == WL_CONNECTED;

    if (currentStatus != connected) {
        connected = currentStatus;

        if (connected) {
            Serial.println("[WiFi] Conexiunea a fost restabilita.");
            Serial.print("[WiFi] IP: ");
            Serial.println(WiFi.localIP());
        }
        else {
            Serial.println("[WiFi] Conexiunea a fost pierduta.");
        }
    }
}

bool WiFiManager::isConnected() {
    return connected;
}

String WiFiManager::getIP() {
    if (!connected) {
        return "0.0.0.0";
    }

    return WiFi.localIP().toString();
}