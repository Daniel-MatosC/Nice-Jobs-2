import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Description {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  serviceDescription: string;

  @Column("decimal", { precision: 12, scale: 2 })
  serviceValue: number;

  @Column()
  atuationArea: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
