type Step = {
    title: string;
    description: string;
};

export type OSInstruction = {
    title: string;
    summery: string;
    data: {
        id: string;
        title: string;
        descriptionStart: string;
        descriptionSpan: string;
        descriptionEnd: string;
        steps: Step[];
    }[];
};

export const osInstructions: OSInstruction = {
    title: "How to Reduce Animation?", summery: "We care about your comfort and health while you're visiting our site. Your well-being is important to us, and we want to ensure that everyone can enjoy our content without experiencing any adverse effects. If you are sensitive to motion, please know that we've provided options to minimize or eliminate animations on this page. We encourage you to choose the setting that best suits your needs.", data: [
        {
            id: "windows11",
            title: "1. Windows 11",
            descriptionStart: "To reduce browser animations in Windows 11,",
            descriptionSpan: "navigate to Settings > Accessibility > Visual effects and toggle off \"Animation effects\"",
            descriptionEnd: ". This will disable various animations throughout the operating system, including those within web browsers.",

            steps: [
                {
                    title: "Open Settings",
                    description: "Press the Windows key + I to open the Settings app.",
                },
                {
                    title: "Go to Accessibility",
                    description: "Click on \"Accessibility\" in the left-hand menu.",
                },
                {
                    title: "Select Visual Effects",
                    description: 'In the right-hand pane, click on "Visual effects".',
                },
                {
                    title: "Toggle Animation Effects",
                    description: 'Look for an option labeled "Animation effects" and toggle it off.',
                },
                {
                    title: "Turn off Animation Effects",
                    description: 'Toggle the switch next to "Animation effects" to the off position.',
                },
            ],
        },
        {
            id: "windows10",
            title: "2. Windows 10",
            descriptionStart: 'To reduce browser animations in Windows 10,',
            descriptionSpan: 'adjust the "Show animations in Windows" setting in the Ease of Access Center',
            descriptionEnd: ". This setting controls animations for various system elements, including those used in web browsers. Additionally, you can disable specific animations in your browser\'s settings, or by using a browser extension designed to reduce or disable animations.",
            steps: [
                {
                    title: "Open Ease of Access Center",
                    description: 'Press the Windows key + U, or go to Settings > Ease of Access > Display.',
                },
                {
                    title: "Locate \"Show animations in Windows\"",
                    description: 'Scroll down to the "Simplify and personalize Windows" section.',
                },
                {
                    title: "Toggle off the setting",
                    description: 'Turn off the switch next to "Show animations in Windows" to disable animations.',
                },
            ],
        },
        {
            id: "mac",
            title: "3. Mac",
            descriptionStart: 'To reduce browser animations on a Mac,',
            descriptionSpan: 'navigate to System Settings > Accessibility > Display, and enable the "Reduce motion" option',
            descriptionEnd: ". This setting will affect the overall system animation, including in browsers like Safari.",
            steps: [
                {
                    title: "Open System Settings",
                    description: 'Click the Apple icon in the top-left corner of your screen and select "System Settings".',
                },
                {
                    title: "Navigate to Accessibility",
                    description: 'In the System Settings window, click on "Accessibility".',
                },
                {
                    title: "Select Display",
                    description: 'In the Accessibility window, click on "Display".',
                },
                {
                    title: "Enable Reduce Motion",
                    description: 'Check the box next to "Reduce motion" to turn on the feature.',
                },
            ],
        },
        {
            id: "android",
            title: "4. Android",
            descriptionStart: 'To turn off browser animations in Android,',
            descriptionSpan: 'navigate to your device\'s Settings > Accessibility > Visibility enhancements > Remove animations',
            descriptionEnd: ". This will disable animations and transitions across your entire Android device, including web browsers.",
            steps: [
                {
                    title: "Open Settings",
                    description: "Swipe down from the top of the screen and tap the gear icon.",
                },
                {
                    title: "Go to Accessibility",
                    description: 'Scroll down and select "Accessibility".',
                },
                {
                    title: "Select Visibility Enhancements",
                    description: 'Tap "Visibility enhancements" or "Vision enhancements".',
                },
                {
                    title: "Turn on Remove Animations",
                    description: 'Toggle the switch next to "Remove animations" to the "on" position.',
                },
                {
                    title: "Restart your browser",
                    description: "Close and reopen your browser (e.g., Chrome, Firefox) and see if the animations has been reduced or disabled.",
                },
            ],
        },
        {
            id: "ios",
            title: "4. iOS (iPhone or iPad)",
            descriptionStart: 'To reduce or disable browser animations in iOS,',
            descriptionSpan: 'navigate to Settings > Accessibility > Motion and turn on "Reduce Motion"',
            descriptionEnd: '. This will reduce the motion of the user interface, including animations in Safari and other apps. Additionally, you can turn off "Auto-Play Animated Images" in the same section to prevent animated images like GIFs from playing automatically.',
            steps: [
                {
                    title: "Open Settings",
                    description: "Go to the Settings app on your iPhone or iPad.",
                },
                {
                    title: "Navigate to Accessibility",
                    description: 'Scroll down and tap on "Accessibility".',
                },
                {
                    title: "Access Motion Settings",
                    description: 'Tap on "Motion".',
                },
                {
                    title: "Reduce Motion",
                    description: 'Turn on "Reduce Motion" to reduce the overall motion of the user interface.',
                },
                {
                    title: "Disable Auto-Play Animated Images (optional)",
                    description: 'Turn off "Auto-Play Animated Images" to prevent animated images from playing automatically in Safari or Messages.',
                },
                {
                    title: "Turn off other motion settings (optional)",
                    description: 'You can also turn off other motion settings like "Auto-Play Message Effects" and "Auto-Play Video Previews" to further reduce on-screen motion.',
                },
            ],
        },
    ]
};
