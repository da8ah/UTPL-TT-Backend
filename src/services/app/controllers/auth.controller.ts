import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import BillingInfo from "../../../core/entities/BillingInfo";
import Client from "../../../core/entities/Client";
import GestionDeAutenticacionClient from "../../../core/usecases/GestionDeAutenticacionClient";
import config from "../../config/config";
import PersistenciaDeCuentas from "../../persistencia/adapters/PersistenciaDeCuentas";
import { ClientConverter, InputValidator } from "../utils";

export default class AuthController {
	private static createToken(client: Client) {
		if (config.jwtSecret) {
			return jwt.sign({ user: client.getUser(), email: client.getEmail() }, config.jwtSecret, { expiresIn: "7d" });
		}
	}

	public async signUp(req: Request, res: Response) {
		try {
			const { user, password } = req.body;
			if (!(user && password)) return res.status(400).json({ msg: "No valid input!" });

			const newClient = ClientConverter.jsonToClient(req);
			if (InputValidator.validateUser(newClient)) return res.status(400).json({ msg: "No valid input!" });
			if (newClient.getBillingInfo()?.getToWhom()) {
				if (InputValidator.validateBillingInfo(newClient.getBillingInfo() || new BillingInfo()))
					return res.status(400).json({ msg: "No valid input!" });
			}

			const resultado = await new GestionDeAutenticacionClient().crearCuenta(newClient, new PersistenciaDeCuentas());
			if (resultado === newClient) return res.status(303).json({ msg: `${newClient.getUser()} already exists!` });
			if (!resultado.getUser()) return res.status(400).json({ msg: `${newClient.getUser()} was not saved!` });
			return res.status(201).json({ msg: `${resultado.getUser()} saved!` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async logIn(req: Request, res: Response) {
		try {
			const { user, password } = req.body;
			if (!(user && password)) return res.status(400).json({ msg: "No valid input!" });

			const client = ClientConverter.jsonToClient(req);
			const resultado = await new GestionDeAutenticacionClient().iniciarSesion(client, new PersistenciaDeCuentas());
			if (!resultado.getUser()) return res.status(404).json({ msg: "No valid input!" });

			const tokenCreated = AuthController.createToken(resultado);

			return res
				.status(200)
				.cookie("jwt", tokenCreated, {
					expires: new Date(Date.now() + 900000),
					httpOnly: true,
				})
				.send({ jwt: `${tokenCreated}` });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}

	public async logOut(req: Request, res: Response, next: NextFunction) {
		try {
			req.logout(function (err) {
				if (err) {
					return next(err);
				}
				res.redirect("/");
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Server internal error!" });
		}
	}
}
