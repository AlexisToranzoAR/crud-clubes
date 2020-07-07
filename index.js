const express = require('express');
const exphbs = require('express-handlebars');
const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');
const { body, validationResult } = require('express-validator');
const fs = require('fs');

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

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/data/logos`));

const teams = require('./data/equipos.json');
const pathTeams = './data/equipos.json';

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'main',
        teams,
    })
})

app.get('/team/:tla/see', (req, res) => {
    const tla = req.params.tla;
    const team = require(`./data/equipos/${tla}.json`);
    res.render('see', {
        layout: 'main',
        team,
    })
})

app.get('/create', (req, res) => {
    res.render('create', {
        layout: 'main',
    })
});

app.post('/create', [
    upload.single('logo'),
    body('name').isLength({ min: 1, max: 30}),
    body('shortName').isLength({ min: 1, max: 10 }),
    body('area[name]').isLength({ min: 1, max: 10 }),
    body('tla').isLength({ min: 1, max: 3}),
    body('address').isLength({ min: 1, max: 40 }),
    body('website').isURL(),
    body('founded').isNumeric({ min: 4, max: 4}),
    body('clubColors').isLength({ min: 4, max: 25 }),
    body('venue').isLength({ min: 4, max: 20 })
], (req, res) => {
    const errors = validationResult(req);
    const imgPath = `/${req.file.filename}`;
    const dataTeam = req.body;
    dataTeam.crestUrl = imgPath;
    dataTeam.lastUpdated = new Date();
    const pathDataTeam = `./data/equipos/${dataTeam.tla}.json`;

    if (!errors.isEmpty()) {
        return res.status(422).json({ "No se pudieron cargar los datos debido a los siguientes datos erroneos": errors.array() })
    }

    if (fs.existsSync(pathDataTeam)) {
        return res.status(422).send(`El equipo con el TLA "${dataTeam.tla}" ya es existente en la base de datos.`)
    }

    try {
        fs.writeFileSync(pathDataTeam, JSON.stringify(dataTeam));
        teams.push(dataTeam);
        fs.writeFileSync(pathTeams, JSON.stringify(teams));
    } catch (err) {
        res.status(500).end("No se pudo guardar el objeto en un archivo json");
      }
    res.send("Subido Correctamente")
})

app.get('/team/:tla/edit', (req, res) => {
    const tla = req.params.tla;
    const team = require(`./data/equipos/${tla}.json`);
    res.render('edit', {
        layout: 'main',
        team
    })
})

app.post('/team/:tla/edit', [
    upload.single('logo'),
    body('name').isLength({ min: 1, max: 30}),
    body('shortName').isLength({ min: 1, max: 20 }),
    body('area[name]').isLength({ min: 1, max: 10 }),
    body('tla').isLength({ min: 1, max: 3}),
    body('address').isLength({ min: 1, max: 40 }),
    body('website').isURL(),
    body('founded').isNumeric({ min: 4, max: 4}),
    body('clubColors').isLength({ min: 4, max: 25 }),
    body('venue').isLength({ min: 4, max: 20 })
], (req, res) => {
    const errors = validationResult(req);
    const tla = req.params.tla;
    const dataTeam = req.body;

    if (req.file) {
        const imgPath = `/${req.file.filename}`;
        dataTeam.crestUrl = imgPath;
    } else {
        const team = require(`./data/equipos/${tla}.json`);
        const imgPath = team.crestUrl;
        dataTeam.crestUrl = imgPath;
    }

    dataTeam.lastUpdated = new Date();
    const pathTeam = `./data/equipos/${tla}.json`;

    if (!errors.isEmpty()) {
        return res.status(422).json({ "No se pudieron cargar los datos debido a los siguientes datos erroneos": errors.array() })
    }

    try {
        fs.writeFileSync(pathTeam, JSON.stringify(dataTeam));
        let i = 0;
        for (let team of teams) {
            if (team.tla === tla){
                teams.splice(i, 1, dataTeam);
                fs.writeFileSync(pathTeams, JSON.stringify(teams));
                break;
            }
            i++;
        }
    } catch (err) {
        res.status(500).end("No se pudo guardar el objeto en un archivo json" + err);
      }
    res.send("Subido Correctamente");
})

app.get('/team/:tla/delete', (req, res) => {
    const tla = req.params.tla;
    const team = require(`./data/equipos/${tla}.json`);
    res.render('delete', {
        layout: 'main',
        team
    })
})

app.post('/team/:tla/delete', (req, res) => {
    const tla = req.params.tla;
    const team = require(`./data/equipos/${tla}.json`);
    const pathTeam = `./data/equipos/${tla}.json`;
    const logoUrl = team.crestUrl;
    try {
        if(logoUrl.startsWith('/')){
            const pathLogo = `./data/logos${logoUrl}`;
            fs.unlinkSync(pathLogo);
        }
        fs.unlinkSync(pathTeam);
        let i = 0;
        for (let team of teams) {
            if (team.tla === tla){
                teams.splice(i, 1);
                fs.writeFileSync(pathTeams, JSON.stringify(teams));
                break;
            }
            i++;
        }
      } catch(err) {
        res.status(500).end("No se pudo eliminar el equipo" + err);
      }
    res.send("Eliminado Correctamente");
})

app.listen(PUERTO);
console.log(`Escuchando en el Puerto: ${PUERTO}`);