#include "WebServer.h"

void WebServer::begin() {
    server.on("/", [this]() {
        handleRoot();
    });

    server.on("/api/status", [this]() {
        handleStatus();
    });

    server.onNotFound([this]() {
        handleNotFound();
    });

    server.begin();

    Serial.println("[Web] Server pornit.");
    Serial.println("[Web] API: /api/status");
}

void WebServer::update() {
    server.handleClient();
}

void WebServer::handleRoot() {
    String html = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NovaNest</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #111827;
            color: white;
            text-align: center;
            margin: 0;
            padding: 40px 20px;
        }

        .container {
            max-width: 800px;
            margin: auto;
        }

        .card {
            background: #1f2937;
            border-radius: 16px;
            padding: 25px;
            margin-top: 20px;
        }

        h1 {
            margin-bottom: 5px;
        }

        .status {
            color: #4ade80;
            font-weight: bold;
        }
    </style>
</head>

<body>

    <div class="container">

        <h1>NovaNest</h1>
        <p>Sistem Smart Home</p>

        <div class="card">
            <h2>ESP8266</h2>
            <p class="status">ONLINE</p>
            <p>Serverul NovaNest functioneaza.</p>
        </div>

    </div>

</body>
</html>
)rawliteral";

    server.send(200, "text/html", html);
}

void WebServer::handleStatus() {
    String json = "{";

    json += "\"temperature\":" + String(data.temperature, 1) + ",";
    json += "\"humidity\":" + String(data.humidity, 1) + ",";
    json += "\"powerConsumption\":" + String(data.powerConsumption, 2) + ",";
    json += "\"solarProduction\":" + String(data.solarProduction, 2) + ",";
    json += "\"batteryLevel\":" + String(data.batteryLevel, 1) + ",";
    json += "\"systemOnline\":" + String(data.systemOnline ? "true" : "false");

    json += "}";

    server.send(200, "application/json", json);
}

void WebServer::setData(const NovaNestData& newData) {
    data = newData;
}

void WebServer::handleNotFound() {
    server.send(404, "text/plain", "NovaNest - Pagina nu exista.");
}