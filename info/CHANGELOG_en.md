# Changelog

## [1.0.0] - 2026-08-12

### Added
- **Notifications:** Added specific notification sounds and vibration patterns, including self-recorded vibration patterns.
- **Sensor Data Visualization:** Implemented new views for days, weeks, and months, along with a two-day comparison function.


## [0.1.3] - 2026-08-04

### Changed
- **Configuration Assistant:** Updated and optimized the initial setup process.
- **UI Improvements:** Comprehensive design adjustments in the plant catalog and sidebar for a better user experience.

### Bug Fixes
- **Synchronization:** Fixed an issue where automatic data synchronization did not start reliably after login.

## [0.1.2] - 2026-08-02

### Added
- **Navigation:** New swipe gestures for intuitive switching between activities in the main overview.

### Changed
- **Plant Catalog:** Significantly improved caching for images and data, resulting in smoother performance.
- **UI & Diagrams:** Comprehensive optimizations to sensor data visualization (individual diagrams and scaling).
- **Device Management:** UI improvements for selecting and deselecting devices, along with consistent renaming to "Select flower pot".
- **Build System:** Update to the latest Gradle version and resolution of various build warnings for better stability.

### Bug Fixes
- **Notifications:** Fix for empty notification views ("NoMessageFromDevice") and further stability fixes in the notification service.

## [0.1.1] - 2026-06-20

### Added
- **Silent Push Notifications:** Support for individual background notifications with adjustable warning levels (e.g., for water tank and battery warnings).
- **Device Visibility:** New feature to globally show and hide devices via the account and device overview.
- **QR Code Generator:** Creation of custom QR codes for the project (Debug option).

### Changed
- **UI Improvements:** Comprehensive optimizations of the user interface, icons, and sensor diagrams for better scaling and consistent display.
- **Legal:** Update of licenses and privacy policy as of version 0.1.1.

### Bug Fixes
- **Device Overview & Database:** Fixed an issue where loading the database failed with more than 1000 entries in the device overview.

## [0.1.0] - 2026-05-31

### Added
- **Microcontroller Settings:** Added settings for update rate in µC configuration and plant profile assignment.
- **Animated Status Icons:** New animated status icons on the home screen with quick links to sensor data.
- **English Language Support:** Complete English translation of the app added.
- **Image Test:** Image test functionality implemented.
- **Plant Catalog:** New plant catalog with Wikimedia Commons image viewer added.
- **Microcontroller Provisioning:** New hardware setup function for microcontroller devices.
- **Plant Catalog Caching:** Cache function for plant catalog data added.

### Changed
- **Notification Settings:** Notification features are now customizable and more flexibly configurable.
- **App Icons:** New, modernized app icons.
- **Real-time Management:** Continuous real-time management and database caching implemented.
- **Logout Process:** Improved and more reliable logout process.
- **Legal:** Update of licenses and privacy policy as of version 0.1.0.

## [0.0.8] - 2026-05-18

### Added
- **Improved Configuration Assistant:** Completely revised process for device commissioning (provisioning) including WiFi setup, PoP verification, and Supabase linking.
- **UI Modernization:** New design for the navigation header and optimized settings elements.
- **Main View:** Implementation of a layout toggle (list/grid) in the device overview.
- **Branding:** Integration of new app icons and graphical elements (ic_flower).

### Changed
- **Legal:** Update of licenses and privacy policy as of version 0.0.8.

## [0.0.7] - 2026-05-02

### Added
- **Performance Optimization:** Implementation of a cache function for relevant data to ensure smoother app performance.
- **Real-time Features:** Expansion of real-time functionalities for more up-to-date data without manual refreshing. Additionally, unified drag-down-to-refresh in all relevant views.
- **Device View:** Revised device overview with expandable editing options and integrated sensor view (also editable).
- **Sensor Management:** Sensor view consolidated under "Sensors" and equipped with powerful filtering functions.

### Changed
- **Notification View:** New, improved view of push notifications, which are now loaded directly from the database (fixes display issues).

