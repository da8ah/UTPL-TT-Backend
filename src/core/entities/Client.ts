import User from "./User";
import BillingInfo from "./BillingInfo";
import Card from "./Card";
import Transaction from "./Transaction";

export default class Client extends User {
    private billingInfo: BillingInfo = new BillingInfo();
    private cards: Card[] = [];
    private transactions: Transaction[] = [];

    constructor(user: string, name: string, email: string, mobile: string, password: string) {
        super(user, name, email, mobile, password);
    }

    public getBillingInfo(): BillingInfo {
        return this.billingInfo;
    }
    public setBillingInfo(value: BillingInfo) {
        this.billingInfo = value;
    }

    public getCards(): Card[] {
        return this.cards;
    }
    public setCards(value: Card[]) {
        this.cards = value;
    }

    public getTransactions(): Transaction[] {
        return this.transactions;
    }
    public setTransactions(value: Transaction[]) {
        this.transactions = value;
    }
}