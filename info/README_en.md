# Studienprojekt - Plant Monitoring App

An innovative Android application for monitoring and managing plants using IoT sensors and microcontroller integration.

**Languages:** German | English

## Overview

The Studienprojekt app enables users to monitor their plants in real time by communicating with microcontroller-based sensors. The app provides a user-friendly interface for managing devices, sensors, notifications, and a comprehensive plant catalog.

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

## Authentication & Data Security

- **Supabase Auth:** Secure authentication with email and magic links
- **Row-Level Security (RLS):** Database protection at the row level
- **Encrypted Communication:** HTTPS/TLS for all API requests
- **Firebase Cloud Messaging:** Secure push notification service

## Project Structure

```
Studienprojekt/
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
│   └── google-services.json
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

### Development Tools
- **Gradle 8.x:** Build system
- **Android Studio / JetBrains IDE:** Development environment
- **adb:** Android Debug Bridge

## System Requirements

- **Minimum Android Version:** Android 9.0 (API Level 28)
- **Target Android Version:** Android 15 (API Level 35)
- **RAM:** At least 2 GB recommended
- **Storage:** About 50 MB for installation + database

## Installation & Setup

### Prerequisites
1. Android Studio 2024.1+ or a compatible IDE
2. Android SDK API Level 35
3. Gradle 8.0+
4. Git
5. Java Runtime Environment (JRE 11+)

### Step-by-Step

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Studienprojekt
   ```

2. **Update dependencies:**
   ```bash
   ./gradlew build
   ```

3. **Open in the IDE:**
   - Open Android Studio
   - Select the project directory
   - Run Gradle sync

4. **Build an APK:**
   ```bash
   ./gradlew assembleDebug      # Debug APK
   ./gradlew assembleRelease    # Release APK
   ```

5. **Install on a device:**
   ```bash
   adb install app/build/outputs/apk/debug/app-debug.apk
   ```

### Configuration

Before first use, the following settings must be configured:

1. **Supabase Setup:** Configure the Supabase URL and API key in the app settings
2. **Firebase Setup:** Place the Google Services JSON file in the app folder
3. **Wi-Fi Configuration:** Set up the first IoT devices through the configuration wizard

## User Guide

### First Setup
1. Start the app and follow the configuration wizard
2. Enter your Supabase credentials
3. Scan the device code (QR code) from the IoT device
4. Complete the Wi-Fi setup

### Device Management
- **Add a device:** Menu → Devices → New Device
- **Delete a device:** Select device → long press → Delete
- **Change settings:** Select device → Settings

### View Sensor Data
- **Overview:** The home page shows current readings
- **History:** Sensors tab → select a sensor → chart
- **Filters:** Choose a time range (1 day, 7 days, 30 days, etc.)

### Notifications
- **Receive notifications:** Automatically for configured thresholds
- **View history:** Menu → Notification History
- **Settings:** Device → Notification settings

## Development

### Code Guidelines
- **Language:** Kotlin with Coroutines for asynchronous operations
- **Architecture:** MVVM with repository pattern
- **Naming:** Meaningful English names for code, German for UI
- **Documentation:** Inline comments for complex logic

### Testing
```bash
# Unit tests
./gradlew test

# Instrumented tests
./gradlew connectedAndroidTest

# with coverage
./gradlew testDebugUnitTest --coverage
```

### Debugging
- **Logcat:** `adb logcat | grep studienprojekt`
- **Debug menu:** Tap the version multiple times in the app to enable it
- **Supabase Dashboard:** Online overview at supabase.com

## License

**Studienprojekt - Plant Monitoring App** is licensed under the **Apache License 2.0**.

- **Project License:** [Apache License 2.0](LICENSE)
- **License Details:** [COPYING.md](COPYING.md)
- **Copyright:** (c) 2026 Studienprojekt

### What this means:
- ✅ You can use, modify, and redistribute the app
- ✅ Commercial use is allowed
- ⚠️ You must include the license and keep the copyright notices

### Third-Party Libraries
The app uses several open-source libraries:
- MPAndroidChart (Apache 2.0)
- Coil (Apache 2.0)
- ZXing (Apache 2.0)
- ML Kit (Google Play Services License)
- And many others...

A complete list can be found in the app under Settings → Licenses.

### App Design & AI-Generated Content
- **App icons:** Generated with [Microsoft Copilot](https://copilot.microsoft.com/)
- **Graphics:** Partly generated with Microsoft Copilot
- **Transparency report:** All AI-generated elements are documented and marked in the app licenses

## Privacy & Security

- **Security Measures:**
  - End-to-end encrypted communication
  - No storage of sensitive data locally
  - Regular security updates
  - GDPR compliance

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## Support & Contact

- **Issues:** GitHub Issues for bugs and feature requests
- **Discussions:** GitHub Discussions for questions
- **Email:** See project information

## Roadmap

### Upcoming Versions
- [ ] Offline mode for extended functionality
- [ ] Export sensor data as CSV
- [ ] Advanced data analysis and trends
- [ ] Widget integration for the home screen
- [ ] Device sharing functionality
- [ ] Notifications with ML predictions

## Additional Resources

- [Changelog](CHANGELOG_en.md) - Detailed version history
- [Third-Party Notices](THIRD_PARTY_NOTICES_en.md) - Overview of the open-source software used
- [Architecture Plan](architecture.plantuml) - System architecture
- [Integration Guide](agent/Integration_Guide_App.md) - Hardware integration
- [ESP32 Plan](agent/Integration_Plan_ESP32.md) - Microcontroller specifications

## ⭐ Acknowledgements

This project was developed as an academic student project.

Thank you to:
- The project development team
- Supabase for the backend infrastructure
- Firebase/Google for the push notification services
- The open-source community for excellent libraries

---

**Version:** 0.1.2
**Last Updated:** August 2, 2026
**Status:** Active development
