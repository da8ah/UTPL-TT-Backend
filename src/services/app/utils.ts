import { Request } from "express";
import Admin from "../../core/entities/Admin";
import BillingInfo from "../../core/entities/BillingInfo";
import Card from "../../core/entities/Card";
import CardTransaction from "../../core/entities/CardTransaction";
import Client from "../../core/entities/Client";
import StockBook from "../../core/entities/StockBook";
import AdminModel, { IAdminModel } from "../persistencia/models/AdminModel";
import CardTransactionModel, { ICardTransactionModel } from "../persistencia/models/CardTransactionModel";
import ClientModel, { IBillingInfoModel, ICardModel, IClientModel } from "../persistencia/models/ClientModel";
import StockBookModel, { IStockBookModel } from "../persistencia/models/StockBookModel";

export class BookConverter {

    public static bookToJSON(stockBook: StockBook): JSON {
        let json: any = {};
        if (stockBook.getIsbn() != undefined) json["isbn"] = stockBook.getIsbn();
        if (stockBook.getImgRef() != undefined) json["imgRef"] = stockBook.getImgRef();
        if (stockBook.getTitle() != undefined) json["title"] = stockBook.getTitle();
        if (stockBook.getAuthor() != undefined) json["author"] = stockBook.getAuthor();
        if (stockBook.getReleaseDate() != undefined) json["releaseDate"] = stockBook.getReleaseDate();
        if (stockBook.getGrossPricePerUnit() != undefined) json["grossPricePerUnit"] = stockBook.getGrossPricePerUnit();
        if (stockBook.isInOffer() != undefined) json["inOffer"] = stockBook.isInOffer();
        if (stockBook.getDiscountPercentage() != undefined) json["discountPercentage"] = stockBook.getDiscountPercentage();
        if (stockBook.itHasIva() != undefined) json["hasIva"] = stockBook.itHasIva();
        if (stockBook.getIvaPercentage() != undefined) json["ivaPercentage"] = stockBook.getIvaPercentage();
        if (stockBook.getCreatedDate() != undefined) json["createdDate"] = stockBook.getCreatedDate();
        if (stockBook.getDescription() != undefined) json["description"] = stockBook.getDescription();
        if (stockBook.getStock() != undefined) json["stock"] = stockBook.getStock();
        if (stockBook.isVisible() != undefined) json["visible"] = stockBook.isVisible();
        if (stockBook.isRecommended() != undefined) json["recommended"] = stockBook.isRecommended();
        if (stockBook.isBestSeller() != undefined) json["bestSeller"] = stockBook.isBestSeller();
        if (stockBook.isRecent() != undefined) json["recent"] = stockBook.isRecent();
        return json;
    }

    public static jsonToBook(req: Request): StockBook {
        // All Attrs from body
        const {
            isbn,
            imgRef,
            title,
            author,
            releaseDate,
            grossPricePerUnit,
            inOffer,
            discountPercentage,
            hasIva,
            createdDate,
            description,
            stock,
            visible,
            recommended,
            bestSeller,
            recent
        } = req.body;

        // NewStockBook with all Attrs
        return new StockBook(
            isbn,
            imgRef,
            title,
            author,
            releaseDate,
            grossPricePerUnit,
            inOffer,
            discountPercentage,
            hasIva,
            createdDate,
            description,
            stock,
            visible,
            recommended,
            bestSeller,
            recent
        );
    }

    public static modelToBook(bookModel: IStockBookModel): StockBook {
        return new StockBook(
            bookModel.isbn,
            bookModel.imgRef,
            bookModel.title,
            bookModel.author,
            bookModel.releaseDate,
            bookModel.grossPricePerUnit,
            bookModel.inOffer,
            bookModel.discountPercentage,
            bookModel.hasIva,
            bookModel.createdDate,
            bookModel.description,
            bookModel.stock,
            bookModel.visible,
            bookModel.recommended,
            bookModel.bestSeller,
            bookModel.recent,
        );
    }

