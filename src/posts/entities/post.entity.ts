export class Post {
    id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<Post>) {
        Object.assign(this, partial);
    }
}
