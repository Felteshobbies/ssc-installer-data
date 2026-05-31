# SSC Installer Data Format

---

## config.json

The main configuration file loaded by the installer on startup.

```json
{
  "version": 1,
  "installer": {
    "latestVersion": "1.0.7",
    "downloadUrl": "https://..."
  },
  "home": {
    "links": [
      { "title": "Website", "url": "https://simsoaring.club" }
    ]
  },
  "categories": [
    { "key": "glider", "title": "Glider" },
    { "key": "weather", "title": "Weather" }
  ],
  "packages": [
    "ssc-tracker",
    "SSC-Weather-MSFS_2024",
    "DG808S"
  ]
}
```

### Top-level fields

| Field | Description |
|---|---|
| `version` | Config format version. Currently `1`. |
| `installer` | Self-update info. `latestVersion` and `downloadUrl` for the installer exe. |
| `home.links` | Buttons shown on the Home tab. Each entry has `title` and `url`. |
| `categories` | Ordered list of categories shown in the sidebar. Each entry has `key` and `title`. |
| `packages` | Ordered list of package keys. Each key maps to a file at `packages/{key}.json`. |

### Package files

Each entry in `packages` is a key string. The installer loads the corresponding definition from:
- **Remote**: `{baseUrl}packages/{key}.json`
- **Local** (when `config.json` is found next to the exe): `packages/{key}.json` relative to `config.json`

Banner images follow the same pattern: `{baseUrl}banners/{key}.png` (used automatically when `imageUrl` is not set in the package definition).

---

# Package Definition Format

Each package is defined as a JSON object in its own file. The `type` field determines how the installer handles it.

---

## Common Fields (all types)

| Field | Required | Description |
|---|---|---|
| `key` | ✓ | Unique identifier. Must be unique across all packages. |
| `name` | ✓ | Display name shown in the UI. |
| `category` | ✓ | Must match a `key` defined in `categories`. |
| `type` | ✓ | `"link"`, `"shop"`, or `"binary"`. |
| `forMsfs2020` | | Show package when MSFS 2020 filter is active. Default: `true`. |
| `forMsfs2024` | | Show package when MSFS 2024 filter is active. Default: `true`. |
| `required` | | Mark as required — visible in "Show Required" filter. Default: `false`. |
| `shortDescription` | ✓ | One-line subtitle shown in the package list. |
| `description` | ✓ | Full description shown on the package detail page. |
| `imageUrl` | | Banner image URL. Defaults to `{baseUrl}banners/{key}.png`. |
| `title` | | MSFS manifest title. When set, the Settings → Scan can detect packages installed under a non-standard folder name by reading `manifest.json`. Omit to disable manifest-based scan detection for this package. |
| `links` | | Array of `{ "title": "...", "url": "..." }` shown as buttons below the description. |

---

## type: "link"

A web link — no download or installation. Opens a URL in the browser.

**Additional fields:**

| Field | Required | Description |
|---|---|---|
| `url` | ✓ | URL opened when the "Open" button is clicked. |

**Example** — WeSimGlide:
```json
{
  "key": "wesimglide",
  "name": "WeSimGlide",
  "category": "tasks",
  "type": "link",
  "forMsfs2020": true,
  "forMsfs2024": true,
  "shortDescription": "Task library and homepage for sim soaring pilots",
  "description": "...",
  "imageUrl": "https://.../banner_wesimglide.png",
  "url": "https://wesimglide.org",
  "links": [
    { "title": "Homepage", "url": "https://wesimglide.org" },
    { "title": "World Map", "url": "https://wesimglide.org/?tab=map" }
  ]
}
```

---

## type: "shop"

A package purchased externally. Shows a "Shop" button instead of Install. Tracks whether it is already installed.

**Additional fields:**

