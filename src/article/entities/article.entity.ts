import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Url } from "url";

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:String

    @Column()
    description:String

    @Column({ type: 'decimal', precision: 9, scale: 2 })
    price:number

    @Column({ type: 'date' })
    createdAt: Date;

    @Column("blob",{
        nullable:true,
        name:"image"
    })
    image: Buffer
}
