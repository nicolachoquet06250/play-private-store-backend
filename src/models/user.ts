//@ts-ignore problçme de l'ide
import { Repos } from './repos.ts';

export interface IUser {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    "repo_pseudo": Record<Repos, string>,
    password: string,
    "followed_apps": Array<number>
}

export class User implements IUser {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public email: string,
        public repo_pseudo: Record<Repos, string>,
        public password: string,
        public followed_apps: Array<number> = []
    ) {}

    static getAll(): Array<IUser> {
        return [
            new User(0, 'Nicolas', 'Choquet', 'nchoquet@norsys.fr', {
                github: 'nicolachoquet06250',
                gitlab: 'nicolachoquet06250'
            }, 'nchoquet', [1]),
            new User(0, 'Jonhatan', 'Boyer', 'jboyer@norsys.fr', {
                github: 'grafikart',
                gitlab: ''
            }, 'grafikart', [1])
        ];
    }

    static getFromEmailAndPassword(email: string, password: string): IUser|null {
        return this.getAll().reduce((r: IUser|null, c: IUser) => 
            c.email === email && c.password === password ? c : r, null);
    }
}