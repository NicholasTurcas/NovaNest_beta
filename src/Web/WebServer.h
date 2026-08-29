#pragma once

#include <Arduino.h>
#include <ESP8266WebServer.h>

#include "../Models/NovaNestData.h"

class WebServer {
public:
    void begin();
    void update();

    void setData(const NovaNestData& data);

private:
    ESP8266WebServer server{80};

    NovaNestData data;

    void handleRoot();
    void handleStatus();
    void handleNotFound();
};
