import { AuditFields, Id } from './common';

export type Npc = {
  id: Id;
  ownerId: Id;
  name: string;
  role?: string;
  location?: string;
  description?: string;
  relationships?: string[];
  notes?: string;
  audit: AuditFields;
};
