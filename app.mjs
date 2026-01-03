import express from 'express';
import './src/config/config.mjs'
import Modulos from './src/modulos'

const PUERTO= process.env.PUERTO;

const APP= express();

app.use(Modulos)

app.listen(PUERTO)

app.use((req, res) => {
    res.status(404).json({ mensaje: 'No encontrado' });
});