    public static bookToModel(stockBook: StockBook): IStockBookModel {
        return new StockBookModel(
            {
                isbn: stockBook.getIsbn(),
                imgRef: stockBook.getImgRef(),
                title: stockBook.getTitle(),
                author: stockBook.getAuthor(),
                releaseDate: stockBook.getReleaseDate(),
                grossPricePerUnit: stockBook.getGrossPricePerUnit(),
                inOffer: stockBook.isInOffer(),
                discountPercentage: stockBook.getDiscountPercentage(),
                hasIva: stockBook.itHasIva(),
                ivaPercentage: stockBook.getIvaPercentage(),
                createdDate: stockBook.getCreatedDate(),
                description: stockBook.getDescription(),
                stock: stockBook.getStock(),
                visible: stockBook.isVisible(),
                recommended: stockBook.isRecommended(),
                bestSeller: stockBook.isBestSeller(),
                recent: stockBook.isRecent()
            }
        );
    }

}

export class ClientConverter {

    private static billingInfoToJSON(billingInfo: BillingInfo): JSON {
        let json: any = {};
        if (billingInfo.getToWhom() != undefined) json["toWhom"] = billingInfo.getToWhom();
        if (billingInfo.getCi() != undefined) json["ci"] = billingInfo.getCi();
        if (billingInfo.getProvincia() != undefined) json["provincia"] = billingInfo.getProvincia();
        if (billingInfo.getCiudad() != undefined) json["ciudad"] = billingInfo.getCiudad();
        if (billingInfo.getNumCasa() != undefined) json["numCasa"] = billingInfo.getNumCasa();
        if (billingInfo.getCalles() != undefined) json["calles"] = billingInfo.getCalles();
        return json;
    }

    private static cardToJSON(card: Card): JSON {
        let json: any = {};
        if (card.getOwnerName() != undefined) json["ownerName"] = card.getOwnerName();
        if (card.getCardNumber() != undefined) json["cardNumber"] = card.getCardNumber();
        if (card.getCode() != undefined) json["code"] = card.getCode();
        if (card.getExpiryDate() != undefined) json["expiryDate"] = card.getExpiryDate();
        return json;
    }

    public static clientToJSON(client: Client): JSON {
        let json: any = {};
        if (client.getUser() != undefined) json["user"] = client.getUser();
        if (client.getName() != undefined) json["name"] = client.getName();
        if (client.getEmail() != undefined) json["email"] = client.getEmail();
        if (client.getMobile() != undefined) json["mobile"] = client.getMobile();
        if (client.getPassword() != undefined) json["password"] = client.getPassword();

        const billingInfo = client.getBillingInfo();
        if (billingInfo != undefined) json["BillingInfo"] = this.billingInfoToJSON(billingInfo);
        const cards = client.getCards();
        if (cards != undefined) json["cards"] = cards.map((card) => this.cardToJSON(card));
        const transactions = client.getTransactions();
        if (transactions != undefined) json["transactions"] = transactions.map(
            (transaction) => TransactionConverter.cardTransactionToJSON(transaction as CardTransaction));

        return json;
    }

    private static jsonToBillingInfo(iBillingInfo: IBillingInfoModel): BillingInfo {
        return new BillingInfo(
            iBillingInfo.toWhom,
            iBillingInfo.ci,
            iBillingInfo.provincia,
            iBillingInfo.ciudad,
            iBillingInfo.numCasa,
            iBillingInfo.calles
        );
    }

    private static jsonToCard(iCard: ICardModel): Card {
        return new Card(
            iCard.ownerName,
            iCard.cardNumber,
            iCard.code,
            iCard.expiryDate
        );
    }

    public static jsonToClient(req: Request): Client {
        const {
            user,
            name,
            email,
            mobile,
            password,
            billingInfo
        } = req.body;

        const client = new Client(
            user,
            name,
            email,
            mobile,
            password
        );

        if (billingInfo) client.setBillingInfo(this.jsonToBillingInfo(billingInfo));

        return client;
    }

    public static modelToClient(clientModel: IClientModel): Client {
        const client = new Client(
            clientModel.user,
            clientModel.name,
            clientModel.email,
            clientModel.mobile,
            clientModel.password
        );

        if (clientModel.billingInfo) client.setBillingInfo(this.jsonToBillingInfo(clientModel.billingInfo));
        if (clientModel.cards && clientModel.cards.length > 0) client.setCards(clientModel.cards.map((card) => this.jsonToCard(card)));

        return client;
    }

