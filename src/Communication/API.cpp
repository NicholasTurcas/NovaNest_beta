
#include "API.h"
#include <time.h>
#include <LittleFS.h>

// =========================
// JSON NUMBER PARSER
// =========================

float getJsonNumber(const String& line, const String& key) {
    String searchKey = "\"" + key + "\":";

    int start = line.indexOf(searchKey);
    if (start == -1) return 0.0f;

    start += searchKey.length();

    int end = line.indexOf(",", start);
    if (end == -1) end = line.indexOf("}", start);
    if (end == -1 || end <= start) return 0.0f;

    return line.substring(start, end).toFloat();
}

unsigned long getJsonTimestamp(const String& line) {
    const String searchKey = "\"timestamp\":";

    int start = line.indexOf(searchKey);
    if (start == -1) return 0;

    start += searchKey.length();

    int end = line.indexOf(",", start);
    if (end == -1) end = line.indexOf("}", start);
    if (end == -1 || end <= start) return 0;

    return line.substring(start, end).toInt();
}

// =========================
// API SETUP
// =========================

void setupAPI(
    ESP8266WebServer& server,
    HistoryManager& historyManager
) {
    server.on("/api/analytics", HTTP_OPTIONS, [&server]() {
        server.sendHeader("Access-Control-Allow-Origin", "*");
        server.sendHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        server.sendHeader("Access-Control-Allow-Headers", "*");
        server.sendHeader("Access-Control-Allow-Private-Network", "true");
        server.send(204);
    });

    server.on("/api/analytics", HTTP_GET, [&server, &historyManager]() {
        Serial.println("[API] Analytics request");

        String module = server.arg("module");
        String period = server.arg("period");

        String dataKey = "temperature";
        String title = "Temperature";
        String unit = "°C";

        if (module == "humidity") {
            dataKey = "humidity";
            title = "Humidity";
            unit = "%";
        } else if (module == "power") {
            dataKey = "power";
            title = "Power Consumption";
            unit = "W";
        } else if (module == "solar") {
            dataKey = "solar";
            title = "Solar Production";
            unit = "W";
        } else if (module == "battery") {
            dataKey = "battery";
            title = "Battery";
            unit = "%";
        } else if (module == "water") {
            dataKey = "waterLevel";
            title = "Water Level";
            unit = "%";
        }

        unsigned long periodSeconds = 86400;
        if (period == "7d") {
            periodSeconds = 604800;
        } else if (period == "30d") {
            periodSeconds = 2592000;
        }

        time_t currentTime = time(nullptr);

        String labels = "[";
        String values = "[";
        bool firstValue = true;

        // Read history incrementally, one line at a time.
        File file = LittleFS.open("/history.json", "r");

        if (!file) {
            server.send(
                500,
                "application/json",
                "{\"error\":\"Failed to open history\"}"
            );
            return;
        }

        while (file.available()) {
            String line = file.readStringUntil('\n');
            line.trim();

            if (line.length() == 0) {
                continue;
            }

            unsigned long timestamp = getJsonTimestamp(line);

            if (timestamp == 0 || currentTime <= 0) {
                continue;
            }

            if (timestamp < (unsigned long)(currentTime - periodSeconds)) {
                continue;
            }

            float value = getJsonNumber(line, dataKey);

            if (!firstValue) {
                labels += ",";
                values += ",";
            }

            labels += "\"" + String(timestamp) + "\"";
            values += String(value, 2);
            firstValue = false;

            yield();
        }

        file.close();

        labels += "]";
        values += "]";

        String json;
        json.reserve(labels.length() + values.length() + 160);

        json = "{\"module\":\"" + module + "\",";
        json += "\"period\":\"" + period + "\",";
        json += "\"title\":\"" + title + "\",";
        json += "\"unit\":\"" + unit + "\",";
        json += "\"labels\":" + labels + ",";
        json += "\"values\":" + values + "}";

        server.sendHeader("Access-Control-Allow-Origin", "*");
        server.sendHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        server.sendHeader("Access-Control-Allow-Headers", "*");
        server.sendHeader("Access-Control-Allow-Private-Network", "true");

        server.send(200, "application/json", json);

        Serial.print("[API] Returned points: ");
        Serial.println(firstValue ? 0 : 1);
    });
}
