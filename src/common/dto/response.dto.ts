import { IResponse } from '../interfaces/response.interface';
import { HttpStatus } from '@nestjs/common';
export class ResponseError implements IResponse {
  success: boolean;
  message: string;
  data: any[];

  constructor(data: any, message: string) {
    this.success = false;
    this.message = data.message;
    this.data = data;

    console.warn(
      new Date().toString() +
        ' - [Response]: ' +
        message +
        '-' +
        data.message +
        (data ? ' - ' + JSON.stringify(data) : ''),
    );
  }
  getResponse() {
    const { name }: any = this.data;

    if (name === 'forbidden') {
      return {
        success: false,
        statusCode: HttpStatus.FORBIDDEN,
        message: this.message,
      };
    }

    if (name === 'badRequest') {
      return {
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: this.message,
      };
    }

    if (name === 'notFound') {
      return {
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: this.message,
      };
    }

    if (name === 'unauthorized') {
      return {
        success: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: this.message,
      };
    }

    return {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: this.message || 'Something went wrong. Please try again',
    };
  }
}

export class ResponseSuccess implements IResponse {
  success: boolean;
  message: string;
  data: any[];

  constructor(data: any, message: string, log = true) {
    this.success = true;
    this.message = message;
    this.data = data;

    if (log) {
      try {
        const offuscateRequest = JSON.parse(JSON.stringify(data));
        if (offuscateRequest && offuscateRequest.token)
          offuscateRequest.token = '*******';
        console.log(
          new Date().toString() +
            ' - [Response]: ' +
            JSON.stringify(offuscateRequest),
        );
      } catch (error) {
        console.log('Error', error);
      }
    }
  }

  getResponse() {
    return {
      statusCode: 200,
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}
