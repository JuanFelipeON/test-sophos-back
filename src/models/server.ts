import expresss, { Application } from 'express';
import routesTasks from '../routes/task.routes';
import connection from '../db/connection';
import cors from 'cors';


class Server {
    private app: Application;
    private port: string;
    constructor(){
        this.app =  expresss();
        this.port = process.env.PORT || '4000';
        this.middelewares();
        this.routes();
        this.conectarDB();
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo por el puerto ', this.port);
        })
    }
    routes() {
        this.app.use('/api/tasks', routesTasks)
    }

    middelewares() {
        this.app.use(expresss.json());
        this.app.use(cors());
    }

    conectarDB() {
        connection.connect((err)=>{
            if(err) throw err;
            console.log('conectado a la base de datos');
        });
    }
}
export default Server;