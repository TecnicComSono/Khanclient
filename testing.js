// V0.1
const version = "V1.0.0";
const patching = "https://github.com/TecnicComSono/Khanclient/refs/heads/main";

// Plugins archive
const loadedPlugins = [];

// Plugins functions
async function loadScript(url, label) {
    const response = await fetch(url);
    const script = await response.text();
    loadedPlugins.push(label);
    eval(script);
}
async function loadCss(url) {
    return new Promise(resolve => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.onload = () => resolve();
        document.head.appendChild(link);
    });
}

// Misc functions
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => {
    const audio = new Audio(url);
    audio.play();
    console.log(`Playing ${url}`);
};

// Loading element and function
const LoadingScreen = document.createElement('div');
LoadingScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 1s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;";
LoadingScreen.innerHTML = '<span style="color:white;">KHAN</span><span style="color:#7f4fd1;">.CLIENT</span>';
async function showLoadingScreen() {
    document.body.appendChild(LoadingScreen);
    setTimeout(() => LoadingScreen.style.opacity = '1', 10);
}
async function hideLoadingScreen() {
    LoadingScreen.style.opacity = '0';
    setTimeout(() => LoadingScreen.remove(), 500); 
}

// Toasting Function
function sendToast(text, duration = 5000, gravity = 'bottom') {
    Toastify({
        text: text,
        duration: duration,
        gravity: gravity,
        position: "center",
        stopOnFocus: true,
        style: {
            background: "#000000"
        }
    }).showToast();
    console.log(text);
};

// Darkreader and oneko.js
(async () => {
    await loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.js', 'onekoJs');

    await delay(500);

    const onekoEl = document.getElementById('oneko');
    if (onekoEl) {
        onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')";
        onekoEl.style.display = "block";
        onekoEl.style.position = "fixed";
        onekoEl.style.zIndex = "9999";
    } else {
        console.error("Oneko element not found.");
    }

    await loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin');
    DarkReader.setFetchMethod(window.fetch);
    DarkReader.enable();
})();

// WidgetBot

const script = Object.assign(document.createElement("script"), {
    src: "https://cdn.jsdelivr.net/npm/@widgetbot/crate@3",
    async: true,
    onload: () => {
        const discEmbed = new Crate({
            server: "1317527789934739506",
            channel: "1317528101432852500",
            location: ["bottom", "right"],
            notifications: true,
            indicator: true,
            allChannelNotifications: true,
            defer: false,
            color: "#000000",
        });
    },
});
document.body.appendChild(script);

// Loading
(async () => {
    await loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin');

    showLoadingScreen();
    await delay(1500);
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');

    loadedPlugins.forEach(plugin => sendToast(`🔌 ${plugin} Started!`, 2000, 'top'));

    hideLoadingScreen();
    sendToast("📎 Khancliet injected!", 3000, "bottom");
    sendToast("⭐ Made by FontesCode", 3000, "bottom");

    console.log("Made by FontesCode")
})().catch(error => console.error("Error ocurred:", error));
