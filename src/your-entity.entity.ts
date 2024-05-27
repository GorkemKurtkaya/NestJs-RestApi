// your-entity.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class YourEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Diğer sütunlar buraya eklenebilir
}
