import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../../../core/entities/Admin';
import GestionDeAdmin from '../../../core/usecases/admin/GestionDeAdmin';
import GestionDeTransacciones from '../../../core/usecases/admin/GestionDeTransacciones';
import config from '../../config/config';
import PersistenciaDeAdmin from '../../persistencia/adapters/PersistenciaDeAdmin';
import PersistenciaDeTransacciones from '../../persistencia/adapters/PersistenciaDeTransacciones';
import { AdminConverter } from '../utils';

export default class AdminController {

    private static createToken(admin: Admin) {
        if (config.jwtSecret) {
            return jwt.sign(
                { user: admin.getUser(), email: admin.getEmail(), role: 'Admin' },
                config.jwtSecret,
                { expiresIn: '3d' }
            );
        }
    }

    public async roleVerification(req: Request, res: Response, next: NextFunction) {
        let authorization;
        if (req && req.headers.authorization) authorization = req.headers.authorization;
        let tokenDecoded;
        if (authorization != undefined) tokenDecoded = jwt.decode(authorization);
        if (tokenDecoded != undefined) {
            const role = JSON.parse(JSON.stringify(tokenDecoded)).role;
            if (role !== "Admin") return res.status(401).redirect("/signin");
        }
        next();
    }

    public async signUp(req: Request, res: Response) {
        try {
            const { user, password } = req.body;
            if (!user || !password) return res.status(400).json({ msg: `No valid input!` });

            const newAdmin = AdminConverter.jsonToAdmin(req);
            const resultado = await new GestionDeAdmin().crearCuenta(newAdmin, new PersistenciaDeAdmin());
            if (resultado === newAdmin) return res.status(303).json({ msg: `${newAdmin.getUser()} already exists!` });
            if (!resultado.getUser()) return res.status(400).json({ msg: `${newAdmin.getUser()} was not saved!` });
            return res.status(201).json({ msg: `${resultado.getUser()} saved!` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

    public async logIn(req: Request, res: Response) {
        try {
            const { user, password } = req.body;
            if (!user || !password) return res.status(400).json({ msg: `No valid input!` });

            const admin = AdminConverter.jsonToAdmin(req);
            const resultado = await new GestionDeAdmin().iniciarSesion(admin, new PersistenciaDeAdmin());
            if (!resultado.getUser()) return res.status(404).json({ msg: `No valid input!` });

            const tokenCreated = AdminController.createToken(resultado);

            return res.status(200).cookie('jwt', tokenCreated, { expires: new Date(Date.now() + 900000), httpOnly: true }).send({ jwt: `${tokenCreated}` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }


    public async logOut(req: Request, res: Response, next: NextFunction) {
        try {
            req.logout(function (err) {
                if (err) { return next(err); }
                res.redirect('/');
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

    public async updateAdmin(req: Request, res: Response) {
        try {

            const adminToSearch = new Admin(req.params.user);
            const adminToUpdate = AdminConverter.jsonToAdmin(req);
            const resultado = await new GestionDeAdmin().actualizarCuenta(adminToSearch, adminToUpdate, new PersistenciaDeAdmin());
            if (!resultado.getUser()) return res.status(404).json({ msg: `${adminToSearch.getUser()} was not found!` });
            return res.status(200).json({ msg: `${resultado.getUser()} updated!` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

    public async deleteAdmin(req: Request, res: Response) {
        try {

            const adminToDelete = new Admin(req.params.user);
            const resultado = await new GestionDeAdmin().eliminarCuenta(adminToDelete, new PersistenciaDeAdmin());
            if (!resultado.getUser()) return res.status(404).json({ msg: `${adminToDelete.getUser()} was not found!` });
            return res.status(200).json({ msg: `${resultado.getUser()} deleted!` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

    public async getAllTransactions(req: Request, res: Response) {
        try {

            const resultado = await new GestionDeTransacciones().listarTodasLasTransacciones(new PersistenciaDeTransacciones());
            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: `Server internal error!` });
        }
    }

}