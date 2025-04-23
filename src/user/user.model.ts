import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { Exclude } from "class-transformer";
import { Poop } from "@poop/poop.model";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100
  })
  nome: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @OneToMany(()=> Poop, poop => poop.userId)
  public poops: Poop[];

}