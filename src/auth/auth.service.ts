import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserDTO, userLoginDTO } from './DTO';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly prismaService: PrismaService,
    readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async signUp(dto: UserDTO) {
    try {
      const hashedPassword = await this.hashPassword(dto.password);
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          hash: hashedPassword,
        },
      });

      delete user.hash;
      return {
        message: 'User created successfully.',
        payload: user,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email Already exist');
        }
      }
      throw new InternalServerErrorException(
        'An Unexpected Error occured. Please try again later.',
      );
    }
  }

  async signIn(dto: userLoginDTO) {
    try {
      const userExist = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!userExist) throw new NotFoundException('User not found.');

      const passwordMatch = await bcrypt.compare(dto.password, userExist.hash);

      if (!passwordMatch)
        throw new ForbiddenException(
          'Access denied, Password does not match; try again later.',
        );
      const payload = { sub: userExist.id, email: userExist.email };
      const access_token = this.jwtService.sign(payload);

      return { access_token };
    } catch (error) {
      throw new InternalServerErrorException('Something happened try again');
    }
  }
}
