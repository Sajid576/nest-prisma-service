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
import { BaseService } from 'src/common/query/base.service';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

@Injectable()
export class UserService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma, 'user');
    //this.prisma=prisma;
  }

  async validateLogin(email: string, password: string, role: Role) {
    const result = await super.read({ email: email });

    const user = result[0];

    if (!user) {
      throw {
        name: 'notFound',
        message: 'User does not exist',
      };
    }

    if (!user.roles.includes(role)) {
      throw {
        name: 'notFound',
        message: 'User does not exist',
      };
    }

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      throw {
        name: 'unauthorized',
        message: 'Password not matched',
      };
    } else {
      const accessToken = createToken(email, user.roles);
      return { token: accessToken, user };
    }
  }

  async registerAdmin(payload: CreateUserDto) {
    try {
      const result = await super.read({ email: payload.email });

      const user = result[0];

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

      const response = await this.prisma.$transaction(async (tx) => {
        const product = await super.create(
          { ...payload, password: hashedPassword, roles: [Role.Admin] },
          tx,
        );

        return product;
      });

      return { success: true, data: response };
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
