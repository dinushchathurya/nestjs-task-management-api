import { EntityRepository, Repository } from "typeorm";

import { User } from "src/models/users/entities/user.entity";
import { AuthCredentialsDto } from "src/models/users/dto/auth-credentials.dto";
import { InternalServerErrorException, ConflictException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUpUser(authCredentialsDto:AuthCredentialsDto): Promise<void> {

        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.password = password;

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
}
