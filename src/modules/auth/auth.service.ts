import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from 'src/repositories/user.repository';
import { AuthCredentialsDto } from 'src/models/users/dto/auth-credentials.dto';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    async signUpUser(authCredentialsDto:AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUpUser(authCredentialsDto);
    }
}
