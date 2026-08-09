# Changelog

## [0.1.4] - [unreleased]

### Hinzugefügt

### Geändert

### Behandelte Fehler (Bugfixes)

## [0.1.3] - 2026-08-04

### Geändert
- **Konfigurationsassistent:** Der Prozess zur Ersteinrichtung wurde aktualisiert und optimiert.
- **UI Improvements:** Umfassende Design-Anpassungen im Pflanzenkatalog und in der Sidebar für eine bessere Benutzererfahrung.

### Behandelte Fehler (Bugfixes)
- **Synchronisation:** Fehler behoben, bei dem die automatische Datensynchronisation nach der Anmeldung nicht zuverlässig startete.

## [0.1.2] - 2026-08-02

### Hinzugefügt
- **Navigation:** Neue Wischgesten (Swipe) zum intuitiven Wechseln zwischen Aktivitäten in der Hauptübersicht.

### Geändert
- **Pflanzenkatalog:** Deutlich verbessertes Caching für Bilder und Daten, was zu einer flüssigeren Performance führt.
- **UI & Diagramme:** Umfassende Optimierungen an der Sensordaten-Visualisierung (Einzeldiagramme und Skalierung).
- **Geräteverwaltung:** UI-Verbesserungen bei der Auswahl und Deselektion von Geräten sowie konsistente Umbenennung zu „Blumentopf auswählen“.
- **Build-System:** Update auf die neueste Gradle-Version und Behebung diverser Build-Warnungen für bessere Stabilität.

### Behandelte Fehler (Bugfixes)
- **Benachrichtigungen:** Fix für leere Benachrichtigungsansichten ("NoMessageFromDevice") und weitere Stabilitäts-Fixes im Notification-Service.

## [0.1.1] - 2026-06-20

### Hinzugefügt
- **Silent Push Notifications:** Unterstützung für individuelle Hintergrund-Benachrichtigungen mit einstellbaren Warnpegeln (z. B. für Wassertank- und Batteriewarnungen).
- **Geräte-Sichtbarkeit:** Neue Funktion zum globalen Ein- und Ausblenden von Geräten über die Account- und Geräteübersicht.
- **QR-Code Generator:** Erstellung von benutzerdefinierten QR-Codes für das Projekt (Debug-Option).

### Geändert
- **UI Improvements:** Umfassende Optimierungen an der Benutzeroberfläche, Icons und Sensordiagrammen für eine bessere Skalierung und konsistente Darstellung.
- **Rechtliches:** Aktualisierung der Lizenzen und der Datenschutzerklärung auf Stand Version 0.1.1.

### Behandelte Fehler (Bugfixes)
- **Geräteübersicht & Datenbank:** Fehler beim Laden der Datenbank bei mehr als 1000 Einträgen in der Geräteübersicht behoben.

## [0.1.0] - 2026-05-31

### Hinzugefügt
- **Microcontroller Einstellungen:** Einstellungen für Aktualisierungsrate in der µC-Konfiguration und Zuordnung von Pflanzenprofilen hinzugefügt.
- **Animierte Status Icons:** Neue animierte Statusicons in der Startseite mit Quicklinks zu Sensordaten.
- **Englische Sprachunterstützung:** Vollständige englische Übersetzung der App hinzugefügt.
- **Bildtest:** Bildtest-Funktionalität implementiert.
- **Pflanzenkatalog:** Neuer Pflanzenkatalog mit Wikimedia Commons Bildansicht hinzugefügt.
- **Microcontroller Provisioning:** Neue Hardware-Einrichtungsfunktion für Microcontroller-Geräte.
- **Pflanzenkatalog-Caching:** Cache-Funktion für Pflanzenkatalogdaten hinzugefügt.

### Geändert
- **Benachrichtigungseinstellungen:** Benachrichtigungsfeatures sind nun spezifizierbar und flexibler konfigurierbar.
- **App-Icons:** Neue, modernisierte App-Icons.
- **Realtime-Verwaltung:** Kontinuierliches Realtime Management und Datenbank Caching implementiert.
- **Logout-Prozess:** Verbesserter und zuverlässigerer Logout-Prozess.
- **Rechtliches:** Aktualisierung der Lizenzen und der Datenschutzerklärung auf Stand Version 0.1.0.

