import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Services } from "./services.entity";

@Entity()
export class Categories {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(() => Services, (services) => services.categoryId)
  services: Services[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
