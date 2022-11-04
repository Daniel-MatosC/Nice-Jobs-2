import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Categories } from "./categories.entity";
import { Description } from "./description.entity";

@Entity()
export class Services {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  serviceName: string;

  @Column()
  serviceOwner: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Categories)
  category: Categories;

  @OneToOne((type) => Description, {
    eager: true,
  })
  @JoinColumn()
  description: Description;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }
}
