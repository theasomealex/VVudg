export class User {
    constructor(
        public username: string,
        public code: string,
        public plate: string,
        public phone: string,
        public career: string,
        public mail: string,
        public password: string,
        public status: string = 'Activo',
        public _id: string,
    ) { }
}