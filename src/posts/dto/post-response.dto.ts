export class PostResponseDto {
    user: AuthorDto;
    id: string;
    userId: string;
    content: string;
    hashtags?: string[];
    imageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

class AuthorDto {
    id: string;
    username: string;
    imageUrl: string | null;
}