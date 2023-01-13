import User from "../../entities/User";

export default interface IPersistenciaCuenta {
    buscarCuenta(user: User): User;
    guardarCuentaNueva(user: User): boolean;
    actualizarCuenta(user: User): boolean;
    eliminarCuenta(user: User): boolean;
}