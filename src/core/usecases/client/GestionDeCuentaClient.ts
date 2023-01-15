import BillingInfo from "../../entities/BillingInfo";
import Card from "../../entities/Card";
import Client from "../../entities/Client";
import Transaction from "../../entities/Transaction";
import User from "../../entities/User";
import IPersistenciaCuenta from "../../ports/persistencia/IPersistenciaCuenta";
import IGestionDeCuentas from "../IGestionDeAutenticacion";

export default class GestionDeCuentaClient implements IGestionDeCuentas {
    public crearCuenta(client: Client, billingInfo: BillingInfo, cards: Card[], transactions: Transaction[]) {
        client.setBillingInfo(billingInfo);
        client.setCards(cards);
        client.setTransactions(transactions);
        return client;
    }

    public crearCuentaNueva(client: Client, iPersistenciaCuenta: IPersistenciaCuenta) {
        return iPersistenciaCuenta.guardarCuentaNueva(client);
    }

    iniciarSesion(client: Client, iPersistenciaCuenta: IPersistenciaCuenta): User {
        return iPersistenciaCuenta.buscarCuenta(client);
    }
    cerrarSesion(user: User): boolean {
        throw new Error("Method not implemented.");
    }
}