import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Evidence } from './evidence';

const ENTITY_NAME = 'Question_Draft';

@Entity(ENTITY_NAME)
export class QuestionDraft {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderId!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  version!: string;

  @Column()
  knowledgeAreaId!: number;

  @Column()
  majorVersion!: number;

  @Column()
  minorVersion!: number;

  @Column()
  patchVersion!: number;

  @OneToMany(
    type => Evidence,
    evidence => evidence.question,
  )
  evidences!: Evidence[];
}
