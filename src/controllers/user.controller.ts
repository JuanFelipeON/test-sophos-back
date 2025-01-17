import { Request, Response } from "express";
import connection from "../db/connection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "estoEsUnaPrueba";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    connection.query(
      "SELECT * FROM USER WHERE email = ?",
      [email],
      async (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ msg: "Error al buscar el usuario", error: err });
        }
        // Usuario no registrado
        if (data.length === 0) {
          return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        // Comparacion de la password
        const user = data[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ msg: "Contraseña incorrecta" });
        }
        // Creacion del token de autenticacion
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
          expiresIn: "1h",
        });

        res.json({
          error: false,
          msg: "Login exitoso",
          token,
          userName: user.nombre,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al iniciar sesión",
    });
  }
};

export const newUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    // Verificar si el email ya existe
    connection.query(
      "SELECT * FROM USER WHERE email = ?",
      [body.email],
      async (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ msg: "Error al verificar el email", error: err });
        }

        if (data.length > 0) {
          return res.status(400).json({ msg: "El email ya está registrado" });
        }

        // Encriptar la contraseña
        body.password = await dataEncryption(body.password);

        // Insertar el nuevo usuario
        connection.query("INSERT INTO USER set ?", [body], (err, data) => {
          if (err) throw err;
          res.json({
            msg: "Usuario agregado con éxito",
          });
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al agregar el usuario",
    });
  }
};

async function dataEncryption(text: string): Promise<string> {
  const saltRounds = 10;
  try {
    const hashedString = await bcrypt.hash(text, saltRounds);
    return hashedString;
  } catch (error) {
    throw new Error("Error encriptando el string");
  }
}
