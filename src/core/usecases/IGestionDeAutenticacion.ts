import User from "../entities/User";
import IPersistenciaCuenta from "../ports/persistencia/IPersistenciaCuenta";

export default interface IGestionDeAutenticacion {
	crearCuenta(user: User, iPersistenciaCuenta: IPersistenciaCuenta): Promise<User>;
	iniciarSesion(user: User, iPersistenciaCuenta: IPersistenciaCuenta): Promise<User>;
}
