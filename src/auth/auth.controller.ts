import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO, userLoginDTO } from './DTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signUp(@Body() dto: UserDTO) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn(@Body() dto: userLoginDTO) {
    return this.authService.signIn(dto);
  }
}
