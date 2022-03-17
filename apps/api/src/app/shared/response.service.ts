import { Injectable } from '@nestjs/common';

export type ResponseData<T> = {
  data: T;
}

@Injectable()
export class ResponseService {
  async createResponse<T>(input: Promise<T>): Promise<ResponseData<T>> {
    const data: T = await input;
    return { data };
  }
}
