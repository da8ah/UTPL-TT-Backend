export default class BillingInfo {
    private toWhom: string;
    private ci: string;
    private provincia: string;
    private ciudad: string;
    private numCasa: string;
    private calles: string;

    constructor(
        toWhom: string = "",
        ci: string = "",
        provincia: string = "",
        ciudad: string = "",
        numCasa: string = "",
        calles: string = ""
    ) {
        this.toWhom = toWhom;
        this.ci = ci;
        this.provincia = provincia;
        this.ciudad = ciudad;
        this.numCasa = numCasa;
        this.calles = calles;
    }
}