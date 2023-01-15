import CardTransaction from "../../../core/entities/CardTransaction";
import Client from "../../../core/entities/Client";
import User from "../../../core/entities/User";
import IPersistenciaCuenta from "../../../core/ports/persistencia/IPersistenciaCuenta";
import { ClientConverter, TransactionConverter } from "../../app/utils";
import CardTransactionModel from "../models/CardTransactionModel";
import ClientModel, { IClientModel } from "../models/ClientModel";

export default class PersistenciaDeCuentas implements IPersistenciaCuenta {

    public async buscarCuenta(client: Client): Promise<User> {
        try {

            let clientFound: IClientModel | null = null;
            clientFound = await ClientModel.findOne({ user: client.getUser() });
            let clientToReturn: Client;
            if (clientFound) {
                clientToReturn = ClientConverter.modelToClient(clientFound);
                let transactions: CardTransaction[] = [];
                if (clientFound.transactions && clientFound.transactions.length > 0) {
                    // TODO: Error: Cannot overwrite `Client` model once compiled.
                    // Revisar implementar la Persistencia de Transacciones para obtener la data
                    // clientFound.transactions.forEach(async (id) => {
                    //     let transactionFound = await CardTransactionModel.findOne({ id });
                    //     if (transactionFound) transactions.push(TransactionConverter.jsonToCardTransaction(transactionFound));
                    // });

                    // if (transactions.length > 0) clientToReturn.setTransactions(transactions);
                }
                return clientToReturn;
            }

            return new Client();

        } catch (error) {
            console.error(error);
            return new Client();
        }
    }

    public async guardarCuentaNueva(client: Client): Promise<Client> {
        try {

            let clientFound: IClientModel | null = null;
            clientFound = await ClientModel.findOne({ user: client.getUser() });
            if (clientFound) return client;

            const newClientModel: IClientModel = ClientConverter.clientToModel(client);
            let savedClient: IClientModel = await newClientModel.save();
            return (!savedClient) ? new Client() : ClientConverter.modelToClient(savedClient);

        } catch (error) {
            console.error(error);
            return new Client();
        }
    }

    public async actualizarCuenta(clientToSearch: Client, clientToUpdate: Client): Promise<Client> {
        try {

            let clientUpdated: IClientModel | null = null;
            clientUpdated = await ClientModel.findOneAndUpdate(
                { user: clientToSearch.getUser() },
                ClientConverter.clientToJSON(clientToUpdate),
                { new: true }
            );
            return (!clientUpdated) ? new Client() : ClientConverter.modelToClient(clientUpdated);

        } catch (error) {
            console.error(error);
            return new Client();
        }
    }

    public async eliminarCuenta(client: Client): Promise<Client> {
        try {

            let clientDeleted: IClientModel | null = null;
            clientDeleted = await ClientModel.findOneAndDelete({ user: client.getUser() });
            return (!clientDeleted) ? new Client() : ClientConverter.modelToClient(clientDeleted);

        } catch (error) {
            console.error(error);
            return new Client();
        }
    }

}