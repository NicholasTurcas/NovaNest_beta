#pragma once

#include <Arduino.h>

struct HistoryData {
    unsigned long timestamp;

    float temperature;
    float humidity;
    float power;
    float solar;
    float battery;
    float waterLevel;
};

class HistoryManager {

public:

    bool begin();

    bool save(const HistoryData& data);

    bool read(String& history);

};