#pragma once

#include <ESP8266WebServer.h>
#include "../Services/HistoryManager.h"

void setupAPI(
    ESP8266WebServer& server,
    HistoryManager& historyManager
);