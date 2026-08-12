# Smart Plant Pot

A modern Android app for monitoring and managing plants through IoT sensors and microcontroller integration.

**Languages:** [German](README.md) | English

## Overview

Smart Plant Pot lets users monitor their plants in real time through microcontroller-based sensors. The app provides a user-friendly interface for managing devices, sensors, notifications, and a comprehensive plant catalog.

### Core Features

#### Basic Functions
- **Device Management:** Manage multiple IoT devices with simple registration and custom names
- **Sensor Data:** Real-time monitoring of sensor data (temperature, humidity, soil moisture, etc.)
- **Data History:** Graphical representation of sensor data with filtering options
- **Responsive UI:** Modern user interface with list and grid layout switching

#### Notifications
- **Push Notifications:** Firebase Cloud Messaging (FCM) integration
- **Notification History:** Overview of all received notifications
- **Configurable Settings:** Custom notification options per device

#### Plant Catalog
- **Integrated Catalog:** Extensive database of common houseplants
- **Wikimedia Commons Integration:** High-quality plant images from Wikimedia Commons
- **Offline Availability:** Caching of catalog data for offline use
- **Detailed Information:** Plant care tips and specific requirements

#### ⚙️ Settings & Configuration
- **Microcontroller Setup:** Guided configuration wizard for IoT devices
- **Wi-Fi Setup:** Simple Wi-Fi configuration via QR code
- **Update Rate:** Adjustable sensor polling intervals
- **Multilingual Support:** Available in German and English

#### Additional Features
- **Image Management:** Storage and management of device images from cloud storage
- **QR Code Generation:** Simple device setup codes for quick configuration
- **Deep-Link Support:** Magic-link login and password reset features

## User Guide

### First Setup
1. Start the app and follow the configuration wizard
2. Enter your Supabase credentials
3. Scan the device code (QR code) from the IoT device
4. Complete the Wi-Fi setup

### Device Management
- **Add a device:** Menu → Devices → New Device
- **Delete a device:** Select the device in the overview to open the device details. There, the device can be deleted using the **Remove** button.
- **Change settings:** Select device → Settings

### View Sensor Data
- **Overview:** The home page shows current readings
- **History:** Sensors tab → select a sensor → chart
- **Filters:** Choose a time range (1 day, 7 days, 30 days, etc.)

### Notifications
- **Receive notifications:** Automatically for configured thresholds
- **View history:** Menu → Notification History
- **Settings:** Device → Notification settings

## Authentication & Data Security

- **Supabase Auth:** Secure authentication with email and magic links
- **Row-Level Security (RLS):** Database protection at the row level. All database access is protected by RLS rules, ensuring that users can only access their own devices and data.
- **Encrypted Communication:** HTTPS/TLS for all API requests
- **Firebase Cloud Messaging:** Secure push notification service

## Project Structure

```
Smart Plant Pot/
├── app/                          # Main application (Android)
│   ├── src/
│   │   ├── main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/example/studienprojekt/
│   │   │   │   ├── Activities/       # Android Activities
│   │   │   │   ├── Entities/         # Data models
│   │   │   │   ├── Repositories/     # Data sources
│   │   │   │   ├── Services/         # App services
│   │   │   │   └── Utils/            # Helper functions
│   │   │   └── res/                  # Resources
│   │   ├── androidTest/              # Instrumentation tests
│   │   └── test/                     # Unit tests
│   ├── build.gradle.kts
│   └── google-services.json   # Firebase configuration for the FCM feature
├── provisioning/                 # Provisioning module
│   └── ...
├── gradle/                       # Gradle configuration
├── CHANGELOG.md                  # Changelog (German)
├── CHANGELOG_en.md               # Changelog (English)
├── LICENSE                       # Apache 2.0 license
└── README.md                     # This file
```

## Technology Stack

### Languages & Frameworks
- **Kotlin:** Primary programming language for the Android app
- **Android Framework:** API Level 28-35
- **Jetpack Compose & XML Layouts:** UI design

### Database & Backend
- **Supabase:** Backend-as-a-Service with PostgreSQL
- **Postgrest:** Real-time REST API
- **Room Database:** Local Android data storage

### Libraries
- **Firebase Cloud Messaging (FCM):** Push notifications
- **Ktor Client:** HTTP client for API communication
- **Coil:** Image loading and caching
- **MPAndroidChart:** Data visualization
- **ML Kit Barcode Scanning:** QR code recognition
- **Androidx CameraX:** Camera integration

## System Requirements

- **Minimum Android Version:** Android 9.0 (API Level 28)
- **Target Android Version:** Android 15 (API Level 35)
- **RAM:** At least 2 GB recommended
- **Storage:** About 75 MB in total

## Privacy & Security

The app relies on modern security standards to protect your data:
- **Supabase Row-Level Security (RLS):** Ensures that data is strictly separated by user. No user can view or modify another user's data.
- **Secure Access:** Authentication via Supabase Auth (Email/Magic Link).
- **Encryption:** All data transfers take place via encrypted HTTPS connections.
- **Data Privacy:** No personal data is passed on to third parties for commercial purposes.
- **Push Notifications:** The app uses FCM. An anonymous device token is transmitted to Google servers for this purpose.
- **Local Storage:** Notifications are stored locally in a secured Room database and do not leave the device.
- **Permissions:** Access to camera (QR scanner), notifications, and location (Bluetooth) are only used for their respective functions.

## Development

### Code Guidelines
- **Language:** Kotlin with Coroutines for asynchronous operations
- **Architecture:** MVVM with repository pattern
- **Naming:** Meaningful English names for code, German for UI
- **Documentation:** Inline comments for complex logic

### Development Tools
- **Gradle 8.x:** Build system
- **Android Studio / JetBrains IDE:** Development environment
- **adb:** Android Debug Bridge

---

**Version:** 1.0.0
**Last Updated:** August 12, 2026
**Status:** Release
