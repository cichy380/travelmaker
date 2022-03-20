import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

type BadRequestExceptionResponse = {
  statusCode: number,
  message: string[],
  error: string,
}

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as BadRequestExceptionResponse;

    response
      .status(status)
      .json({ ...exceptionResponse, details: this.detailsFromMessages(exceptionResponse.message), message: null});
  }

  private detailsFromMessages(messages: string[]) {
    return Object.fromEntries(
      messages.map(msg => explodeToFirstWordAndRest(msg))
    )
  }
}

function explodeToFirstWordAndRest(str: string): string[] {
  const firstWord = str.split(' ')[0];
  const indexOfSpace = str.indexOf(' ');
  const restOfText = str.substring(indexOfSpace + 1);
  return [firstWord, capitalizeFirstLetter(restOfText)];
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
