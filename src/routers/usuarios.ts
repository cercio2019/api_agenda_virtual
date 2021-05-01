import {Router} from "express";
import {Request, Response} from "express";
import pool from "../database";
import Usuario from "../interfaces/usuario.interface";

class UsuariosRouter {

    public router = Router();
    constructor() {
        this.router.get('/', this.getUsuarios);
        this.router.get('/:id', this.getUsuario);
        this.router.post('/add', this.postUsuario);
        this.router.put('/:id', this.putUsuario);
        this.router.delete('/:id', this.deleteUsuario);
    }

    private getUsuarios = async (req:Request, res:Response) =>{
        await pool.query("SELECT * FROM agenda", (err, results , fiels) =>{
            if(err) throw err;
            res.json(results);
        });
    }

    private getUsuario = async (req:Request, res:Response) =>{
        const {id} = req.params;
        await pool.query("SELECT * FROM agenda WHERE id = ?", id, (err, results, fiels)=>{
            if(err) throw err;
            res.json(results[0]);
        })
    }

    private postUsuario = async (req:Request, res:Response) =>{
        const datos : Usuario = req.body;
        console.log(datos);
        await pool.query("INSERT INTO agenda set ?", datos, (err)=>{
            if(err) throw err;
            res.json({message : datos.nombre+" ha sido registrado con exito"});
        })
    }

    private putUsuario = async (req:Request, res:Response) =>{
        const datos : Usuario = req.body;
        const {id} = req.params;
        await pool.query("UPDATE agenda set ?  WHERE id = ?", [datos, id], (err)=>{
            if(err) throw err;
            res.json({message : "Este contacto ha sido actualizado con exito"});
        })
    }

    private deleteUsuario = async (req:Request, res:Response) =>{
        const {id} = req.params;
        await pool.query("DELETE FROM agenda WHERE id = ?", id, (err)=>{
            if(err) throw err;
            res.json({message : "Este Contacto Ha sido borrado con exito del sistema"});
        })
    }
}

const usuarioRouter = new UsuariosRouter;
export default usuarioRouter;



