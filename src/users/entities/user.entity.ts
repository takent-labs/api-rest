import { Exclude } from "class-transformer";

export class User {
    id: string;
    email: string;
    username: string;
    @Exclude()
    password?: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
