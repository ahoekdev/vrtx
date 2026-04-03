import {
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';

type ValidationFieldErrors = Record<string, string[]>;

function collectValidationFieldErrors(
  errors: ValidationError[],
  parentPath = '',
  fieldErrors: ValidationFieldErrors = {},
): ValidationFieldErrors {
  for (const error of errors) {
    const field = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    if (error.constraints) {
      fieldErrors[field] = Object.values(error.constraints);
    }

    if (error.children?.length) {
      collectValidationFieldErrors(error.children, field, fieldErrors);
    }
  }

  return fieldErrors;
}

@Injectable()
export class RequestValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException({
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          fieldErrors: collectValidationFieldErrors(errors),
        }),
    });
  }
}
