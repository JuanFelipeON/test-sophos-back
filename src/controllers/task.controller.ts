import { Request, Response } from "express";
import connection from "../db/connection";

export const getTasks = async (req: Request, res: Response) => {
  try {
    connection.query("SELECT * FROM TASK", (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Error al obtener las tareas", error: err });
      }
      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    connection.query("SELECT * FROM TASK WHERE id = ?", [id], (err, data) => {
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
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    connection.query("DELETE FROM TASK WHERE id = ?", [id], (err, data) => {
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
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

export const postTask = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    connection.query("INSERT INTO TASK set ?", [body], (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Error al agregar la tarea", error: err });
      }
      res.json({ msg: "Tarea agregada con éxito" });
    });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};

export const putTask = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  try {
    connection.query(
      "UPDATE TASK set ? WHERE id = ?",
      [body, id],
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ msg: "Error al actualizar la tarea", error: err });
        }
        if (data.affectedRows === 0) {
          return res.status(404).json({ msg: "Tarea no encontrada" });
        }
        res.json({ msg: "Tarea actualizada con éxito" });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor", error });
  }
};
