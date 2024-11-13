window.onload = function () {
    console.log("Window loaded.");

    // Check if the Jitsi API is available before initializing
    if (typeof JitsiMeetExternalAPI !== 'undefined') {
        console.log("JitsiMeetExternalAPI is available.");
        const urlParams = new URLSearchParams(window.location.search);
        let roomName = urlParams.get('room');

        // Generate a default room name if not present
        if (!roomName) {
            roomName = "DefaultRoom-" + Math.random().toString(36).substring(7);
        }
        console.log("Room name:", roomName);

        const domain = "meet.jit.si";
        const jitsiContainer = document.querySelector("#jitsi-container");

        // Ensure the Jitsi container exists before attempting to initialize
        if (jitsiContainer) {
            const options = {
                roomName: roomName,
                width: "100%",
                height: "100%",
                parentNode: jitsiContainer,
                interfaceConfigOverwrite: {
                    filmStripOnly: false,
                    SHOW_JITSI_WATERMARK: false,
                    SHOW_BRAND_WATERMARK: false,
                    TOOLBAR_BUTTONS: [
                        'microphone', 'camera', 'hangup', 'screenShare', 'chat', 'fullscreen'
                    ],
                },
                userInfo: {
                    displayName: "User Name"
                }
            };

            // Initialize the Jitsi Meet API
            try {
                const api = new JitsiMeetExternalAPI(domain, options);
                console.log("Jitsi Meet API initialized successfully.");
            } catch (error) {
                console.error("Failed to load Jitsi Meet API:", error);
            }

            // Handle back-home button click
            const backHomeButton = document.getElementById('back-home');
            if (backHomeButton) {
                backHomeButton.addEventListener('click', function () {
                    console.log("Back-home button clicked.");
                    window.location.href = '../proj_collide💛/welcome.html';
                });
            } else {
                console.error("Back-home button not found!");
            }
        } else {
            console.error("Jitsi container not found!");
        }
    } else {
        console.error("JitsiMeetExternalAPI is not available.");
    }
};