## [0.0.8] - 2026-05-18

### Hinzugefügt
- **Verbesserter Konfigurationsassistent:** Komplett überarbeiteter Prozess für die Geräte-Inbetriebnahme (Provisioning) inkl. WLAN-Einrichtung, PoP-Verifizierung und Supabase-Verknüpfung.
- **UI-Modernisierung:** Neues Design für den Navigation-Header und optimierte Einstellungs-Elemente.
- **Hauptansicht:** Implementierung einer Layout-Umschaltung (Liste/Grid) in der Geräteübersicht.
- **Branding:** Integration neuer App-Icons und grafischer Elemente (ic_flower).

### Geändert
- **Rechtliches:** Aktualisierung der Lizenzen und der Datenschutzerklärung auf Stand Version 0.0.8.

## [0.0.7] - 2026-05-02

### Hinzugefügt
- **Performance-Optimierung:** Implementierung einer Cache-Funktion für relevante Daten zur Gewährleistung einer flüssigeren App-Performance.
- **Echtzeit-Funktionen:** Erweiterung der Realtime-Funktionalitäten für aktuellere Daten ohne manuelles Aktualisieren. Zusätzlich einheitliches Drag-Down-to-Refresh in allen relevanten Ansichten.
- **Geräteansicht:** Überarbeitete Geräteübersicht mit erweiterbaren Editieroptionen und integrierter Sensorenansicht (ebenfalls editierbar).
- **Sensoren-Management:** Sensorenansicht unter "Sensoren" konsolidiert und mit leistungsstarken Filterfunktionen ausgestattet.

### Geändert
- **Benachrichtigungsansicht:** Neue, verbesserte Ansicht der Push-Benachrichtigungen, die nun direkt aus der Datenbank geladen werden (behebt Probleme bei der Anzeige).

## [0.0.6] - 2026-04-26

### Hinzugefügt
- **Umzug auf neue Supabase-Datenbankstruktur:** Implementierung von echter RLS (Row-Level Security), Authentifizierung und Verwaltung von einem oder mehreren Geräten pro Account.
- **Geräte-Management:** Automatisierte Registrierung von Geräten in der `t_devices` Tabelle bei Supabase zur Nachverfolgung aktiver Installationen.
- **Geräte-Listen-Optimierung:** Gruppierung nach Typ (uC / Android-Apps) und Hervorhebung des eigenen Geräts. Sortierung nach letzter Aktivität.
- **Erweiterte Gerätedaten:** Unterstützung für Gerätenamen, Zeitstempel des letzten Kontakts (automatische Konvertierung in lokale Zeitzone) und Gerätetypen.
- **Benutzerkonto:** Neue Funktion zum Ändern des Passworts innerhalb der App sowie für die Account-Löschung und Geräte-Löschung.
- **Einstellungen-Synchronisierung:** Neue Funktionen im `SupabaseManager` zum Aktualisieren von Geräte- und Account-Einstellungen (JSONB).

### Geändert
- **UI-Anpassung:** In der `DeviceDetailsActivity` werden nun Name, letzter Kontakt und der Gerätetyp vor den detaillierten Einstellungen angezeigt.
- **Rechtliches:** Aktualisierung der Lizenzen und der Datenschutzerklärung auf Stand Version 0.0.6.

## [0.0.5] - 2026-04-11

### Hinzugefügt
- **Benachrichtigungsverlauf:** Neue Ansicht (`NotificationViewerActivity`) zum Einsehen empfangener Push-Benachrichtigungen.
- **Datenbankspeicherung:** Lokale Speicherung von Benachrichtigungen mittels Room-Datenbank.
- **Verlaufs-Management:** Option zum unwiderruflichen Löschen des gesamten Benachrichtigungsverlaufs inkl. Sicherheitsabfrage.
- **Authentifizierung:** Magic-Link Login und Passwort-Reset via E-Mail (Custom Scheme `studienprojektapp://auth/callback`).
- **AuthCallbackActivity:** Dedizierte Activity zur Verarbeitung von Deep Links, Passwort-Resets und Session-Übernahme.
- **Magic-Link Unterstützung:** Integration in `SupabaseConfigActivity` und `KonfigurationsassistentActivity`.

