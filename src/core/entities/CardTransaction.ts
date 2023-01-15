import Transaction from "./Transaction";

export default class CardTransaction extends Transaction {
    private ownerName: string | undefined = undefined;
    private cardNumber: string | undefined = undefined;
    private expiryDate: string | undefined = undefined;

    constructor(
        id?: string,
        date?: string,
        payment?: number,
        change?: number,
        ownerName?: string,
        cardNumber?: string,
        expiryDate?: string
    ) { super(id, date, payment, change); }

    public getOwnerName(): string | undefined {
        return this.ownerName;
    }
    public setOwnerName(value: string) {
        this.ownerName = value;
    }

    public getCardNumber(): string | undefined {
        return this.cardNumber;
    }
    public setCardNumber(value: string) {
        this.cardNumber = value;
    }

    public getExpiryDate(): string | undefined {
        return this.expiryDate;
    }
    public setExpiryDate(value: string) {
        this.expiryDate = value;
    }
}