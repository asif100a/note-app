export interface IAddress {
    city: string;
    street: string;
    zip: number;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN";
    age: number;
    address: IAddress;
}

export interface UserInstanceMethod {
    hashPassword(password: string): string;
}