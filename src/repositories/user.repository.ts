import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException, ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

import { User } from "src/models/users/entities/user.entity";
import { AuthCredentialsDto } from "src/models/users/dto/auth-credentials.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUpUser(authCredentialsDto:AuthCredentialsDto): Promise<void> {

        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashedPassword(password, user.salt);

        try {
            await user.save();
        } catch(error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashedPassword(password: string, salt: string): Promise<string> {
        return  bcrypt.hash(password, salt);
    }
}
