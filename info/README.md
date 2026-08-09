# Studienprojekt - Plant Monitoring App

Eine innovative Android-Anwendung zur Überwachung und Verwaltung von Pflanzen mittels IoT-Sensoren und Microcontroller-Integration.

**Sprachen:**  Deutsch |  [English](README_en.md)

##  Überblick

Die Studienprojekt-App ermöglicht es Benutzern, ihre Pflanzen in Echtzeit zu überwachen, indem sie mit Microcontroller-basierten Sensoren kommuniziert. Die App bietet eine benutzerfreundliche Oberfläche zur Verwaltung von Geräten, Sensoren, Benachrichtigungen und einem umfassenden Pflanzenkatalog.

### Hauptfunktionen

####  Grundfunktionen
- **Geräteverwaltung:** Verwalten Sie mehrere IoT-Geräte mit einfacher Registrierung und benutzerdefinierten Namen
- **Sensordaten:** Echtzeitüberwachung von Sensordaten (Temperatur, Luftfeuchtigkeit, Bodenfeuchtigkeit, etc.)
- **Datenverlauf:** Graphische Darstellung von Sensordaten mit Filteroptionen
- **Responsive UI:** Moderne Benutzerschnittstelle mit List- und Grid-Layout-Umschaltung

####  Benachrichtigungen
- **Push-Benachrichtigungen:** Firebase Cloud Messaging (FCM) Integration
- **Benachrichtigungsverlauf:** Überblick über alle empfangenen Benachrichtigungen
- **Konfigurierbare Einstellungen:** Anpassbare Benachrichtigungsoptionen pro Gerät

####  Pflanzenkatalog
- **Integrierter Katalog:** Umfangreiche Datenbank häufiger Zimmerpflanzen
- **Wikimedia Commons Integration:** Hochwertige Pflanzenbilder von Wikimedia Commons
- **Offline-Verfügbarkeit:** Caching von Katalogdaten für Offline-Nutzung
- **Detaillierte Informationen:** Pflanzenpflege-Tipps und spezifische Anforderungen

#### ⚙️ Einstellungen & Konfiguration
- **Microcontroller Setup:** Geführter Konfigurationsassistent für IoT-Geräte
- **WLAN-Einrichtung:** Einfache WLAN-Konfiguration via QR-Code
- **Aktualisierungsrate:** Anpassbare Sensor-Polling-Intervalle
- **Mehrsprachigkeit:** Verfügbar in Deutsch und Englisch

####  Zusatzfunktionen
- **Bildverwaltung:** Speicherung und Verwaltung von Gerätebildern aus dem Cloud Storage
- **QR-Code-Generierung:** Einfache Geräte-Setup-Codes für schnelle Einrichtung
- **Deep-Link-Support:** Magic-Link-Login und Passwort-Reset-Funktionen

##  Authentifizierung & Datensicherheit

- **Supabase Auth:** Sichere Authentifizierung mit E-Mail und Magic Links
- **Row-Level Security (RLS):** Datenbankschutz auf Zeilenebene
- **Verschlüsselte Kommunikation:** HTTPS/TLS für alle API-Anfragen
- **Firebase Cloud Messaging:** Sicherer Push-Benachrichtigungsdienst

## ️ Projektstruktur

```
Studienprojekt/
├── app/                          # Hauptanwendung (Android)
│   ├── src/
│   │   ├── main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/example/studienprojekt/
│   │   │   │   ├── Activities/       # Android Activities
│   │   │   │   ├── Entities/         # Datenmodelle
│   │   │   │   ├── Repositories/     # Datenquellen
│   │   │   │   ├── Services/         # App-Services
│   │   │   │   └── Utils/            # Hilfsfunktionen
│   │   │   └── res/                  # Ressourcen
│   │   ├── androidTest/              # Instrumentierte Tests
│   │   └── test/                     # Unit Tests
│   ├── build.gradle.kts
│   └── google-services.json
├── provisioning/                 # Provisioning-Modul
│   └── ...
├── gradle/                       # Gradle Konfiguration
├── CHANGELOG.md                  # Versionsverlauf (Deutsch)
├── CHANGELOG_en.md               # Changelog (English)
├── LICENSE                       # Apache 2.0 Lizenz
└── README.md                     # Diese Datei
```

