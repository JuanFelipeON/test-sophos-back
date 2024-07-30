"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTask = exports.postTask = exports.deleteTask = exports.getTask = exports.getTasks = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        connection_1.default.query("SELECT * FROM TASK", (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .json({ msg: "Error al obtener las tareas", error: err });
            }
            res.json(data);
        });
    }
    catch (error) {
        res.status(500).json({ msg: "Error interno del servidor", error });
    }
});
exports.getTasks = getTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        connection_1.default.query("SELECT * FROM TASK WHERE id = ?", [id], (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .json({ msg: "Error al obtener la tarea", error: err });
            }
            if (data.length === 0) {
                return res.status(404).json({ msg: "Tarea no encontrada" });
            }
            res.json(data[0]);
        });
    }
    catch (error) {
        res.status(500).json({ msg: "Error interno del servidor", error });
    }
});
exports.getTask = getTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        connection_1.default.query("DELETE FROM TASK WHERE id = ?", [id], (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .json({ msg: "Error al eliminar la tarea", error: err });
            }
            if (data.affectedRows === 0) {
                return res.status(404).json({ msg: "Tarea no encontrada" });
            }
            res.json({ msg: "Tarea eliminada con éxito" });
        });
    }
    catch (error) {
        res.status(500).json({ msg: "Error interno del servidor", error });
    }
});
exports.deleteTask = deleteTask;
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        connection_1.default.query("INSERT INTO TASK set ?", [body], (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .json({ msg: "Error al agregar la tarea", error: err });
            }
            res.json({ msg: "Tarea agregada con éxito" });
        });
    }
    catch (error) {
        res.status(500).json({ msg: "Error interno del servidor", error });
    }
});
exports.postTask = postTask;
const putTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        connection_1.default.query("UPDATE TASK set ? WHERE id = ?", [body, id], (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .json({ msg: "Error al actualizar la tarea", error: err });
            }
            if (data.affectedRows === 0) {
                return res.status(404).json({ msg: "Tarea no encontrada" });
            }
            res.json({ msg: "Tarea actualizada con éxito" });
        });
    }
    catch (error) {
        res.status(500).json({ msg: "Error interno del servidor", error });
    }
});
exports.putTask = putTask;
