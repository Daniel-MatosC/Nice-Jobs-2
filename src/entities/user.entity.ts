import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";
import { Schedules } from "./schedules.entity";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isPremium: boolean;

  @Column()
  isActive: boolean;

  @Column({ default: false })
  isOffering: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Schedules, (schedules) => schedules.user)
  schedules: Schedules[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.isActive) {
      this.isActive = true;
    }

    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }
}
