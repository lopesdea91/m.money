import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FinanceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'real' })
  value: string;

  @Column()
  date: string;

  @Column()
  typeId: number;

  // @Column()
  // tagIds: number[];

  @Column()
  active: number;

  @Column()
  userId: number;
}