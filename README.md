# SSC Installer

The SSC Installer helps members of the [Sim Soaring Club](https://simsoaring.club) set up and keep their MSFS add-ons up to date — gliders, weather presets, loggers, and companion tools — from a single place.

---

## Installation

1. Download the latest `Ssc-Installer.exe` from the [Releases](../../releases) page.
2. Run it — no setup wizard needed
3. The installer updates itself when a new version is available.

---

## Overview

The window has three areas:

- **Left sidebar** — category list and quick-launch bar
- **Centre** — package list for the selected category
- **Right** — details and actions for the selected package

Use the **MSFS 2020 / 2024** toggle at the top to show only packages relevant to your simulator version.

---

## Installing a package

1. Select a category in the left sidebar.
2. Click a package in the centre list.
3. Click **Install** in the detail panel on the right.

A progress bar appears during download and extraction. When done, the status badge changes to **Installed** or shows the installed version.

**Update** works the same way — click **Update** when the badge shows a newer version is available.

In case of issues you can show the install log with the 'LOG' entry in the menu bar.

---

## Package types

| Badge | Meaning |
|---|---|
| **Install** / **Update** | Downloadable package — can be installed directly. |
| **Shop** | Purchased externally. Click **Shop** to open the store page. The installer detects whether it is already present in your Community folder. Note: packages installed via the MSFS in-game marketplace are not detected. |
| **Open** | Web link — opens in your browser. |

---

## Starting an application

Some packages (SSC-Tracker, NB21 Logger, …) have a **Start** button once installed. This launches the application directly from the installer.

---

## Backups

Before every install or update the installer automatically creates a backup of the existing folder. Backups are stored in:

```
%LOCALAPPDATA%\SscInstaller\Backups\
```

Each backup is listed in **Settings → Backups**. You can restore any backup from there or directly in the package view.

---

## Settings

Open Settings via the gear icon (bottom of the left sidebar).

### MSFS Community folder

The installer detects your Community folder automatically. If it is in a non-standard location, set a custom path here for **MSFS 2020** and/or **MSFS 2024** separately.

### Application install folder

Non-MSFS-Communityfolder packages (SSC-Tracker, NB21 Logger, …) are installed here by default. Override the path per package if needed.

### Scan Community folders

Click **Scan** to check whether any installed package is in a folder with a non-standard name (e.g. a leftover version-numbered folder from a manual installation). Results show the expected name and the found name, with options to:

- **Use path** — register the found folder as the install location for that package.
- **Rename** — rename the folder to the standard name expected by the installer.

---

## Frequently asked questions

**The installer shows a package as "Not installed" but I know I have it.**
The installer looks for a specific folder name in the Community folder. Use **Settings → Scan** to detect and fix mismatched folder names or delete your already installed package from your community folder and reinstall it from this SSC-Installer.

**Where are downloaded files stored?**
Zip files are downloaded to a temporary folder and deleted immediately after extraction.


---

## Technical reference

This section is for maintainers who manage the package data in this repository.

The installer loads `config.json` from the configured data URL (default: this repository's production branch). Full format documentation is in [PACKAGE_FORMAT.md](PACKAGE_FORMAT.md).

### Repository layout

```
config.json           Main config — categories, installer update info, package key list
packages/             One JSON file per package: packages/{key}.json
banners/              Banner images served as {baseUrl}banners/{key}.png
```

### Self-update

The `installer.latestVersion` and `installer.downloadUrl` fields in `config.json` control the self-update prompt shown to users. Bump these after publishing a new installer release.

### Adding a package

1. Create `packages/{key}.json` — see [PACKAGE_FORMAT.md](PACKAGE_FORMAT.md) for all fields.
2. Add the key string to the `packages` array in `config.json`.
3. Add a banner image as `banners/{key}.png` (recommended: 900 × 200 px).
4. Merge to `production` to go live.


### Update a package

1. Edit `packages/{key}.json` — see [PACKAGE_FORMAT.md](PACKAGE_FORMAT.md) for all fields.
2. In most cases update the version number to the new package version.
3. Update the download URL to point to the new package (upload it as a new release to ssc-installer-data if needed).
4. Merge to `production` to go live.

