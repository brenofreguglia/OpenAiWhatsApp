import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AgentesModule } from './agentes/agentes.module';

@Module({
  imports: [ProductsModule, AgentesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
