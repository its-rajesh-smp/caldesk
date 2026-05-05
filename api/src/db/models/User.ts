import { Model } from "objection";

export class User extends Model {
  id!: string;
  email!: string;
  password!: string;

  static tableName: "users";

  static async create(userData: Partial<Omit<User, "id">>) {
    return await this.query().insert(userData);
  }
}
