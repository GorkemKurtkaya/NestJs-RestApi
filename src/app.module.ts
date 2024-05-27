import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ImageAnalysisController } from './image-analysis-controller';
import * as path from 'path';
import { SafeSearchService } from './safe-search.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM modülünü ekleyin
import { YourEntity } from './your-entity.entity'; // Varlık sınıfınızı ekleyin
import { TextAnalysisController } from './text-analysis';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // Veritabanı türü (PostgreSQL)
      host: 'localhost', // PostgreSQL sunucusu adresi
      port: 5434, // PostgreSQL bağlantı noktası (Docker Compose dosyanızdaki port numarasına uygun olmalı)
      username: 'postgres', // PostgreSQL kullanıcı adı
      password: '1234', // PostgreSQL şifresi
      database: 'postgres', // PostgreSQL veritabanı adı
      entities: [YourEntity], // Yereldeki varlık sınıflarının listesi (örneğin, YourEntity)
      synchronize: true, // 
    }),
  ],
  controllers:[ImageAnalysisController,TextAnalysisController],
  providers: [SafeSearchService],
})
export class AppModule {
  constructor() {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, 'vision_deneme', 'secret-reactor-415208-49c4b6a1b8d8.json');
  }
}
