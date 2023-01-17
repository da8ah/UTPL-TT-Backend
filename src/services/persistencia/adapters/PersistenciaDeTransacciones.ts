// import CardTransaction from "../../../core/entities/CardTransaction";
// import Client from "../../../core/entities/Client";
// import IPersistenciaTransacciones from "../../../core/ports/persistencia/IPersistenciaTransacciones";
// import { TransactionConverter } from "../../app/utils";
// import CardTransactionModel, { ICardTransactionModel } from "../models/CardTransactionModel";

// export default class PersistenciaDeTransacciones implements IPersistenciaTransacciones {

//     public async guardarNuevaTransaccion(client: Client, cardTransaction: CardTransaction): Promise<CardTransaction> {
//         try {

//             const newTransaction: ICardTransactionModel = TransactionConverter.cardTransactionToModel(cardTransaction);
//             let savedTransaction: ICardTransactionModel = await newTransaction.save();
//             return (!savedTransaction) ? new CardTransaction() : TransactionConverter.modelToCardTransaction(savedTransaction);

//         } catch (error) {
//             console.error(error);
//             return new CardTransaction();
//         }
//     }

//     public async obtenerTransacciones(client: Client): Promise<CardTransaction[]> {
//         try {

//             let transactions: CardTransaction[] = [];
//             let transactionIDs = client.getTransactions();
//             if (transactionIDs && transactionIDs.length > 0) {
//                 for (const id in transactionIDs) {
//                     let transactionFound = await CardTransactionModel.findOne({ id });
//                     if (transactionFound) transactions.push(TransactionConverter.jsonToCardTransaction(transactionFound));
//                 }
//             }
//             return (!transactions) ? [] : transactions;

//         } catch (error) {
//             console.error(error);
//             return [];
//         }
//     }

// }