import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository, DeleteResult } from "typeorm";
import { Colaborador } from "../entities/colaborador.entity";

@Injectable()
export class ColaboradorService {
    constructor(
        @InjectRepository(Colaborador)
        private colaboradorRepository: Repository<Colaborador>,
    ){}

    async findAll(): Promise<Colaborador[]>{
        return this.colaboradorRepository.find()
    }

    async findById(id: number): Promise<Colaborador>{
        const colaborador = await this.colaboradorRepository.findOne({
            where:{id}})

            if (!colaborador){
                throw new HttpException("Colaborador não encontrado", HttpStatus.NOT_FOUND)
            }
        return colaborador
    }
    
    async findAllByCargo(cargo: string): Promise<Colaborador[]>{
        return this.colaboradorRepository.find({where: {cargo: ILike(`%${cargo}%`)}})
    }

    /////////// EXTRAAA!!!!
    async findAllByNome(nome: string): Promise<Colaborador[]>{
        return this.colaboradorRepository.find({where: {nome: ILike(`%${nome}%`)}})
    }

    async create(colaborador: Colaborador): Promise<Colaborador>{
        return await this.colaboradorRepository.save(colaborador)
    }

    async update(colaborador: Colaborador): Promise<Colaborador>{
        if (!colaborador.id || colaborador.id <= 0){
            throw new HttpException("Id do colaborador inválido!",HttpStatus.BAD_REQUEST)
        }
        this.findById(colaborador.id)

        return this.colaboradorRepository.save(colaborador)
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.colaboradorRepository.delete(id)
    }
}