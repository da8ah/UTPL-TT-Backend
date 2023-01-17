import BillingInfo from "../../entities/BillingInfo";
import Card from "../../entities/Card";
import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";
import User from "../../entities/User";
import IPersistenciaCuenta from "../../ports/persistencia/IPersistenciaCuenta";
import IGestionDeCuentas from "../IGestionDeAutenticacion";

export default class GestionDeCuentaClient implements IGestionDeCuentas {

    public async crearCuentaNueva(client: Client, billingInfo: BillingInfo, cards: Card[], transactions: Transaction[]) {
        client.setBillingInfo(billingInfo);
        client.setCards(cards);
        client.setTransactions(transactions);
        return client;
    }

    public async crearCuenta(client: Client, iPersistenciaCuenta: IPersistenciaCuenta): Promise<Client> {
        // return iPersistenciaCuenta.guardarCuentaNueva(client);

        throw new Error("Method not implemented.");
    }

    public async iniciarSesion(client: Client, iPersistenciaCuenta: IPersistenciaCuenta): Promise<Client> {
        // return iPersistenciaCuenta.buscarCuenta(client);
        throw new Error("Method not implemented.");
    }
    public async cerrarSesion(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}