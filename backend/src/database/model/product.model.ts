import { Column, DataType, Model, Table } from "sequelize-typescript";
import {
  ProductAttributes,
  ProductCreationAttributes,
} from "../../types/product.types";

@Table({
  tableName: "products",
  modelName: "Product",
  timestamps: true,
})
export default class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare category: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare stock: number;

  @Column({
    type: DataType.ENUM("available", "notAvailable"),

    allowNull: false,
    defaultValue: "Available",
  })
  declare status: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "Product",
  })
  declare images: string;
}
