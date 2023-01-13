import User from "../entities/User";
import IPersistenciaCuenta from "../ports/persistencia/IPersistenciaCuenta";

export default interface IGestionDeCuentas {
    crearCuentaNueva(user: User, iPersistenciaCuenta: IPersistenciaCuenta): boolean;
    iniciarSesion(user: User, iPersistenciaCuenta: IPersistenciaCuenta): User;
    cerrarSesion(user: User): boolean;
}