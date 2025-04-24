import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@user/user.model";

@Entity()
export class Poop {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public dataHora: Date;

  @ManyToOne(()=> User, userId => userId.poops)
  @JoinColumn({name:'userId'})
  public userId: string;

}