#pragma once

#include <Arduino.h>
#include <ESP8266WiFi.h>

class WiFiManager {
public:
    void begin();
    void update();

    bool isConnected();
    String getIP();

private:
    bool connected = false;
};