import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FinanceOrderTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  tagId: number;
}