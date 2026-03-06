import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColaboradorService } from "./services/colaborador.sevice";
import { Colaborador } from "./entities/colaborador.entity";
import { ColaboradorController } from "./controller/colaborador.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Colaborador])],
    controllers: [ColaboradorController],
    providers: [ColaboradorService],
    exports: []
})
export class ColaboradorModule{}