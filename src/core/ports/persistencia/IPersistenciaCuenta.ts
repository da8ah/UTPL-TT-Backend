import User from "../../entities/User";

export default interface IPersistenciaCuenta {
    guardarCuentaNueva(user: User): boolean;
    buscarCuenta(user: User): User;
    actualizarCuenta(user: User): boolean;
    eliminarCuenta(user: User): boolean;
}