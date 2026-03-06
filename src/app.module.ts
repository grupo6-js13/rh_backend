import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { Colaborador } from './colaborador/entities/colaborador.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localHost",
      port: 3307,
      username: "root",
      password: "root",
      database: "db_rhbackend",
      entities: [Colaborador],
      synchronize: true,
      logging: true
    }),
    ColaboradorModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
