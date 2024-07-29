import {Request, Response} from 'express';
import connection from '../db/connection';

export const getTasks = (req: Request, res: Response) => {
    connection.query('SELECT * FROM TASK', (err, data) => {
        if(err) throw err;
        res.json(data);
    })
}

export const getTask = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM TASK WHERE id = ?',id, (err, data) => {
        if(err) throw err;
        res.json(data[0]);
    })
}

export const deleteTask = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('DELETE FROM TASK WHERE id = ?',id, (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'Tarea eliminada con exito'
        });
    })
}

export const postTask = (req: Request, res: Response) => {
    const {body} = req;
    connection.query('INSERT INTO TASK set ?',[body] , (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'Tarea Agregada con exito'
        });
    })
}

export const putTask = (req: Request, res: Response) => {
    const {body} = req;
    const {id} = req.params;
    connection.query('UPDATE TASK set ? WHERE id = ?', [body, id], (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'Tarea actualizada con exito'
        });
    })
}