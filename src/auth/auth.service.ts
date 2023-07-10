import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthDto> {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException();
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
