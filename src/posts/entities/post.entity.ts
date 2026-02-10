export class Post {
    id: string;
    userId: string;
    content: string;
    hashtags?: string[];
    imageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<Post>) {
        Object.assign(this, partial);
    }
}
