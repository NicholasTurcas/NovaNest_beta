#include "HistoryManager.h"
#include <LittleFS.h>

bool HistoryManager::begin() {

    if (!LittleFS.begin()) {
        Serial.println("[History] LittleFS failed.");
        return false;
    }

    Serial.println("[History] LittleFS ready.");

    return true;
}

bool HistoryManager::save(const HistoryData& data) {

    File file = LittleFS.open("/history.json", "a");

    if (!file) {
        Serial.println("[History] Failed to open file.");
        return false;
    }

    file.print("{");
    file.print("\"timestamp\":");
    file.print(data.timestamp);
    file.print(",");

    file.print("\"temperature\":");
    file.print(data.temperature);
    file.print(",");

    file.print("\"humidity\":");
    file.print(data.humidity);
    file.print(",");

    file.print("\"power\":");
    file.print(data.power);
    file.print(",");

    file.print("\"solar\":");
    file.print(data.solar);
    file.print(",");

    file.print("\"battery\":");
    file.print(data.battery);
    file.print(",");

    file.print("\"waterLevel\":");
    file.print(data.waterLevel);

    file.println("}");

    file.close();

    return true;
}

bool HistoryManager::read(String& history) {

    File file = LittleFS.open("/history.json", "r");

    if (!file) {
        Serial.println("[History] Failed to open history file.");
        return false;
    }

    history = file.readString();

    file.close();

    return true;
}