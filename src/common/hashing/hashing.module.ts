import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service.js';

@Module({
    exports: [HashingService],
    providers: [HashingService]
})
export class HashingModule { }
