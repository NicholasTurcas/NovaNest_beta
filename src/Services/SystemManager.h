#pragma once

#include "../Communication/WiFiManager.h"
#include "../Web/WebServer.h"

class SystemManager {
public:
    void begin();
    void update();

private:
    WiFiManager wifiManager;
    WebServer webServer;
};