## [0.0.6] - 2026-04-26

### Added
- **Move to new Supabase database structure:** Implementation of real RLS (Row-Level Security), authentication, and management of one or more devices per account.
- **Device Management:** Automated registration of devices in the `t_devices` table at Supabase to track active installations.
- **Device List Optimization:** Grouping by type (uC / Android apps) and highlighting your own device. Sorting by last activity.
- **Extended Device Data:** Support for device names, timestamp of last contact (automatic conversion to local time zone), and device types.
- **User Account:** New function to change the password within the app as well as for account deletion and device deletion.
- **Settings Synchronization:** New functions in `SupabaseManager` for updating device and account settings (JSONB).

### Changed
- **UI Adjustment:** In `DeviceDetailsActivity`, name, last contact, and device type are now displayed before the detailed settings.
- **Legal:** Update of licenses and privacy policy as of version 0.0.6.

## [0.0.5] - 2026-04-11

### Added
- **Notification History:** New view (`NotificationViewerActivity`) to view received push notifications.
- **Database Storage:** Local storage of notifications using Room database.
- **History Management:** Option to irrevocably delete the entire notification history including security query.
- **Authentication:** Magic Link login and password reset via email (custom scheme `studienprojektapp://auth/callback`).
- **AuthCallbackActivity:** Dedicated activity for processing deep links, password resets, and session takeover.
- **Magic Link Support:** Integration in `SupabaseConfigActivity` and `KonfigurationsassistentActivity`.

### Changed
- **Supabase Configuration:** Deep link handling configured in `SupabaseManager`.

## [0.0.4] - 2026-04-09

### Added
- **Push Notifications:** App icon added for status bar.

### Changed
- **Push Notifications:** Integration of Firebase Cloud Messaging (FCM) for real-time notifications.
- **Notification Channels:** Implementation of Android Notification Channels for better user control.
- **Legal Notices:** Update of the privacy policy regarding FCM and notifications.

## [0.0.3] - 2026-04-03

### Added
- **Configuration Assistant:** Extension to include selection of the Supabase path (`SupabasePfadActivity`).
- **Settings:** UI improvements in settings and the configuration assistant.
- **Debug Tools:** New view for Supabase debug options.
- **Push Notifications (Debug):** Integration of Firebase Cloud Messaging (FCM) within debug options.
- **QR Code Tools (Debug):** Generation and scanning of QR codes for WLAN and device data (including optional encryption and logo integration).
- **UI Optimization:** Debug menu in the sidebar is now displayed immediately after unlocking in the "About" view.

### Changed
- **Sidebar:** Unnecessary entries (Sensors/Control) removed from the sidebar, as these are primarily accessible via the new bottom navigation.

## [0.0.2] - 2026-02-19

### Added
- **Supabase Image Management:** New `BildtestActivity` to display images from Supabase Storage ("camera" bucket).
- **Supabase Image Interaction:** Full-screen view of images using `PhotoView`.
- **Supabase Sharing Function:** Images can now be shared via long-click (implementation via `FileProvider` and `Cache`).

### Changed
- **Data Visualization:** Integration of `MPAndroidChart` to display sensor data (temperature curves) was switched to Supabase as the data source.

## [0.0.1] - 2026-02-17

### Added
- **Data Visualization:** Integration of `MPAndroidChart` to display sensor data (temperature curves) including filtering by days.
- **Supabase Integration:** Central `SupabaseManager` for managing authentication, database access (Postgrest), and real-time updates (Realtime).
- **Debug Tools:** Advanced debug views for Supabase connectivity and permission checks (unlocking by tapping the app version multiple times).
- **Configuration Assistant:** First-start logic with `WelcomeActivity` and assistant for initial setup.
- **Settings:** Management of connection parameters and app design.
- **Legal Notices:** `LizenzenActivity` with standard mention of the open source libraries used and `DatenschutzActivity`.
- **Base Architecture:** Implementation of `BaseActivity` with navigation drawer for consistent user guidance.

All important changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/en/2.0.0/).
