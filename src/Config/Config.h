#pragma once

namespace Config {

    // ==============================
    // NOVANEST - ESP8266
    // ==============================

    // Serial
    constexpr unsigned long SERIAL_BAUD = 9600;

    // Wi-Fi
    constexpr char WIFI_SSID[] = "Marcel";
    constexpr char WIFI_PASSWORD[] = "marcel1983";

    // Web Server
    constexpr unsigned int WEB_SERVER_PORT = 80;

    // Dispozitiv
    constexpr char DEVICE_NAME[] = "NovaNest ESP8266";
}