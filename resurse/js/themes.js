window.addEventListener("load", function () {
    //  Verific tema
    if (localStorage.getItem('theme') === 'lightTheme' || localStorage.getItem('theme') === '') {
        setTheme('lightTheme');
    } else if (localStorage.getItem('theme') === 'darkTheme') {
        setTheme('darkTheme');
    } else {
        setTheme('surpriseTheme');
    }

    function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        if (themeName == "lightTheme") {
            // document.documentElement.className = themeName;
            document.body.style.setProperty("--culoare-menu", "#5BD5FC");
            document.body.style.setProperty("--culoare-menu-selectat", "blue");
            document.body.style.setProperty("--culoare-background", "#f5e3e0");
            document.body.style.setProperty("--culoare-text", "#000");
            document.body.style.setProperty("--culoare-border", "#575CF2");
            document.body.style.setProperty("--culoare-c1", "red");
            document.body.style.setProperty("--culoare-c2", "green");
            document.body.style.setProperty("--culoare-border-tabel", "#2ecc71");
            document.body.style.setProperty("--culoare-link-top-inchis", "black");
            document.body.style.setProperty("--culoare-link-top-border-inchis", "black");
            document.body.style.setProperty("--culoare-border-iframe", "darkgreen");
            document.body.style.setProperty("--culoare-info-produse", "#3498db");
            document.body.style.setProperty("--culoare-galeria-zoom-text", "black");
            document.body.style.setProperty("--culoare-text-video-background", "white");
            document.body.style.setProperty("--culoare-menu-text", "black");
            document.body.style.setProperty("--culoare-info-produse-text", "#5BD5FC");
            document.body.style.setProperty("--culoare-background-input", "#95a5a6");
        }
        else if (themeName == "darkTheme") {
            document.body.style.setProperty("--culoare-menu", "#064663");
            document.body.style.setProperty("--culoare-menu-selectat", "#04293A");
            document.body.style.setProperty("--culoare-background", "#041C32");
            document.body.style.setProperty("--culoare-text", "#ECB365");
            document.body.style.setProperty("--culoare-border", "#575CF2");
            document.body.style.setProperty("--culoare-c1", "red");
            document.body.style.setProperty("--culoare-c2", "green");
            document.body.style.setProperty("--culoare-border-tabel", "black");
            document.body.style.setProperty("--culoare-link-top-inchis", "black");
            document.body.style.setProperty("--culoare-link-top-border-inchis", "black");
            document.body.style.setProperty("--culoare-border-iframe", "darkgreen");
            document.body.style.setProperty("--culoare-info-produse", "#ECB365");
            document.body.style.setProperty("--culoare-galeria-zoom-text", "black");
            document.body.style.setProperty("--culoare-text-video-background", "#064663");
            document.body.style.setProperty("--culoare-menu-text", "#ECB365");
            document.body.style.setProperty("--culoare-info-produse-text", "#ECB365");
            document.body.style.setProperty("--culoare-background-input", "#041C32");
        }
        else {
            document.body.style.setProperty("--culoare-menu", "#736B92");
            document.body.style.setProperty("--culoare-menu-selectat", "#B4656F");
            document.body.style.setProperty("--culoare-background", "#523249");
            document.body.style.setProperty("--culoare-text", "#93827F");
            document.body.style.setProperty("--culoare-border", "#4E937A");
            document.body.style.setProperty("--culoare-c1", "red");
            document.body.style.setProperty("--culoare-c2", "green");
            document.body.style.setProperty("--culoare-border-tabel", "black");
            document.body.style.setProperty("--culoare-link-top-inchis", "black");
            document.body.style.setProperty("--culoare-link-top-border-inchis", "black");
            document.body.style.setProperty("--culoare-border-iframe", "darkgreen");
            document.body.style.setProperty("--culoare-info-produse", "#C7F2A7");
            document.body.style.setProperty("--culoare-galeria-zoom-text", "black");
            document.body.style.setProperty("--culoare-text-video-background", "#064663");
            document.body.style.setProperty("--culoare-menu-text", "#FFD8BE");
            document.body.style.setProperty("--culoare-info-produse-text", "#FFD8BE");
            document.body.style.setProperty("--culoare-background-input", "#2D1115");
        }
    }

    document.getElementById('lightTheme').onclick = function () {
        setTheme('lightTheme');
    };

    document.getElementById('darkTheme').onclick = function () {
        setTheme('darkTheme');
    };

    document.getElementById('surpriseTheme').onclick = function () {
        setTheme('surpriseTheme');
    };
})