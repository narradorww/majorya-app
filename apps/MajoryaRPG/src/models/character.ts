import { AuditFields, Id, ISODateString } from './common';

export type AttributeKey = 'FOR' | 'INT' | 'CAR' | 'VIG' | 'AGI';

export const ATTRIBUTES: Record<AttributeKey, string> = {
  FOR: 'Força',
  INT: 'Inteligência',
  CAR: 'Carisma',
  VIG: 'Vigor',
  AGI: 'Agilidade',
};

export type Skill = {
  key: string;
  label: string;
  value: number;
};

export type InventoryItem = {
  id: Id;
  name: string;
  description?: string;
  quantity: number;
  weight?: number;
  tags?: string[];
};

export type Encounter = {
  id: Id;
  title: string;
  date: ISODateString;
  summary?: string;
  outcome?: string;
  participants?: string[];
};

export type Character = {
  id: Id;
  ownerId: Id;
  name: string;
  className?: string; // Classe (Ex: Guerreiro, Mago - se houver no futuro)
  level?: number;
  ancestry?: string; // Povo (Ex: Anão, Elfo)
  background?: string; // Origem
  
  // Attributes (Fixed keys)
  attributes: Record<AttributeKey, number>;
  
  // Vitals
  hp: number;
  maxHp: number; // Derived from VIG * 5 typically, but stored for overrides

  skills: Skill[];
  inventory: InventoryItem[];
  encounters: Encounter[];
  notes?: string;
  audit: AuditFields;
};
