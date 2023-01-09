export default class Card {
    private ownerName: string;
    private cardNumber: string;
    private code: string;
    private expiryDate: string;

    constructor(ownerName: string, cardNumber: string, code: string, expiryDate: string) {
        this.ownerName = ownerName;
        this.cardNumber = cardNumber;
        this.code = code;
        this.expiryDate = expiryDate;
    }
}