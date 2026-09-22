#pragma once

#include <Arduino.h>
#include <ESP8266WebServer.h>

#include "../Models/NovaNestData.h"
#include "../Services/HistoryManager.h"

class WebServer {
public:
    void begin();
    void update();

    void setData(const NovaNestData& data);

    void setHistoryManager(HistoryManager& manager);

private:
    ESP8266WebServer server{80};
    NovaNestData data;

    HistoryManager* historyManager = nullptr;

    void handleRoot();
    void handleStatus();
    void handleNotFound();
};