### Geändert
- **Supabase-Konfiguration:** Deep-Link-Handling im `SupabaseManager` konfiguriert.

## [0.0.4] - 2026-04-09

### Hinzugefügt
- **Push-Benachrichtigungen:** App-Icon für Statusleiste hinzugefügt.

### Geändert
- **Push-Benachrichtigungen:** Integration von Firebase Cloud Messaging (FCM) für Echtzeit-Benachrichtigungen.
- **Benachrichtigungs-Kanäle:** Implementierung von Android Notification Channels für bessere Nutzersteuerung.
- **Rechtliche Hinweise:** Aktualisierung der Datenschutzerklärung bezüglich FCM und Benachrichtigungen.

## [0.0.3] - 2026-04-03

### Hinzugefügt
- **Konfigurationsassistent:** Erweiterung um die Auswahl des Supabase-Pfads (`SupabasePfadActivity`).
- **Einstellungen:** UI-Verbesserungen in den Einstellungen und im Konfigurationsassistenten.
- **Debug-Tools:** Neue Ansicht für Supabase-Debug-Optionen.
- **Push-Benachrichtigungen (Debug):** Integration von Firebase Cloud Messaging (FCM) innerhalb der Debug-Optionen.
- **QR-Code Tools (Debug):** Generierung und Scan von QR-Codes für WLAN- und Gerätedaten (inkl. optionaler Verschlüsselung und Logo-Integration).
- **UI-Optimierung:** Debug-Menü in der Sidebar wird nun sofort nach Freischaltung in der "Über"-Ansicht eingeblendet.

### Geändert
- **Sidebar:** Unnötige Einträge (Sensoren/Steuerung) aus der Sidebar entfernt, da diese primär über die neue Bottom-Navigation erreichbar sind.

## [0.0.2] - 2026-02-19

### Hinzugefügt
- **Supabase-Bildverwaltung:** Neue `BildtestActivity` zur Anzeige von Bildern aus dem Supabase Storage ("camera" Bucket).
- **Supabase-Bild-Interaktion:** Vollbildansicht von Bildern mittels `PhotoView`.
- **Supabase-Sharing-Funktion:** Bilder können nun per Long-Click geteilt werden (Implementierung via `FileProvider` und `Cache`).

### Geändert
- **Datenvisualisierung:** Die Integration von `MPAndroidChart` zur Anzeige von Sensordaten (Temperaturverläufe) wurde auf Supabase als Datenquelle umgestellt.

## [0.0.1] - 2026-02-17

### Hinzugefügt
- **Datenvisualisierung:** Integration von `MPAndroidChart` zur Anzeige von Sensordaten (Temperaturverläufe) inklusive Filterung nach Tagen.
- **Supabase-Integration:** Zentraler `SupabaseManager` zur Verwaltung von Authentifizierung, Datenbankzugriff (Postgrest) und Echtzeit-Updates (Realtime).
- **Debug-Tools:** Erweiterte Debug-Ansichten für Supabase-Konnektivität und Berechtigungsprüfungen (Freischaltung durch mehrmaliges Tippen auf die App-Version).
- **Konfigurationsassistent:** Erststart-Logik mit `WelcomeActivity` und Assistent zur Ersteinrichtung.
- **Einstellungen:** Verwaltung der Verbindungsparameter und App-Design.
- **Rechtliche Hinweise:** `LizenzenActivity` mit normgerechter Nennung der verwendeten Open-Source-Bibliotheken und `DatenschutzActivity`.
- **Basis-Architektur:** Implementierung der `BaseActivity` mit Navigation Drawer für eine konsistente Benutzerführung.

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/)
und dieses Projekt hält sich an [Semantic Versioning](https://semver.org/lang/de/).