| Field | Required | Description |
|---|---|---|
| `url` | ✓ | Shop URL opened when the "Shop" button is clicked. |
| `communityInstall` | | `true` if the purchased package installs into the MSFS Community folder. Enables install status detection. |
| `targetDirectory` | if `communityInstall` | Expected subfolder name inside the Community folder. |
| `remoteVersion` | | See [Version Detection](#version-detection). |
| `localVersion` | | See [Version Detection](#version-detection). |

**Example** — ASK 21 (community shop package):
```json
{
  "key": "ASK 21",
  "name": "ASK 21",
  "category": "glider",
  "type": "shop",
  "communityInstall": true,
  "targetDirectory": "f7simulations-k21",
  "forMsfs2020": true,
  "forMsfs2024": true,
  "shortDescription": "f7 simulations ASK21 for MSFS",
  "description": "...",
  "imageUrl": "https://.../banner_ask21.png",
  "url": "https://inibuilds.com/products/f7-simulations-ask-21-msfs",
  "remoteVersion": { "type": "configValue", "version": "1.5.0" },
  "localVersion": {
    "type": "fileContent",
    "path": "manifest.json",
    "pattern": "\"package_version\":\\s*\"([^\"]+)\""
  },
  "links": [
    { "title": "iniBuilds Shop", "url": "https://inibuilds.com/..." }
  ]
}
```

---

## type: "binary" — Non-Community (Desktop App)

A downloadable application installed to the App Base Dir (or a custom path).
The installer finds the first `.exe` in the zip at any depth and uses that directory level as the install root.

**Additional fields:**

| Field | Required | Description |
|---|---|---|
| `communityInstall` | ✓ | Must be `false`. |
| `targetDirectory` | | Subfolder name the package will be installed as inside the App Base Dir. Defaults to the package `key`. |
| `downloadUrl` | ✓ | Direct download URL for the zip file. |
| `launchExe` | | Relative path to the `.exe` to launch (e.g. `"ssc-tracker.exe"`). Enables the "Start" button. |
| `remoteVersion` | | See [Version Detection](#version-detection). |
| `localVersion` | | See [Version Detection](#version-detection). |

**Example** — SSC-Tracker:
```json
{
  "key": "ssc-tracker",
  "name": "SSC-Tracker",
  "category": "tracker",
  "type": "binary",
  "communityInstall": false,
  "forMsfs2020": true,
  "forMsfs2024": true,
  "required": true,
  "shortDescription": "Aircraft tracking and task monitoring for glider pilots",
  "description": "...",
  "imageUrl": "https://.../banner_tracker.png",
  "downloadUrl": "https://www.ssc-tracker.org/updates/ssc-tracker.zip",
  "launchExe": "ssc-tracker.exe",
  "remoteVersion": { "type": "none" },
  "localVersion": { "type": "fileVersion", "path": "ssc-tracker.exe" },
  "links": [
    { "title": "SSC-Tracker.org", "url": "https://www.ssc-tracker.org" }
  ]
}
```

---

## type: "binary" — Community (MSFS Add-on)

A downloadable MSFS community package installed into the Community folder.
The installer finds `manifest.json` in the zip at any depth and uses that directory level as the install root, extracting to `targetDirectory`.

**Additional fields:**

| Field | Required | Description |
|---|---|---|
| `communityInstall` | ✓ | Must be `true`. |
| `targetDirectory` | ✓ | Subfolder name the package will be installed as inside the Community folder. |
| `downloadUrl` | ✓ | Direct download URL for the zip file. |
| `ownedFolders` | | List of old versioned folder names to back up and remove before installing. Use when `targetDirectory` changes between versions. |
| `additionalFolders` | | List of additional Community subfolder names installed by the same zip. See [Multi-Folder Packages](#multi-folder-packages). |
| `remoteVersion` | | See [Version Detection](#version-detection). |
| `localVersion` | | See [Version Detection](#version-detection). |

**Example** — SSC Weather MSFS 2024:
```json
{
  "key": "SSC-Weather-MSFS_2024",
  "name": "SSC Weather",
  "category": "weather",
  "type": "binary",
  "communityInstall": true,
  "targetDirectory": "SSC-Weather-MSFS_2024",
  "forMsfs2020": false,
  "forMsfs2024": true,
  "required": true,
  "shortDescription": "SSC Soaring Weather Presets for MSFS 2024",
  "description": "...",
  "imageUrl": "https://.../banner_weather.png",
  "downloadUrl": "https://github.com/.../SSC-Weather-MSFS_2024.zip",
  "remoteVersion": {
    "type": "githubRelease",
    "owner": "Felteshobbies",
    "repo": "ssc-installer-data",
    "tagPrefix": "SSC-Weather-MSFS_2024-"
  },
  "localVersion": {
    "type": "fileContent",
    "path": "manifest.json",
    "pattern": "\"package_version\":\\s*\"([^\"]+)\""
  },
  "links": [
    { "title": "Homepage", "url": "https://flightsim.to/..." }
  ]
}
```

### Versioned folder names

When a package uses a version number in its folder name (e.g. `AS33_MadoloB21_2.0.2`), set `targetDirectory` to the new version's folder name on each release and list the previous folder name in `ownedFolders`. The installer will back up and remove the old folder before extracting the new one.

```json
{
  "targetDirectory": "yanosik-pirat",
  "ownedFolders": ["yanosik-pirat_1.2"]
}
```

---

## Multi-Folder Packages

Some packages install multiple folders into the Community folder (e.g. aircraft + liveries).
Set `additionalFolders` to list the extra folder names. The zip must contain a `manifest.json` inside each of these folders (at any depth).

The installer identifies each folder in the zip by name and extracts it to `communityPath/{folderName}`.
All folders (primary + additional) are included in backups and restored together.

**Additional fields:**

| Field | Required | Description |
|---|---|---|
| `targetDirectory` | ✓ | Primary folder (used for version detection and install status). |
| `additionalFolders` | ✓ | List of additional folder names present in the zip. |

**Example** — DG 808S (aircraft + liveries):
```json
{
  "key": "DG808S",
  "name": "DG 808S",
  "category": "glider",
  "type": "binary",
  "communityInstall": true,
  "targetDirectory": "touchingcloud-aircraft-dg808s",
  "additionalFolders": ["touchingcloud-liveries-dg808s"],
  "forMsfs2020": true,
  "forMsfs2024": true,
  "shortDescription": "Touchingcloud",
  "description": "...",
  "downloadUrl": "https://github.com/.../touchingcloud-aircraft-dg808s.zip",
  "remoteVersion": {
    "type": "githubRelease",
    "owner": "Felteshobbies",
    "repo": "ssc-installer-data",
    "tagPrefix": "touchingcloud-aircraft-dg808s-"
  },
  "localVersion": {
    "type": "fileContent",
    "path": "manifest.json",
    "pattern": "\"package_version\":\\s*\"([^\"]+)\""
  }
}
```

---

## Version Detection

### remoteVersion

| Type | Fields | Description |
|---|---|---|
| `"none"` | — | No remote version check. |
| `"configValue"` | `version` | Version is hardcoded in the config (e.g. for shop packages). |
| `"githubRelease"` | `owner`, `repo`, `tagPrefix` | Latest GitHub release tag. Strip `tagPrefix` and leading `v` to get the version string. |
| `"versionJson"` | `url`, `jsonPath` | Fetch a JSON file and extract version via dot-path (e.g. `"data.version"`). |

### localVersion

| Type | Fields | Description |
|---|---|---|
| `"directoryNotEmpty"` | — | Installed if the install folder exists and is not empty. No version string. |
| `"fileVersion"` | `path` | Read Windows file version from the given `.exe` (relative to install dir). |
| `"fileContent"` | `path`, `pattern` | Read a file and extract version using a regex with one capture group. |
| `"registry"` | `key`, `valueName` | Read version from Windows registry. |
