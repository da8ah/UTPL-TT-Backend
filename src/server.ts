import app from './services/app/app';
import DBConn from './services/persistencia/adapters/DBConn';

import Client from "./core/entities/Client";
import ToBuyBook from "./core/entities/ToBuyBook";
import { TransactionConverter } from "./services/app/utils";
import CardTransactionModel from "./services/persistencia/models/CardTransactionModel";
import Card from './core/entities/Card';
import CardTransaction from './core/entities/CardTransaction';
import Cart from './core/entities/Cart';
// const client = new Client(
//     "tiber",
//     "da8ah",
//     "email.com",
//     "+593000000001",
//     "tiber"
// );
// const card = new Card(
//     "Danilo Ochoa Hidalgo",
//     "1234567890101",
//     "12/23"
// );
// const books = [
//     new ToBuyBook(
//         "9780141988511",
//         "https://azure.blob.url",
//         "12 Rules for Life: An Antidote to Chaos",
//         "Peterson, Jordan B.",
//         "16/01/2018",
//         25,
//         false,
//         0,
//         false,
//         1
//     ),
//     new ToBuyBook(
//         "9780141988512",
//         "https://azure.blob.url",
//         "12 More Rules for Life: Chaos",
//         "Peterson, Jordan B.",
//         "16/01/2020",
//         25,
//         true,
//         10,
//         true,
//         2
//     )
// ];
// const model = new CardTransactionModel(
//     {
//         id: undefined,
//         date: new Date().toLocaleDateString(),
//         payment: 25,
//         change: 0,
//         card: {
//             ownerName: "Danilo Ochoa Hidalgo",
//             cardNumber: "1234567890101",
//             expiryDate: "12/23"
//         },
//         client: {
//             user: client.getUser(),
//             name: client.getName(),
//             email: client.getEmail(),
//             mobile: client.getMobile()
//         },
//         booksAcquired: books
//     }
// );


// const cardTransaction = new CardTransaction(
//     undefined,
//     new Date().toLocaleDateString(),
//     25,
//     0,
//     new Cart(
//         undefined,
//         undefined,
//         undefined,
//         undefined,
//         books
//     )
// );
// client.setCards([card]);
// client.setTransactions([cardTransaction]);
// // const card = TransactionConverter.modelToCardTransaction(model);
// // TransactionConverter.cardTransactionToModel(card);
// // console.log(model);
// // console.log(card);
// const str = JSON.stringify({ body: client });
// const json = JSON.parse(str);
// // const book = newJson.transactions[0].cart.toBuyBooks[0];
// // const newBook: ToBuyBook = Object.assign(new ToBuyBook, book);
// const book = TransactionConverter.jsonToCardTransaction(json);
// const tra = book.getTransactions();
// if (tra != undefined) console.log(tra[0].getCart()?.getToBuyBooks());



DBConn.getInstance();

const port = app.get('port')

const server = app.listen(port, () => {
    console.log('Server on port', port);
});

export default server;