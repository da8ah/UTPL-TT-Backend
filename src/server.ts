import app from "./services/app/app";
import DBConn from "./services/persistencia/adapters/DBConn";

import Client from "./core/entities/Client";
import ToBuyBook from "./core/entities/ToBuyBook";
import {
	BookConverter,
	TransactionConverter,
	InputValidator,
} from "./services/app/utils";
import CardTransactionModel from "./services/persistencia/models/CardTransactionModel";
import Card from "./core/entities/Card";
import CardTransaction from "./core/entities/CardTransaction";
import Cart from "./core/entities/Cart";
import StockBook from "./core/entities/StockBook";
import Admin from "./core/entities/Admin";
import BillingInfo from "./core/entities/BillingInfo";
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

// const stockBook = new StockBook(
// 	"9780141988511",
// 	"https://azure.blob.url.jpg",
// 	"12 Rules for Life: An Antidote to Chaos",
// 	"",
// 	"16/01/2018",
// 	25,
// 	true,
// 	25,
// 	false,
// 	"10/01/2023",
// 	"JBP's BestSeller",
// 	100,
// 	true,
// 	true,
// 	true,
// 	false,
// );

// const badStockBook = new StockBook(
// 	"1tfjaweoy23",
// 	"ljsad9",
// 	"csadk lkdalkj csd casd 12 21,asd;",
// 	"sdakjdsa 21kjasd ",
// 	"sadas",
// 	90.0909391,
// 	true,
// 	925.9,
// 	false,
// 	"01/2023",
// 	"JBP's BestSeller",
// 	100.0,
// 	true,
// 	true,
// 	true,
// 	false,
// );

// console.log(UserInputValidator.validateNewStockBook(stockBook));
// console.log(UserInputValidator.validateNewStockBook(badStockBook));
// console.log(UserInputValidator.validateNewStockBook(new StockBook()));

// const admin = new Admin(
// 	"tiber",
// 	"da8ah",
// 	"tiber@email.com",
// 	"+593000000001",
// 	"tiber",
// );
// const client = new Client(
// 	"tiber_nunca_muere12",
// 	"Danilo Ochoa",
// 	"tiber@email.com",
// 	"+593 1000000001",
// 	"'6Hp2\"'Z8jGau&!w",
// );
// console.log(InputValidator.validateUser(admin));
// console.log(InputValidator.validateUser(client));
// const bi = new BillingInfo(
// 	"tiber",
// 	"1000000001",
// 	"Loja",
// 	"Loja",
// 	"000",
// 	"Principal y Secundaria",
// );
// const bi2 = new BillingInfo(
// 	"tiber nunca muere",
// 	"1000000001",
// 	"Loja",
// 	"Loja",
// 	"000",
// 	"Principal y Secundaria",
// );

// console.log(InputValidator.validateBillingInfo(bi));
// console.log(InputValidator.validateBillingInfo(bi2));

DBConn.getInstance();

const port = app.get("port");

const server = app.listen(port, () => {
	console.log("Server on port", port);
});

export default server;
