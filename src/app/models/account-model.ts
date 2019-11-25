import {SavestateModel} from './savestate-model';
import {Storage} from '@ionic/storage';

export class AccountModel {


    public username: string;
    public email: string;
    public password: string;
    public savestate: SavestateModel;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.savestate = new SavestateModel();
    }

    public getUsername(): string {
        return this.username;
    }

    public setEmail(email) {
        this.email = email;
    }
    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getSavestate(): SavestateModel {
        return this.savestate;
    }
}
