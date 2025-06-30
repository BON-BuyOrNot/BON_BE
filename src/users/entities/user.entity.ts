import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 20 })
  userName: string;

  @CreateDateColumn()
  createdAt: Date;
}

export class UsersLoginEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  
  @Column()
  password: string;

  @Column({ length: 20 })
  userName: string;

  @CreateDateColumn()
  createdAt: Date;
}