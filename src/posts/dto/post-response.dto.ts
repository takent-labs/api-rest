export class PostResponseDto {
    user: AuthorDto;
    id: string;
    userId: string;
    content: string;
    imageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

class AuthorDto {
    username: string;
    imageUrl: string | null;
}