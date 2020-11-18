import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";


@ObjectType()
@Entity()
export class Restaurant{

    @PrimaryGeneratedColumn()
    @Field(is => Number)
    id: number

    @Field(is => String)
    @IsString()
    @Column()
    @Length(5, 10)
    name: string;

    @Field(is => Boolean, {nullable:true, defaultValue: true})
    @IsBoolean()
    @IsOptional()
    @Column({default: true})
    isVegan: boolean

    @Field(is => String)
    @IsString()
    @Column()
    address: string

    @Field(is => String)
    @IsString()
    @Column()
    ownerName: string

    @Field(is => String)
    @IsString()
    @Column()
    categoryName: string

}