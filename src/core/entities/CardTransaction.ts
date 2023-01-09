import Transaction from "./Transaction";

export default class CardTransaction extends Transaction {
    private ownerName: string;
    private cardNumber: string;
    private expiryDate: string;

    constructor(
        id: string = "",
        date: string = "",
        payment: number = 0,
        change: number = 0,
        ownerName: string = "",
        cardNumber: string = "",
        expiryDate: string = ""
    ) {
        super(id, date, payment, change);
        this.ownerName = ownerName;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
    }

    public getOwnerName(): string {
        return this.ownerName;
    }
    public setOwnerName(value: string) {
        this.ownerName = value;
    }

    public getCardNumber(): string {
        return this.cardNumber;
    }
    public setCardNumber(value: string) {
        this.cardNumber = value;
    }

    public getExpiryDate(): string {
        return this.expiryDate;
    }
    public setExpiryDate(value: string) {
        this.expiryDate = value;
    }
}