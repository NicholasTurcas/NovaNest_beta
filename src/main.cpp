#include <Arduino.h>

#include "Config/Config.h"
#include "Services/SystemManager.h"

SystemManager systemManager;

void setup() {
    Serial.begin(Config::SERIAL_BAUD);
    delay(1000);

    systemManager.begin();
}

void loop() {
    systemManager.update();

    delay(100);
}