    public static clientToModel(client: Client): IClientModel {
        return new ClientModel(
            {
                user: client.getUser(),
                name: client.getName(),
                email: client.getEmail(),
                mobile: client.getMobile(),
                password: client.getPassword(),
                billingInfo: client.getBillingInfo(),
                cards: client.getCards(),
                transactions: client.getTransactions()
            }
        );
    }

}

export class TransactionConverter {

    static cardTransactionToJSON(cardTransaction: CardTransaction): JSON {
        let json: any = {};
        if (cardTransaction.getId() != undefined) json["id"] = cardTransaction.getId();
        if (cardTransaction.getDate() != undefined) json["date"] = cardTransaction.getDate();
        if (cardTransaction.getPayment() != undefined) json["payment"] = cardTransaction.getPayment();
        if (cardTransaction.getChange() != undefined) json["change"] = cardTransaction.getChange();
        if (cardTransaction.getCart() != undefined) json["cart"] = cardTransaction.getCart();
        if (cardTransaction.getOwnerName() != undefined) json["ownerName"] = cardTransaction.getOwnerName();
        if (cardTransaction.getCardNumber() != undefined) json["cardNumber"] = cardTransaction.getCardNumber();
        if (cardTransaction.getExpiryDate() != undefined) json["expiryDate"] = cardTransaction.getExpiryDate();
        return json;
    }

    public static jsonToCardTransaction(iCardTransactionModel: ICardTransactionModel): CardTransaction {
        return new CardTransaction(
            iCardTransactionModel.id,
            iCardTransactionModel.date,
            Number.parseFloat(iCardTransactionModel.payment),
            Number.parseFloat(iCardTransactionModel.change),
            iCardTransactionModel.ownerName,
            iCardTransactionModel.cardNumber,
            iCardTransactionModel.expiryDate,
        );
    }

    public static modelToCardTransaction(cardTransactionModel: ICardTransactionModel): CardTransaction {
        return new CardTransaction(
            cardTransactionModel.id,
            cardTransactionModel.date,
            Number.parseFloat(cardTransactionModel.payment),
            Number.parseFloat(cardTransactionModel.change),
            cardTransactionModel.ownerName,
            cardTransactionModel.cardNumber,
            cardTransactionModel.expiryDate
        );
    }

    public static cardTransactionToModel(cardTransaction: CardTransaction): ICardTransactionModel {
        return new CardTransactionModel(
            {
                id: cardTransaction.getId(),
                date: cardTransaction.getDate(),
                payment: cardTransaction.getPayment(),
                change: cardTransaction.getChange(),
                ownerName: cardTransaction.getOwnerName(),
                cardNumber: cardTransaction.getCardNumber(),
                expiryDate: cardTransaction.getExpiryDate()
            }
        );
    }

}

export class AdminConverter {

    public static adminToJSON(admin: Admin): JSON {
        let json: any = {};
        if (admin.getUser() != undefined) json["user"] = admin.getUser();
        if (admin.getName() != undefined) json["name"] = admin.getName();
        if (admin.getEmail() != undefined) json["email"] = admin.getEmail();
        if (admin.getMobile() != undefined) json["mobile"] = admin.getMobile();
        if (admin.getPassword() != undefined) json["password"] = admin.getPassword();
        return json;
    }

    public static jsonToAdmin(req: Request): Admin {
        const {
            user,
            name,
            email,
            mobile,
            password
        } = req.body;

        const admin = new Admin(
            user,
            name,
            email,
            mobile,
            password
        );

        return admin;
    }

    public static modelToAdmin(adminModel: IAdminModel): Admin {
        const admin = new Admin(
            adminModel.user,
            adminModel.name,
            adminModel.email,
            adminModel.mobile,
            adminModel.password
        );
        return admin;
    }

    public static adminToModel(admin: Admin): IAdminModel {
        return new AdminModel(
            {
                user: admin.getUser(),
                name: admin.getName(),
                email: admin.getEmail(),
                mobile: admin.getMobile(),
                password: admin.getPassword()
            }
        );
    }

}