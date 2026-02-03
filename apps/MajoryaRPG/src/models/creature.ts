import { AuditFields, Id } from './common';

export type CreatureStat = {
  key: string;
  label: string;
  value: number | string;
};

export type Creature = {
  id: Id;
  ownerId: Id;
  name: string;
  type?: string;
  difficulty?: string;
  stats: CreatureStat[];
  abilities?: string[];
  notes?: string;
  audit: AuditFields;
};
