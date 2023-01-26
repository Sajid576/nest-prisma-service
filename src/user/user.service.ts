import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import * as EmailValidator from 'email-validator';
import { LoginUserDto } from './dto/user.login.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as sgMail from '@sendgrid/mail';
import { createToken } from 'src/utils/jwt.service';
import { Role } from 'src/common/roles';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { generateHashedData } from 'src/utils';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async validateLogin(email: string, password: string, role: Role) {
    const userFromDb = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!userFromDb) {
      throw {
        name: 'notFound',
        message: 'User does not exist',
      };
    }

    if (!userFromDb.roles.includes(role)) {
      throw {
        name: 'notFound',
        message: 'User does not exist',
      };
    }

    const isValidPass = await bcrypt.compare(password, userFromDb.password);
    if (!isValidPass) {
      throw {
        name: 'unauthorized',
        message: 'Password not matched',
      };
    } else {
      const accessToken = createToken(email, userFromDb.roles);
      return { token: accessToken, user: userFromDb };
    }
  }

  async registerUser(payload: CreateUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: payload.email },
      });
      console.log('LOL', user);
      if (user) {
        return {
          success: false,
          data: {
            message: 'Email already exist',
          },
        };
      }
      if (!EmailValidator.validate(payload.email)) {
        return {
          success: false,
          data: {
            message: 'Invalid email',
          },
        };
      }
      const hashedPassword = await generateHashedData(payload.password);
      const result = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
        },
      });

      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        data: error,
        message: 'Something went wrong!',
        name: 'badRequest',
      };
    }
  }

  async login(payload: LoginUserDto, role: Role) {
    try {
      if (!EmailValidator.validate(payload.email)) {
        throw {
          name: 'badRequest',
          message: 'Invalid email',
        };
      }
      const result = await this.validateLogin(
        payload.email,
        payload.password,
        role,
      );
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }
}
