import { Model, Pojo } from "objection";
import { UserType } from "../../types/users";

export class User extends Model {
  id!: string;
  email!: string;
  password!: string;
  role!: UserType;

  static tableName = "users";

  $formatJson(json: Pojo): Pojo {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  static async create(userData: Partial<Omit<User, "id">>) {
    return await this.query().insert(userData);
  }

  static async findByEmail(email: string) {
    return await this.query().findOne({ email });
  }
  static async findById(id: string) {
    return this.query().findOne({ id }).throwIfNotFound();
  }
}
