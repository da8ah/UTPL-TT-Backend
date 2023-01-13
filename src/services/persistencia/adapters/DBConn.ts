import mongoose from 'mongoose';
import config from '../../config/config';

export default class DBConn {

    private static DBConn: any;
    private db: any;

    private constructor() { }

    public static getInstance() {
        if (!this.DBConn) this.DBConn = new DBConn().init();
        return this.DBConn;
    }

    private async init() {
        try {
            mongoose.set('strictQuery', true);
            this.db = await mongoose.connect(`${config.MONGO_URI}`);
            console.log(`Database connected to ${this.db.connection.name.toUpperCase()}`);
        } catch (error) {
            console.error(error);
        }
    }

    public close() {
        try {
            this.db.connection.close();
        } catch (error) {
            console.error(error);
        }
    }
}