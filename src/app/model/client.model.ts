import { v4 as uuid} from 'uuid';

export class Client {
    id?: string;
    name?: string;
    cpf?: string;
    birthdayDate?: Date;
    email?: string;
    isDeleting?: boolean;
    state?: string;
    city?: string;

    static newClient(): Client {
        const client = new Client();
        client.id = uuid();
        return client;
    }
}