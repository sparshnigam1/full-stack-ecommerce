import { Model } from "objection";

export default abstract class BaseModel extends Model {
  id!: string;
  createdAt!: string;
  updatedAt!: string;

  $beforeInsert() {
    const now = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
