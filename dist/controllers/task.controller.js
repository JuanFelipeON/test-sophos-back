"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTask = exports.postTask = exports.deleteTask = exports.getTask = exports.getTasks = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getTasks = (req, res) => {
    connection_1.default.query('SELECT * FROM TASK', (err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
};
exports.getTasks = getTasks;
const getTask = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM TASK WHERE id = ?', id, (err, data) => {
        if (err)
            throw err;
        res.json(data[0]);
    });
};
exports.getTask = getTask;
const deleteTask = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('DELETE FROM TASK WHERE id = ?', id, (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Tarea eliminada con exito'
        });
    });
};
exports.deleteTask = deleteTask;
const postTask = (req, res) => {
    const { body } = req;
    connection_1.default.query('INSERT INTO TASK set ?', [body], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Tarea Agregada con exito'
        });
    });
};
exports.postTask = postTask;
const putTask = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    connection_1.default.query('UPDATE TASK set ? WHERE id = ?', [body, id], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Tarea actualizada con exito'
        });
    });
};
exports.putTask = putTask;
