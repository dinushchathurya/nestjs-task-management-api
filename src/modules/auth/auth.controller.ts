import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDto } from 'src/models/users/dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService) {}

    @Post('/signup')
    signUpUser(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto): Promise<void> {
        return this.authService.signUpUser(authCredentialsDto);
    }
}
