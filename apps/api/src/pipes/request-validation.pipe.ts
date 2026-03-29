import {
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';

type ValidationIssue = {
  field: string;
  messages: string[];
};

function collectValidationIssues(
  errors: ValidationError[],
  parentPath?: string,
): ValidationIssue[] {
  return errors.flatMap((error) => {
    const field = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    const issues: ValidationIssue[] = [];

    if (error.constraints) {
      issues.push({
        field,
        messages: Object.values(error.constraints),
      });
    }

    if (error.children?.length) {
      issues.push(...collectValidationIssues(error.children, field));
    }

    return issues;
  });
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
          message: 'Validation failed',
          errors: collectValidationIssues(errors),
        }),
    });
  }
}
