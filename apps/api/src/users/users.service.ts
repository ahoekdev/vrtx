import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { users } from '../database/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.db.select().from(users);
  }

  async create(email: string) {
    const [user] = await this.databaseService.db
      .insert(users)
      .values({ email })
      .returning();

    return user;
  }
}
