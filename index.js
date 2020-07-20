const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const PUERTO = 8080;
const SERVEURL = `http://localhost:${PUERTO}`;
const app = express();

const storage = multer.diskStorage({
    destination: './data/logos',
    filename: (req, file, cb) => {
        const fileName = req.params.tla
        cb(null, fileName + path.extname(file.originalname).toLowerCase());
    }
})
const upload = multer({
    storage,
    dest: './data/logos',
    limits: { fileSize: 3000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|svg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname))
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("El archivo debe ser una imagen valida");
    }
})

app.use(express.static(`${__dirname}/data/logos`));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

const teams = require('./data/equipos.json');
const pathTeams = './data/equipos.json';

app.get('/teams', (req, res) => {
    try {
        res.json(teams);
    } catch (error) {
        res.status(404).end(err);
    }
})

app.post('/team/:tla', upload.single('logo'), (req, res) => {
    const tla = req.params.tla;
    const dataTeam = JSON.parse(req.body.team);
    dataTeam.tla = tla;
    const pathTeam = `./data/equipos/${tla}.json`;
    try {
        if (!fs.existsSync(pathTeam)) {
            if (req.file) {
                dataTeam.crestUrl = `${SERVEURL}/${req.file.filename}`;
            } else {
                dataTeam.crestUrl = `${SERVEURL}/error.jpg`
            }
            fs.writeFileSync(pathTeam, JSON.stringify(dataTeam));
            delete dataTeam.activeCompetitions;
            delete dataTeam.squad;
            teams.splice(teams.length, 1, dataTeam);
            fs.writeFileSync(pathTeams, JSON.stringify(teams));
            res.json(teams);
        } else {
            throw `No se pudo crear ${tla}.json porque ya existe.`;
        }
    } catch (err) {
        res.status(404).end(err);
    }
})

app.get('/team/:tla', (req, res) => {
    const tla = req.params.tla;
    try {
        const team = require(`./data/equipos/${tla}.json`);
        res.json(team);
    } catch (err) {
        res.status(404).end(`Archivo "${tla}.json" no encontrado.`);
    }
})

app.put('/team/:tla', upload.single('logo'), (req, res) => {
    const tla = req.params.tla;
    const dataTeam = JSON.parse(req.body.team);
    dataTeam.tla = tla;
    const pathTeam = `./data/equipos/${tla}.json`;
    try {
        if (fs.existsSync(pathTeam)) {
            if (req.file) {
                dataTeam.crestUrl = `${SERVEURL}/${req.file.filename}`;
            }
            fs.writeFileSync(pathTeam, JSON.stringify(dataTeam));
            delete dataTeam.activeCompetitions;
            delete dataTeam.squad;
            const quantityOfTeams = teams.length;
            for (let i = 0; i < quantityOfTeams; i++) {
                if (teams[i].tla === tla) {
                    dataTeams.splice(i, 1, dataTeam);
                    fs.writeFileSync(pathTeams, JSON.stringify(teams));
                }
            }
            res.json(teams);
        } else {
            throw `No se pudo actualizar ${tla}.json porque no existe.`;
        }
    } catch (err) {
        res.status(404).end(err);
    }
})

app.delete('/team/:tla', (req, res) => {
    const tla = req.params.tla;
    const pathTeam = `./data/equipos/${tla}.json`;
    try {
        if (fs.existsSync(pathTeam)) {
            const quantityOfTeams = teams.length;
            for (let i = 0; i < quantityOfTeams; i++) {
                if (teams[i].tla === tla) {
                    teams.splice(i, 1);
                    fs.writeFileSync(pathTeams, JSON.stringify(teams));
                }
            }
            deleteLogo(tla);
            fs.unlinkSync(pathTeam);
            res.json(teams);
        } else {
            throw `No se pudo eliminar ${tla}.json porque no existe.`;
        }
    } catch (err) {
        res.status(404).end(err);
    }
})

function deleteLogo(tla) {
    const team = require(`./data/equipos/${tla}.json`);
    const logoUrl = new URL(team.crestUrl);
    if (logoUrl.origin === SERVEURL) {
        const pathLogo = `./data/logos${logoUrl.pathname}`;
        if (fs.existsSync(pathLogo)) {
            fs.unlinkSync(pathLogo);
            return;
        }
    }
}

app.listen(PUERTO);
console.log(`Escuchando en el Puerto: ${PUERTO}`);