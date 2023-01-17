import Admin from "../../../core/entities/Admin";
import IPersistenciaCuenta from "../../../core/ports/persistencia/IPersistenciaCuenta";
import { AdminConverter } from "../../app/utils";
import AdminModel, { IAdminModel } from "../models/AdminModel";


export default class PersistenciaDeAdmin implements IPersistenciaCuenta {

    public async buscarCuenta(admin: Admin): Promise<Admin> {
        try {

            let adminFound: IAdminModel | null = null;
            adminFound = await AdminModel.findOne({ user: admin.getUser() });
            return (!adminFound) ? new Admin() : AdminConverter.modelToAdmin(adminFound);

        } catch (error) {
            console.error(error);
            return new Admin();
        }
    }

    public async guardarCuentaNueva(admin: Admin): Promise<Admin> {
        try {

            const newAdminModel: IAdminModel = AdminConverter.adminToModel(admin);
            let savedAdmin: IAdminModel = await newAdminModel.save();
            return (!savedAdmin) ? new Admin() : AdminConverter.modelToAdmin(savedAdmin);

        } catch (error) {
            console.error(error);
            return new Admin();
        }
    }

    public async actualizarCuenta(adminToSearch: Admin, adminToUpdate: Admin): Promise<Admin> {
        try {

            let adminUpdated: IAdminModel | null = null;
            adminUpdated = await AdminModel.findOneAndUpdate(
                { user: adminToSearch.getUser() },
                AdminConverter.adminToJSON(adminToUpdate),
                { new: true }
            );
            return (!adminUpdated) ? new Admin() : AdminConverter.modelToAdmin(adminUpdated);

        } catch (error) {
            console.error(error);
            return new Admin();
        }
    }

    public async eliminarCuenta(admin: Admin): Promise<Admin> {
        try {

            let adminDeleted: IAdminModel | null = null;
            adminDeleted = await AdminModel.findOneAndDelete({ user: admin.getUser() });
            return (!adminDeleted) ? new Admin() : AdminConverter.modelToAdmin(adminDeleted);

        } catch (error) {
            console.error(error);
            return new Admin();
        }
    }

}