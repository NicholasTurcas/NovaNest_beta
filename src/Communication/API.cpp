#include "API.h"

void setupAPI(
    ESP8266WebServer& server,
    HistoryManager& historyManager
) {
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

        Serial.println("[API] Analytics request:");
        Serial.print("Module: ");
        Serial.println(module);
        Serial.print("Period: ");
        Serial.println(period);

        Serial.println("[API] History:");
        Serial.println(history);

        String json = "{";

        json += "\"module\":\"" + module + "\",";
        json += "\"period\":\"" + period + "\",";
        json += "\"history\":\"" + history + "\"";

        json += "}";

        server.send(
            200,
            "application/json",
            json
        );
    });
}