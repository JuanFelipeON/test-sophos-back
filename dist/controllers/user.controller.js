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
exports.newUser = exports.loginUser = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "estoEsUnaPrueba";
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        connection_1.default.query("SELECT * FROM USER WHERE email = ?", [email], (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res
                    .status(500)
                    .json({ msg: "Error al buscar el usuario", error: err });
            }
            // Usuario no registrado
            if (data.length === 0) {
                return res.status(404).json({ msg: "Usuario no encontrado" });
            }
            // Encriptacion de la contrasena
            const user = data[0];
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ msg: "Contraseña incorrecta" });
            }
            // Creacion del token
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: "1h",
            });
            res.json({
                msg: "Login exitoso",
                token,
            });
        }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al iniciar sesión",
        });
    }
});
exports.loginUser = loginUser;
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Verificar si el email ya existe
        connection_1.default.query("SELECT * FROM USER WHERE email = ?", [body.email], (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res
                    .status(500)
                    .json({ msg: "Error al verificar el email", error: err });
            }
            if (data.length > 0) {
                return res.status(400).json({ msg: "El email ya está registrado" });
            }
            // Encriptar la contraseña
            body.password = yield dataEncryption(body.password);
            // Insertar el nuevo usuario
            connection_1.default.query("INSERT INTO USER set ?", [body], (err, data) => {
                if (err)
                    throw err;
                res.json({
                    msg: "Usuario agregado con éxito",
                });
            });
        }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al agregar el usuario",
        });
    }
});
exports.newUser = newUser;
function dataEncryption(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        try {
            const hashedString = yield bcryptjs_1.default.hash(text, saltRounds);
            return hashedString;
        }
        catch (error) {
            throw new Error("Error encriptando el string");
        }
    });
}
