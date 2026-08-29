#pragma once

#include <Arduino.h>

class WiFiManager {
public:
    void begin();
    void update();

    bool isConnected();
    String getIP();

private:
    bool connected = false;
};