## ️ Technologie-Stack

### Sprachen & Frameworks
- **Kotlin:** Hauptprogrammiersprache für die Android-App
- **Android Framework:** API Level 28-35
- **Jetpack Compose & XML Layouts:** UI-Design

### Datenbank & Backend
- **Supabase:** Backend-as-a-Service mit PostgreSQL
- **Postgrest:** Real-time REST API
- **Room Database:** Lokale Android-Datenspeicherung

### Bibliotheken
- **Firebase Cloud Messaging (FCM):** Push-Benachrichtigungen
- **Ktor Client:** HTTP-Client für API-Kommunikation
- **Coil:** Bildladen und Caching
- **MPAndroidChart:** Datenvisualisierung
- **ML Kit Barcode Scanning:** QR-Code-Erkennung
- **Androidx CameraX:** Kameraintegration

### Entwicklungs-Tools
- **Gradle 8.x:** Build-System
- **Android Studio / JetBrains IDE:** Entwicklungsumgebung
- **adb:** Android Debug Bridge

##  Systemanforderungen

- **Minimum Android Version:** Android 9.0 (API Level 28)
- **Target Android Version:** Android 15 (API Level 35)
- **RAM:** Mindestens 2 GB empfohlen
- **Speicherplatz:** Ca. 50 MB für Installation + Datenbank

##  Installation & Aufbau

### Voraussetzungen
1. Android Studio 2024.1+ oder kompatible IDE
2. Android SDK API Level 35
3. Gradle 8.0+
4. Git
5. Java Runtime Environment (JRE 11+)

### Schritt-für-Schritt

1. **Repository klonen:**
   ```bash
   git clone <repository-url>
   cd Studienprojekt
   ```

2. **Abhängigkeiten aktualisieren:**
   ```bash
   ./gradlew build
   ```

3. **In IDE öffnen:**
   - Android Studio öffnen
   - Projekt-Verzeichnis wählen
   - Gradle-Sync durchführen

4. **APK erstellen:**
   ```bash
   ./gradlew assembleDebug      # Debug-APK
   ./gradlew assembleRelease    # Release-APK
   ```

5. **Auf Gerät installieren:**
   ```bash
   adb install app/build/outputs/apk/debug/app-debug.apk
   ```

### Konfiguration

Vor der ersten Nutzung müssen folgende Einstellungen vorgenommen werden:

1. **Supabase Setup:** Konfigurieren Sie die Supabase-URL und API-Key in den App-Einstellungen
2. **Firebase Setup:** Google Services JSON-Datei in `app/` platzieren
3. **WLAN-Konfiguration:** Erste IoT-Geräte über den Konfigurationsassistenten einrichten

##  Benutzerhandbuch

### Erstes Setup
1. App starten und dem Konfigurationsassistenten folgen
2. Supabase-Zugangsdaten eingeben
3. Gerätecode (QR-Code) vom IoT-Gerät scannen
4. WLAN-Einrichtung durchführen

### Geräteverwaltung
- **Gerät hinzufügen:** Menü → Geräte → Neues Gerät
- **Gerät löschen:** Gerät auswählen → langdrücken → Löschen
- **Einstellungen ändern:** Gerät auswählen → Einstellungen

### Sensordaten anzeigen
- **Überblick:** Home-Seite zeigt aktuelle Messwerte
- **Verlauf:** Sensoren-Tab → Sensor auswählen → Diagramm
- **Filter:** Zeitraum auswählen (1 Tag, 7 Tage, 30 Tage, etc.)

### Benachrichtigungen
- **Benachrichtigungen empfangen:** Automatisch für konfigurierte Wertgrenzen
- **Verlauf anzeigen:** Menü → Benachrichtigungsverlauf
- **Einstellungen:** Gerät → Benachrichtigungseinstellungen

##  Entwicklung

