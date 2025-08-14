import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FinanceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}