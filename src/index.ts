import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import Usuario from "./routers/usuarios";

class  Server {

    app = express();

    constructor(){
        this.config();
        this.routers();  
    }

    private config():void{
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    private routers():void{
        this.app.use("/", Usuario.router)
    }

    public initServer():void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log('el servidor ha iniciado en el puerto', this.app.get('port'));
        });
    }
}

const server = new Server();
server.initServer();
