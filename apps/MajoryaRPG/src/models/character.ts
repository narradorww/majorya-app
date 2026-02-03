import { AuditFields, Id, ISODateString } from './common';

export type Attribute = {
  key: string;
  label: string;
  value: number;
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
  className?: string;
  level?: number;
  ancestry?: string;
  background?: string;
  attributes: Attribute[];
  skills: Skill[];
  inventory: InventoryItem[];
  encounters: Encounter[];
  notes?: string;
  audit: AuditFields;
};
