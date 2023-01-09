export default abstract class Transaction {
    private id: string;
    private date: string;
    private payment: number;
    private change: number;
    private cart: Cart = new Cart();

    constructor(id: string, date: string, payment: number, change: number) {
        this.id = id;
        this.date = date;
        this.payment = payment;
        this.change = change;
    }

    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }

    public getDate(): string {
        return this.date;
    }
    public setDate(value: string) {
        this.date = value;
    }

    public getPayment(): number {
        return this.payment;
    }
    public setPayment(value: number) {
        this.payment = value;
    }

    public getChange(): number {
        return this.change;
    }
    public setChange(value: number) {
        this.change = value;
    }

    public getCart(): Cart {
        return this.cart;
    }
    public setCart(value: Cart) {
        this.cart = value;
    }
}