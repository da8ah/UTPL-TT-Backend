import BillingInfo from "../../../core/entities/BillingInfo";
import Client from "../../../core/entities/Client";
import IPersistenciaCuenta from "../../../core/ports/persistencia/IPersistenciaCuenta";
import { ClientConverter } from "../../app/utils";
import ClientModel, { IClientModel } from "../models/ClientModel";

export default class PersistenciaDeCuentas implements IPersistenciaCuenta {
	public async buscarCuenta(client: Client): Promise<Client> {
		try {
			let clientFound: IClientModel | null = null;
			clientFound = await ClientModel.findOne({ user: client.getUser() });
			return !clientFound ? new Client() : ClientConverter.modelToClient(clientFound);
		} catch (error) {
			console.error(error);
			return new Client();
		}
	}

	public async guardarCuentaNueva(client: Client): Promise<Client> {
		try {
			const newClientModel: IClientModel = ClientConverter.clientToModel(client);
			let savedClient: IClientModel = await newClientModel.save();
			return !savedClient ? new Client() : ClientConverter.modelToClient(savedClient);
		} catch (error) {
			console.error(error);
			return new Client();
		}
	}

	public async actualizarCuenta(clientToSearch: Client, clientToUpdate: Client): Promise<Client> {
		try {
			let clientUpdated: IClientModel | null = null;
			const client = ClientConverter.clientToJSON(clientToUpdate);
			const billingInfo = ClientConverter.billingInfoToJSON(clientToUpdate.getBillingInfo() || new BillingInfo());
			let update = "{ ";
			Object.entries(client).forEach(([key, value]) => {
				update += `"${key}" : "${value}", `;
			});
			Object.entries(billingInfo).forEach(([key, value]) => {
				update += `"billingInfo.${key}" : "${value}", `;
			});
			update = `${update.substring(0, update.length - 2)} }`;
			clientUpdated = await ClientModel.findOneAndUpdate(
				{ user: clientToSearch.getUser() },
				{ $set: JSON.parse(update) },
				{
					new: true,
				},
			);
			return !clientUpdated ? new Client() : ClientConverter.modelToClient(clientUpdated);
		} catch (error) {
			console.error(error);
			return new Client();
		}
	}

	public async eliminarCuenta(client: Client): Promise<Client> {
		try {
			let clientDeleted: IClientModel | null = null;
			clientDeleted = await ClientModel.findOneAndDelete({ user: client.getUser() });
			return !clientDeleted ? new Client() : ClientConverter.modelToClient(clientDeleted);
		} catch (error) {
			console.error(error);
			return new Client();
		}
	}
}