### Code-Richtlinien
- **Sprache:** Kotlin mit Coroutines für asynchrone Operationen
- **Architektur:** MVVM mit Repository-Pattern
- **Naming:** Aussagekräftige English-Namen für Code, Deutsch für UI
- **Dokumentation:** Inline-Kommentare für komplexe Logik

### Testen
```bash
# Unit Tests
./gradlew test

# Instrumentierte Tests
./gradlew connectedAndroidTest

# mit Coverage
./gradlew testDebugUnitTest --coverage
```

### Debugging
- **Logcat:** `adb logcat | grep studienprojekt`
- **Debug-Menü:** In der App mehrfach auf Version tippen zum Aktivieren
- **Supabase-Dashboard:** Online-Überblick unter supabase.com

##  Lizenz

**Studienprojekt - Plant Monitoring App** ist unter der **Apache License 2.0** lizenziert.

- **Projekt-Lizenz:** [Apache License 2.0](LICENSE)
- **Lizenz-Details:** [COPYING.md](COPYING.md)
- **Copyright:** (c) 2026 Studienprojekt

### Was das bedeutet:
- ✅ Sie können die App verwenden, ändern und verbreiten
- ✅ Kommerzielle Nutzung ist erlaubt
- ⚠️ Sie müssen die Lizenz beilegen und die Copyright-Vermerke behalten

### Dritte Bibliotheken
Die App nutzt mehrere Open-Source-Bibliotheken:
- MPAndroidChart (Apache 2.0)
- Coil (Apache 2.0)
- ZXing (Apache 2.0)
- ML Kit (Google Play Services License)
- Und viele weitere...

Eine vollständige Liste finden Sie in der App unter Einstellungen → Lizenzen.

### App-Design & KI-generierte Inhalte
- **App-Icons:** Mit [Microsoft Copilot](https://copilot.microsoft.com/) KI-generiert
- **Grafische Elemente:** Teilweise KI-generiert mit Microsoft Copilot
- **Transparenzbericht:** Alle KI-generierten Elemente sind in den App-Lizenzen dokumentiert und gekennzeichnet.

##  Datenschutz & Sicherheit

- **Sicherheitsmaßnahmen:**
  - Ende-zu-Ende verschlüsselte Kommunikation
  - Keine Speicherung sensibler Daten lokal
  - Regelmäßige Sicherheitsupdates
  - DSGVO-Konformität

##  Beitragen

Wir begrüßen Beiträge! Bitte folgen Sie:

1. Fork das Repository
2. Neue Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen commiten (`git commit -m 'Add some AmazingFeature'`)
4. Push zur Branch (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

##  Support & Kontakt

- **Issues:** GitHub Issues für Bugs und Feature-Anfragen
- **Diskussionen:** GitHub Discussions für Fragen
- **E-Mail:** siehe Projektinformationen

##  Roadmap

### Nächste Versionen
- [ ] Offline-Modus für erweiterte Funktionalität
- [ ] Export von Sensordaten als CSV
- [ ] Erweiterte Datenanalyse und Trends
- [ ] Widget-Integration für Homescreen
- [ ] Geräte-Sharing-Funktion
- [ ] Benachrichtigungen mit ML-Vorhersagen

##  Weitere Ressourcen

- [Changelog](CHANGELOG.md) - Detaillierter Versionsverlauf
- [Third-Party Notices](THIRD_PARTY_NOTICES.md) - Übersicht der verwendeten Open-Source-Software
- [Architecture Plan](architecture.plantuml) - System-Architektur
- [Integration Guide](agent/Integration_Guide_App.md) - Integration von Hardware
- [ESP32 Plan](agent/Integration_Plan_ESP32.md) - Microcontroller-Spezifikationen

## ⭐ Danksagungen

Dieses Projekt wurde im Rahmen eines akademischen Studienprojekts entwickelt.

Vielen Dank an:
- Das Entwicklungsteam des Projekts
- Supabase für die Backend-Infrastruktur
- Firebase/Google für die Push-Benachrichtigungsdienste
- Die Open-Source-Community für großartige Bibliotheken

---

**Version:** 0.1.2
**Letztes Update:** 02. August 2026
**Status:** Aktive Entwicklung


