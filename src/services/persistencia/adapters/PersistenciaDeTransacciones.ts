import CardTransaction from "../../../core/entities/CardTransaction";
import Client from "../../../core/entities/Client";
import IPersistenciaTransacciones from "../../../core/ports/persistencia/IPersistenciaTransacciones";
import { TransactionConverter } from "../../app/utils";
import CardTransactionModel, { ICardTransactionModel } from "../models/CardTransactionModel";
import ClientModel from "../models/ClientModel";
import PersistenciaDeCuentas from "./PersistenciaDeCuentas";

export default class PersistenciaDeTransacciones implements IPersistenciaTransacciones {

    private async agregarTransaccionAlClient(client: Client, transactionToAdd: CardTransaction): Promise<Client> {
        try {

            if (client.getUser() != undefined && transactionToAdd != undefined) {
                let clientToReturn: Client | null = null;
                const clientToUpdate = new Client(); // Empty Client to Update Transactions only
                // Get all Transactions of the Client
                const clientWithAllTransactions = await this.obtenerTransacciones(client);
                const transactions = clientWithAllTransactions.getTransactions();
                // Add Transaction saved to Empty Client with all Transactions
                if (transactions != undefined && transactions.length > 0) {
                    transactions.push(transactionToAdd);
                    clientToUpdate.setTransactions(transactions);
                } else {
                    clientToUpdate.setTransactions([transactionToAdd]);
                }
                // Update Client with new Transaction added
                const transactionsUpdated = clientToUpdate.getTransactions();
                if (transactionsUpdated != undefined && transactionsUpdated.length > 0) {
                    clientToReturn = await new PersistenciaDeCuentas().actualizarCuenta(
                        client,
                        clientToUpdate
                    ) as Client;
                }
                if (clientToReturn) return clientToReturn;
            }
            return new Client();

        } catch (error) {
            console.error(error);
            return new Client();
        }
    }

    public async guardarNuevaTransaccion(client: Client): Promise<Client> {
        try {
            // Search Client
            const clientFound = await new PersistenciaDeCuentas().buscarCuenta(client);
            if (clientFound.getUser() != undefined) {
                // Save Transaction
                const newTransaction: ICardTransactionModel = TransactionConverter.cardTransactionToModel(client);
                let savedTransaction: ICardTransactionModel | null = null;
                savedTransaction = await newTransaction.save();
                const clientWithSavedTransaction = TransactionConverter.modelToCardTransaction(savedTransaction);
                const transactions = clientWithSavedTransaction.getTransactions(); // One transaction in [0]
                // Save relation Client-Transaction in Client
                if (transactions != undefined && transactions.length > 0) {
                    const transactionToAdd = transactions[0];
                    const clientToReturn = await this.agregarTransaccionAlClient(client, transactionToAdd as CardTransaction);
                    return (clientToReturn.getUser() != undefined) ? clientWithSavedTransaction : clientToReturn;
                }
            }
            return new Client();

        } catch (error) {
            console.error(error);
            return new Client();
        }
    }

    public async obtenerTransacciones(client: Client): Promise<Client> {
        try {
            // Search Transactions of the Client
            let transactionsToReturn: CardTransaction[] = [];
            const objectFound = await ClientModel.findOne({ user: client.getUser() }).select('transactions');
            if (objectFound != undefined) {
                const transactionsFound = objectFound.transactions;
                // Retrieve every single Transaction found
                for (const transaction of transactionsFound) {
                    const cardTransaction = await CardTransactionModel.findOne({ id: transaction.id });
                    if (cardTransaction != undefined) {
                        const clientReturned = TransactionConverter.modelToCardTransaction(cardTransaction);
                        const transactionReturned = clientReturned.getTransactions();
                        if (transactionReturned != undefined) transactionsToReturn.push(transactionReturned[0]);
                    }
                }
            }
            // Set Transactions found
            client.setTransactions(transactionsToReturn);
            const transactions = client.getTransactions();
            return (transactions != undefined && transactions.length > 0) ? client : new Client();

        } catch (error) {
            console.error(error);
            return new Client();
        }
    }

}