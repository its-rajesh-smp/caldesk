import { Model } from "objection";
import { UserType } from "../../types/users";

export class User extends Model {
  id!: string;
  email!: string;
  password!: string;
  role!: UserType;

  static tableName = "users";

  static async create(userData: Partial<Omit<User, "id">>) {
    return await this.query().insert(userData);
  }
}
