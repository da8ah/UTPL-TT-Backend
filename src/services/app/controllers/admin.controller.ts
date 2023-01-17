import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../../../core/entities/Admin';
import GestionDeAutenticacionAdmin from '../../../core/usecases/admin/GestionDeAutenticacionAdmin';
import config from '../../config/config';
import PersistenciaDeAdmin from '../../persistencia/adapters/PersistenciaDeAdmin';
import { AdminConverter } from '../utils';

export default class AdminController {

    private static createToken(admin: Admin) {
        if (config.jwtSecret) {
            return jwt.sign(
                { user: admin.getUser(), email: admin.getEmail() },
                config.jwtSecret,
                { expiresIn: '7d' }
            );
        }
    }

    public async signUp(req: Request, res: Response) {
        try {
            const { user, password } = req.body;
            if (!user || !password) return res.status(400).json({ msg: `No valid input!` });

            const newAdmin = AdminConverter.jsonToAdmin(req);
            const useCaseGestionDeAutenticacionAdmin = new GestionDeAutenticacionAdmin();
            const resultado = await useCaseGestionDeAutenticacionAdmin.crearCuenta(newAdmin, new PersistenciaDeAdmin());
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
            const useCaseGestionDeAutenticacionAdmin = new GestionDeAutenticacionAdmin();
            const resultado = await useCaseGestionDeAutenticacionAdmin.iniciarSesion(admin, new PersistenciaDeAdmin());
            if (!resultado.getUser()) return res.status(404).json({ msg: `No valid input!` });

            const tokenCreated = AdminController.createToken(resultado);

            return res.status(200).cookie('jwt', tokenCreated, { expires: new Date(Date.now() + 900000), httpOnly: true });

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

}