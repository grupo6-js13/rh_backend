import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, Length, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_colaboradores"})
export class Colaborador {

    @PrimaryGeneratedColumn()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({message:"O nome é obrigatório!"})
    @Length(3, 150,{message: "O nome deve ter entre 3 e 150 Caracteres!"})
    @Column({length: 150, nullable: false})
    nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({message:"O cargo é obrigatório!"})
    @Length(2, 100,{message: "O cargo deve ter entre 2 e 100 Caracteres!"})
    @Column({length: 100, nullable: false})
    cargo: string

    @Transform(({ value }: TransformFnParams) => parseFloat(value))
    @IsNotEmpty({message:"O salário é obrigatório!"})
    @IsNumber({maxDecimalPlaces: 2}) // Colocar depois o @IsDecimal
    @Min(0, { message: "O salário não pode ser negativo" })
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    salario: number

    @IsNotEmpty({message: "A data de ingresso é obrigatória"})
    @Column({type: "date", nullable: false})
    data_ingresso: Date
}