import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
    private readonly salRounds = 10

    async hash(data: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.salRounds);
        return await bcrypt.hash(data, salt);
    }

    async compare(data: string, hash: string): Promise<Boolean> {
        return await bcrypt.compare(data, hash);
    }
}
