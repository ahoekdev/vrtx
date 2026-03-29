import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { users } from '../database/schemas/users.schema';

const publicUserFields = {
  id: users.id,
  email: users.email,
  role: users.role,
  isConfirmed: users.isConfirmed,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db.select(publicUserFields).from(users);
  }

  async create(email: string) {
    const [user] = await this.databaseService.db
      .insert(users)
      .values({ email })
      .returning(publicUserFields);

    return user;
  }
}
