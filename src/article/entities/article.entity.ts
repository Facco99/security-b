import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  price: number;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column('longblob', {
    nullable: true,
    name: 'image',
  })
  image: Buffer;

  @Column()
  imageName: string;
}
