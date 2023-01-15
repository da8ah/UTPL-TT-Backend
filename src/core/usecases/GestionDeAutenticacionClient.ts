import Client from "../entities/Client";
import User from "../entities/User";
import IPersistenciaCuenta from "../ports/persistencia/IPersistenciaCuenta";
import IGestionDeAutenticacion from "./IGestionDeAutenticacion";

export default class GestionDeAutenticacionClient implements IGestionDeAutenticacion {

    public async crearCuenta(client: Client, iPersistenciaCuenta: IPersistenciaCuenta): Promise<User> {
        // La comprobación de usuarios repetidos se lo hace en una sola función
        // Para evitar traer más datos de los necesarios a diferencia de los Books
        return iPersistenciaCuenta.guardarCuentaNueva(client);
    }

    public async iniciarSesion(client: Client, iPersistenciaCuenta: IPersistenciaCuenta): Promise<User> {
        return iPersistenciaCuenta.buscarCuenta(client);
    }

    public async cerrarSesion(client: Client): Promise<boolean> {
        throw Error("Not implemented!");
    }

}