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

        if (data.length === 0) {
          return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        const user = data[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ msg: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
          expiresIn: "1h",
        });

        res.json({
          msg: "Login exitoso",
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al iniciar sesión",
    });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    body.password = await dataEncryption(body.password);
    connection.query("INSERT INTO USER set ?", [body], (err, data) => {
      if (err) throw err;
      res.json({
        msg: "Usuario Agregado con éxito",
      });
    });
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
