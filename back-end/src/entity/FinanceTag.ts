import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FinanceTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  typeId: number;

  // @OneToOne(() => FinanceType, (financeType) => financeType.id)
  // type: FinanceType

  @Column()
  userId: number;

  // @OneToOne(() => User, (user) => user.id)
  // user: User
}