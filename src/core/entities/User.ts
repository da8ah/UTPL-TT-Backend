export default abstract class User {
    private user: string;
    private name: string;
    private email: string;
    private mobile: string;
    private password: string;

    constructor(user: string, name: string, email: string, mobile: string, password: string) {
        this.user = user;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
    }

    public getUser(): string {
        return this.user;
    }
    public setUser(value: string) {
        this.user = value;
    }

    public getName(): string {
        return this.name;
    }
    public setName(value: string) {
        this.name = value;
    }

    public getEmail(): string {
        return this.email;
    }
    public setEmail(value: string) {
        this.email = value;
    }

    public getMobile(): string {
        return this.mobile;
    }
    public setMobile(value: string) {
        this.mobile = value;
    }

    public getPassword(): string {
        return this.password;
    }
    public setPassword(value: string) {
        this.password = value;
    }
}