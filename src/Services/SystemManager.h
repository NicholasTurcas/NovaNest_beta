#pragma once

#include "../Communication/WiFiManager.h"
#include "../Web/WebServer.h"
#include "../Services/HistoryManager.h"

class SystemManager {
public:
    void begin();
    void update();

private:
    WiFiManager wifiManager;
    WebServer webServer;
    HistoryManager historyManager;

    NovaNestData currentData;

    unsigned long lastHistorySave = 0;

    static const unsigned long HISTORY_INTERVAL = 300000;

    void saveHistory();
};