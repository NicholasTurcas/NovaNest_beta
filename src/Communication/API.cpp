#include "API.h"
#include <time.h>

float getJsonNumber(const String& line, const String& key) {
    String searchKey = "\"" + key + "\":";

    int start = line.indexOf(searchKey);

    if (start == -1) {
        return 0.0;
    }

    start += searchKey.length();

    int end = line.indexOf(",", start);

    if (end == -1) {
        end = line.indexOf("}", start);
    }

    String value = line.substring(start, end);

    return value.toFloat();
}

unsigned long getJsonTimestamp(const String& line) {
    String searchKey = "\"timestamp\":";

    int start = line.indexOf(searchKey);

    if (start == -1) {
        return 0;
    }

    start += searchKey.length();

    int end = line.indexOf(",", start);

    String value = line.substring(start, end);

    return value.toInt();
}

void setupAPI(
    ESP8266WebServer& server,
    HistoryManager& historyManager
) {

    // CORS / Private Network Access
    server.on("/api/analytics", HTTP_OPTIONS, [&server]() {

        server.sendHeader("Access-Control-Allow-Origin", "*");
        server.sendHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        server.sendHeader("Access-Control-Allow-Headers", "*");
        server.sendHeader("Access-Control-Allow-Private-Network", "true");

        server.send(204);
    });

    // Analytics API
    server.on("/api/analytics", HTTP_GET, [&server, &historyManager]() {

        String module = server.arg("module");
        String period = server.arg("period");

        String history;

        if (!historyManager.read(history)) {
            server.send(
                500,
                "application/json",
                "{\"error\":\"Failed to read history\"}"
            );
            return;
        }

        String title = "Temperature";
        String unit = "°C";
        String dataKey = "temperature";

        if (module == "temperature") {
            title = "Temperature";
            unit = "°C";
            dataKey = "temperature";
        }
        else if (module == "humidity") {
            title = "Humidity";
            unit = "%";
            dataKey = "humidity";
        }
        else if (module == "power") {
            title = "Power Consumption";
            unit = "W";
            dataKey = "power";
        }
        else if (module == "solar") {
            title = "Solar Production";
            unit = "W";
            dataKey = "solar";
        }
        else if (module == "battery") {
            title = "Battery";
            unit = "%";
            dataKey = "battery";
        }
        else if (module == "water") {
            title = "Water Level";
            unit = "%";
            dataKey = "waterLevel";
        }

        unsigned long periodSeconds = 86400;

        if (period == "24h") {
            periodSeconds = 86400;
        }
        else if (period == "7d") {
            periodSeconds = 604800;
        }
        else if (period == "30d") {
            periodSeconds = 2592000;
        }

        time_t currentTime = time(nullptr);

        String labels = "[";
        String values = "[";

        int position = 0;
        bool firstValue = true;

        while (position < (int)history.length()) {

            int lineEnd = history.indexOf("\n", position);

            if (lineEnd == -1) {
                lineEnd = history.length();
            }

            String line = history.substring(position, lineEnd);
            line.trim();

            if (line.length() > 0) {

                unsigned long timestamp =
                    getJsonTimestamp(line);

                if (
                    timestamp > 0 &&
                    currentTime > 0 &&
                    timestamp >= currentTime - periodSeconds
                ) {

                    float value =
                        getJsonNumber(line, dataKey);

                    if (!firstValue) {
                        labels += ",";
                        values += ",";
                    }

                    labels += "\"" + String(timestamp) + "\"";
                    values += String(value, 2);

                    firstValue = false;
                }
            }

            position = lineEnd + 1;
        }

        labels += "]";
        values += "]";

        String json = "{";

        json += "\"module\":\"" + module + "\",";
        json += "\"period\":\"" + period + "\",";
        json += "\"title\":\"" + title + "\",";
        json += "\"unit\":\"" + unit + "\",";
        json += "\"labels\":" + labels + ",";
        json += "\"values\":" + values;

        json += "}";

        // CORS headers
        server.sendHeader(
            "Access-Control-Allow-Origin",
            "*"
        );

        server.sendHeader(
            "Access-Control-Allow-Methods",
            "GET, OPTIONS"
        );

        server.sendHeader(
            "Access-Control-Allow-Headers",
            "*"
        );

        server.sendHeader(
            "Access-Control-Allow-Private-Network",
            "true"
        );

        server.send(
            200,
            "application/json",
            json
        );
    });
}