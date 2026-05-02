import { Configuration } from "../lib";

const config: Configuration = {
    version: 1,
    publishers: [
        {
            name: 'Sim Soaring Club',
            key: 'ssc',
            logoUrl: 'https://simsoaring.club/assets/img/ssc_logo.png',
            defs: [
                {
                    kind: 'addonCategory',
                    key: 'tools',
                    title: 'Tools',
                },
                {
                    kind: 'addonCategory',
                    key: 'aircraft',
                    title: 'Aircraft',
                },
                {
                    kind: 'externalApp',
                    key: 'msfs',
                    prettyName: 'MSFS',
                    detectionType: 'tcp',
                    port: 500,
                },
            ],
            addons: [
                {
                    key: 'ssc-tracker-msfs2024',
                    name: 'SSC-Tracker',
                    simulator: 'msfs2024',
                    category: '@tools',
                    aircraftName: 'SSC-Tracker',
                    titleImageUrl: 'https://www.ssc-tracker.org/sscWhite.png',
                    titleImageUrlSelected: 'https://www.ssc-tracker.org/ssc.png',
                    enabled: true,
                    backgroundImageUrls: ['https://simsoaring.club/assets/img/ssc_logo.png'],
                    shortDescription: 'Aircraft tracking and task monitoring for glider pilots',
                    description:
                        'SSC-Tracker is the companion app for the Sim Soaring Club. ' +
                        'It provides real-time aircraft tracking on a map, terrain and wind data display, ' +
                        'and task monitoring for soaring activities in Microsoft Flight Simulator.\n\n' +
                        'Connect with other SSC pilots during weekly group flights and competitions.',
                    targetDirectory: 'ssc-externaltools-tracker',
                    tracks: [
                        {
                            name: 'Release',
                            key: 'ssc-tracker-release',
                            url: 'https://www.ssc-tracker.org/updates/ssc-tracker.zip',
                            isExperimental: false,
                            releaseModel: {
                                type: 'CDN',
                            },
                            description: 'Latest stable release of SSC-Tracker.',
                        },
                    ],
                    myInstallPage: {
                        links: [
                            {
                                url: 'https://simsoaring.club/',
                                title: 'SSC Website',
                            },
                            {
                                url: 'https://discord.simsoaring.club',
                                title: 'Discord',
                            },
                        ],
                        directories: [
                            {
                                location: {
                                    in: 'community',
                                    path: 'ssc-externaltools-tracker',
                                },
                                title: 'Installation Folder',
                            },
                        ],
                    },
                    disallowedRunningExternalApps: ['@/msfs'],
                },
                {
                    key: 'ssc-tracker-msfs2020',
                    name: 'SSC-Tracker',
                    simulator: 'msfs2020',
                    category: '@tools',
                    aircraftName: 'SSC-Tracker',
                    titleImageUrl: 'https://www.ssc-tracker.org/sscWhite.png',
                    titleImageUrlSelected: 'https://www.ssc-tracker.org/ssc.png',
                    enabled: true,
                    backgroundImageUrls: ['https://simsoaring.club/assets/img/ssc_logo.png'],
                    shortDescription: 'Aircraft tracking and task monitoring for glider pilots',
                    description:
                        'SSC-Tracker is the companion app for the Sim Soaring Club. ' +
                        'It provides real-time aircraft tracking on a map, terrain and wind data display, ' +
                        'and task monitoring for soaring activities in Microsoft Flight Simulator.\n\n' +
                        'Connect with other SSC pilots during weekly group flights and competitions.',
                    targetDirectory: 'ssc-externaltools-tracker',
                    tracks: [
                        {
                            name: 'Release',
                            key: 'ssc-tracker-release',
                            url: 'https://www.ssc-tracker.org/updates/ssc-tracker.zip',
                            isExperimental: false,
                            releaseModel: {
                                type: 'CDN',
                            },
                            description: 'Latest stable release of SSC-Tracker.',
                        },
                    ],
                    myInstallPage: {
                        links: [
                            {
                                url: 'https://simsoaring.club/',
                                title: 'SSC Website',
                            },
                            {
                                url: 'https://discord.simsoaring.club',
                                title: 'Discord',
                            },
                        ],
                        directories: [
                            {
                                location: {
                                    in: 'community',
                                    path: 'ssc-externaltools-tracker',
                                },
                                title: 'Installation Folder',
                            },
                        ],
                    },
                    disallowedRunningExternalApps: ['@/msfs'],
                },
            ],
            buttons: [
                {
                    text: 'Website',
                    action: 'openBrowser',
                    url: 'https://simsoaring.club/',
                },
                {
                    text: 'Discord',
                    action: 'openBrowser',
                    url: 'https://discord.simsoaring.club',
                },
            ],
        },
    ],
};

export default config;
