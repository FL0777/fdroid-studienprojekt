# Smart Plant Pot

Eine moderne Android-App zur Überwachung und Verwaltung von Pflanzen über IoT-Sensoren und Microcontroller-Anbindung.

**Sprachen:**  Deutsch |  [English](README_en.md)

##  Überblick

Smart Plant Pot ermöglicht es, Pflanzen in Echtzeit über Microcontroller-basierte Sensoren zu überwachen. Die App bietet eine benutzerfreundliche Oberfläche zur Verwaltung von Geräten, Sensoren, Benachrichtigungen und einem umfassenden Pflanzenkatalog.

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

##  Benutzerhandbuch

### Erstes Setup
1. App starten und dem Konfigurationsassistenten folgen
2. Supabase-Zugangsdaten eingeben
3. Gerätecode (QR-Code) vom IoT-Gerät scannen
4. WLAN-Einrichtung durchführen

### Geräteverwaltung
- **Gerät hinzufügen:** Menü → Geräte → Neues Gerät
- **Gerät löschen:** Wählen Sie das Gerät in der Übersicht aus, um die Gerätedetails zu öffnen. Dort kann das Gerät über den Button **Entfernen** gelöscht werden.
- **Einstellungen ändern:** Gerät auswählen → Einstellungen

### Sensordaten anzeigen
- **Überblick:** Home-Seite zeigt aktuelle Messwerte
- **Verlauf:** Sensoren-Tab → Sensor auswählen → Diagramm
- **Filter:** Zeitraum auswählen (1 Tag, 7 Tage, 30 Tage, etc.)

### Benachrichtigungen
- **Benachrichtigungen empfangen:** Automatisch für konfigurierte Wertgrenzen
- **Verlauf anzeigen:** Menü → Benachrichtigungsverlauf
- **Einstellungen:** Gerät → Benachrichtigungseinstellungen

##  Authentifizierung & Datensicherheit

- **Supabase Auth:** Sichere Authentifizierung mit E-Mail und Magic Links
- **Row-Level Security (RLS):** Datenbankschutz auf Zeilenebene. Alle Datenbankzugriffe sind durch RLS-Regeln geschützt, sodass Benutzer nur auf ihre eigenen Geräte und Daten zugreifen können.
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
│   └── google-services.json   # Firebase-Konfiguration für die FCM-Funktion
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

##  Systemanforderungen

- **Minimum Android Version:** Android 9.0 (API Level 28)
- **Target Android Version:** Android 15 (API Level 35)
- **RAM:** Mindestens 2 GB empfohlen
- **Speicherplatz:** Ca. 75 MB insgesamt

##  Datenschutz & Sicherheit

Die App setzt auf moderne Sicherheitsstandards, um Ihre Daten zu schützen:
- **Supabase Row-Level Security (RLS):** Gewährleistet, dass Daten strikt nach Benutzer getrennt sind. Kein Benutzer kann die Daten eines anderen einsehen oder modifizieren.
- **Sicherer Zugriff:** Authentifizierung via Supabase Auth (E-Mail/Magic Link).
- **Verschlüsselung:** Alle Datenübertragungen erfolgen über verschlüsselte HTTPS-Verbindungen.
- **Datensparsamkeit:** Es werden keine personenbezogenen Daten an Dritte zu kommerziellen Zwecken weitergegeben.
- **Push-Benachrichtigungen:** Die App nutzt FCM. Hierzu wird ein anonymer Geräte-Token an Google-Server übertragen.
- **Lokale Speicherung:** Benachrichtigungen werden lokal in einer gesicherten Room-Datenbank gespeichert und verlassen das Gerät nicht.
- **Berechtigungen:** Zugriff auf Kamera (QR-Scanner), Benachrichtigungen und Standort (Bluetooth) werden nur für die jeweiligen Funktionen genutzt.

##  Entwicklung

### Code-Richtlinien
- **Sprache:** Kotlin mit Coroutines für asynchrone Operationen
- **Architektur:** MVVM mit Repository-Pattern
- **Naming:** Aussagekräftige English-Namen für Code, Deutsch für UI
- **Dokumentation:** Inline-Kommentare für komplexe Logik

### Entwicklungs-Tools
- **Gradle 8.x:** Build-System
- **Android Studio / JetBrains IDE:** Entwicklungsumgebung
- **adb:** Android Debug Bridge

---

**Version:** 1.0.0
**Letztes Update:** 12. August 2026
**Status:** Release
