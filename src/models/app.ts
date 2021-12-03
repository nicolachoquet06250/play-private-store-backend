//@ts-ignore problème de l'ide
import { Repos } from "./repos.ts";
//@ts-ignore problème de l'ide
import { Comment } from './comment.ts';

export interface IApp {
    id?: number;
    "repo_type": Repos;
    name: string;
    nameSlug: string;
    repoName: string;
    logo: string;
    version: string;
    versionSlug: string;
    description: string;
    stars: number;
    screenshots: Array<string>;
    permissions: Array<string>;
    categories: Array<string>;
    comments: Array<Comment>;
    author: number;
}

export class App implements IApp {
    constructor(
        public id: number,
        public repo_type: Repos,
        public name: string,
        public nameSlug: string,
        public repoName: string,
        public logo: string,
        public version: string,
        public versionSlug: string,
        public description: string,
        public stars: number,
        public author: number,
        public screenshots: Array<string> = [],
        public permissions: Array<string> = [],
        public categories: Array<string> = [],
        public comments: Array<Comment> = []
    ) {}

    static getAll() {
        return [
            new App(
                0, Repos.GITHUB, 'Budget Management 1', 
                'budget-management', 'budget-management-apk', 
                'https://thumbs.dreamstime.com/z/vecteur-d-ic%C3%B4ne-de-calcul-argent-budget-encaissant-le-logo-illustration-symbole-financier-paiement-152384739.jpg',
                '0.1.0', '0-1-0', `apks signés générés pour l'application budget-management`,
                3.5, 0, [], [], [
                    'budget',
                    'budgetaire',
                    'monnaitaire',
                    'argent'
                ], [
                    {
                        author: 1,
                        comment: 'Je suis très satisfait de cette application.',
                        note: 3.5,
                        date: '2021-11-24'
                    }
                ]
            ),
            new App(
                1, Repos.GITHUB, 'Budget Management 2', 
                'budget-management', 'budget-management-apk', 
                'https://thumbs.dreamstime.com/z/vecteur-d-ic%C3%B4ne-de-calcul-argent-budget-encaissant-le-logo-illustration-symbole-financier-paiement-152384739.jpg',
                '0.1.0', '0-1-0', `apks signés générés pour l'application budget-management`,
                4, 1, [], [], [
                    'budget',
                    'budgetaire',
                    'monnaitaire',
                    'argent'
                ], [
                    {
                        author: 1,
                        comment: 'Je suis très satisfait de cette application.',
                        note: 3.5,
                        date: '2021-11-24'
                    }
                ]
            ),
            new App(
                2, Repos.GITLAB, 'Budget Management 3', 
                'budget-management', 'budget-management-apk', 
                'https://thumbs.dreamstime.com/z/vecteur-d-ic%C3%B4ne-de-calcul-argent-budget-encaissant-le-logo-illustration-symbole-financier-paiement-152384739.jpg',
                '0.1.0', '0-1-0', `apks signés générés pour l'application budget-management`,
                2.5, 0, [], [], [
                    'budget',
                    'budgetaire',
                    'monnaitaire'
                ], [
                    {
                        author: 1,
                        comment: 'Je suis très satisfait de cette application.',
                        note: 3.5,
                        date: '2021-11-24'
                    }
                ]
            )
        ]
    }

    static getFromId(id: number): IApp|null {
        return this.getAll().reduce((r: IApp|null, c: IApp) => c.id === id ? c : r, null)
    }
}