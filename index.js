const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');

const PUERTO = 8080;
const app = express();

const storage = multer.diskStorage({
    destination: './data/logos',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLowerCase());
    }
})
const upload = multer({
    storage,
    dest: './data/logos',
    limits: {fileSize: 3000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|svg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname))
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: El archivo debe ser una imagen valida");
    }
})

app.use(express.static(`${__dirname}/data/logos`));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

const pathTeams = './data/equipos.json';

app.get('/teams', (req, res) => {
    try {
        const teams = require('./data/equipos.json');
        res.json(teams);
    } catch (err) {
        res.status(500).end('Archivo "equipos.json" no encontrado' + err);
    }
});

app.put('/teams', (req, res) => {
    const bodyTeams = req.body;
    try {
        if (fs.existsSync(pathTeams)) {
            console.log("Se actualizo teams")
            console.log(bodyTeams)
            fs.writeFileSync(pathTeams, JSON.stringify(bodyTeams));
            const teams = require('./data/equipos.json');
            console.log(teams)
            res.send(teams);
        } else {
            throw 'No se pudo actualizar equipos.json porque no existe.';
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

app.post('/team/:tla', (req, res) => {
    const tla = req.params.tla;
    const bodyTeam = req.body;
    const pathTeam = `./data/equipos/${tla}.json`;
    try {
        if (!fs.existsSync(pathTeam)) {
            fs.writeFileSync(pathTeam, JSON.stringify(bodyTeam));
            res.end(`${tla}.json creado correctamente.`);
        } else {
            throw `No se pudo crear ${tla}.json porque ya existe.`;
        }
    } catch (err) {
        res.status(404).end(err);
    }
})

app.put('/team/:tla', (req, res) => {
    const tla = req.params.tla;
    const bodyTeam = req.body;
    const pathTeam = `./data/equipos/${tla}.json`;
    try {
        if (fs.existsSync(pathTeam)) {
            fs.writeFileSync(pathTeam, JSON.stringify(bodyTeam));
            const team = require(`./data/equipos/${tla}.json`);
            res.send(team);
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
            fs.unlinkSync(pathTeam);
            res.end(`${tla}.json eliminado correctamente.`);
        } else {
            throw `No se pudo eliminar ${tla}.json porque no existe.`;
        }
    } catch (err) {
        res.status(404).end(err);
    }
})

app.post('/image', upload.single('logo'), (req, res) => {
    res.end(req.file.filename);
})

app.delete('/image/:id', (req, res) => {
    const id = req.params.id;
    const pathImage = `./data/logos/${id}`;
    try {
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
            res.end('Imagen eliminada correctamente');
        } else {
            throw `No se pudo eliminar la imagen porque no existe.`;
        }
    } catch (err) {
        res.status(404).end(err);
    }
})

app.listen(PUERTO);
console.log(`Escuchando en el Puerto: ${PUERTO}`);