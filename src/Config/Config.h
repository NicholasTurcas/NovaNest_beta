#pragma once

namespace Config {

    // ==============================
    // NOVANEST - ESP8266
    // ==============================

    // Serial
    constexpr unsigned long SERIAL_BAUD = 9600;

    // Wi-Fi
    constexpr char WIFI_SSID[] = "KOA Street #10";
    constexpr char WIFI_PASSWORD[] = "Review5stars";

    // Web Server
    constexpr unsigned int WEB_SERVER_PORT = 80;

    // Dispozitiv
    constexpr char DEVICE_NAME[] = "NovaNest ESP8266";
}