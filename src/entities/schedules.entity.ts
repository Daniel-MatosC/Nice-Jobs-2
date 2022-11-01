import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Services } from "./services.entity";
import { User } from "./user.entity";

@Entity()
export class Schedules {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  date: string;

  @Column()
  hour: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Services)
  services: Services;
  static user: any;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
