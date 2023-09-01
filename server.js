console.clear()

const express = require('express');
const sharp = require("sharp");
const app = express();
const path = require('path');
const sass = require('sass');
const fs = require("fs");

obGlobal = {
    erori: null,
    imagini: null,
    protocol: "http://",
    numeDomeniu: "localhost:8080",
    evenimente: []
}

// Setare pentru fișierele statice
app.use("/resurse", express.static(__dirname + "/resurse"));

function compileSCSS() {
    var custom = sass.compile(__dirname + "/resurse/styles/custom.scss", { sourceMap: true });
    fs.writeFileSync(__dirname + "/resurse/styles/custom.css", custom.css);

    var nav = sass.compile(__dirname + "/resurse/styles/nav.scss", { sourceMap: true });
    fs.writeFileSync(__dirname + "/resurse/styles/nav.css", nav.css);

    var navMob = sass.compile(__dirname + "/resurse/styles/navMob.scss", { sourceMap: true });
    fs.writeFileSync(__dirname + "/resurse/styles/navMob.css", navMob.css);
}

compileSCSS()

// Setare pentru EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rute
app.get(["/", "/home", "/index"], (req, res) => {
    res.render('pagini/index', { ip: res.socket.remoteAddress, imagini: obGlobal.imagini });
});

app.get('/despre', (req, res) => {
    res.render('pagini/despre');
});

app.get("/*.ejs", function (req, res) {
    renderError(res, 403, "Error 403");
});

app.get("/*", function (req, res) {
    res.render("pagini" + req.url, { ip: res.socket.remoteAddress, imagini: obGlobal.imagini }, function (err, rez) {
        if (err) {
            if (err.message.includes("Failed to lookup view")) {
                renderError(res, 404, "Error 404");
                res.status(404).send();
            }
        }
        else {
            res.send(rez);
        }
    })
});

function createErrors() {
    var continutFisier = fs.readFileSync(__dirname + "/resurse/jsoane/erori.json").toString("utf8");
    obGlobal.erori = JSON.parse(continutFisier);
}

createErrors()
function renderError(res, identificator, titlu, text, imagine) {
    var eroare = obGlobal.erori.info_erori.find(function (elem) {
        return elem.identificator == identificator;
    })
    titlu = titlu || (eroare && eroare.titlu) || obGlobal.erori.eroare_default.titlu;
    text = text || (eroare && eroare.text) || obGlobal.erori.eroare_default.text;
    imagine = imagine || (eroare && obGlobal.erori.cale_baza + "/" + eroare.imagine) || obGlobal.erori.cale_baza + "/" + obGlobal.erori.eroare_default.imagine;
    if (eroare && eroare.status) {
        res.status(identificator).render("pagini/eroare", { titlu: titlu, text: text, imagine: imagine, tipuri_produse: obGlobal.tipuri_produse })
    }
    else {
        res.render("pagini/eroare", { titlu: titlu, text: text, imagine: imagine });
    }
}

//Partea de galerie
function srvTime(elem) {
    let dateObj = new Date();
    var currentMonth = dateObj.getUTCMonth() + 1;
    if (elem.anotimp.includes(currentMonth)) {
        return elem;
    }
    return;
}

function createImages() {
    var continutFisier = fs.readFileSync(__dirname + "/resurse/jsoane/galerie.json")
    console.log(continutFisier)
    var obiect = JSON.parse(continutFisier);
    var dim_mediu = 200;
    var dim_mic = 175;
    var newPictures = [];

    //Vreau sa generez toate imaginile taiate o data cu pornirea serverului
    obGlobal.imagini = obiect.imagini;
    obGlobal.imagini.forEach(function (elem) {
        [numeFisier, extensie] = elem.cale_fisier.split(".");
        elem.cale_fisier = obiect.cale_galerie + "/" + elem.cale_fisier;

        //Pt ecran mediu
        if (!fs.existsSync(obiect.cale_galerie + "/mediu/")) {
            fs.mkdirSync(obiect.cale_galerie + "/mediu/");
        }
        elem.fisier_mediu = obiect.cale_galerie + "/mediu/" + numeFisier + ".webp";
        sharp(__dirname + "/" + elem.cale_fisier).resize(dim_mediu).toFile(__dirname + "/" + elem.fisier_mediu);

        //Pt ecran mic
        if (!fs.existsSync(obiect.cale_galerie + "/mic/")) {
            fs.mkdirSync(obiect.cale_galerie + "/mic/");
        }
        elem.fisier_mic = obiect.cale_galerie + "/mic/" + numeFisier + ".webp";
        sharp(__dirname + "/" + elem.cale_fisier).resize(dim_mic).toFile(__dirname + "/" + elem.fisier_mic);
    });

    //Fac vectorul de imagini, dar am elemente undefined
    //asa ca stochez intr un buffer
    obiect.imagini.forEach(function (elem) {
        newPictures.push(srvTime(elem));
    });

    //Elimin elementele undefined si populez obiectul global
    obGlobal.imagini = newPictures.filter(element => {
        return element !== undefined;
    });

    //Fac trunchierea la 13
    obGlobal.imagini = obGlobal.imagini.slice(0, 13);
}

createImages()

// Ascultare pe portul 8080
app.listen(8080, () => {
    console.log('Serverul rulează pe portul 8080...');
});