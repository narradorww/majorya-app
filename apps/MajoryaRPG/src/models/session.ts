import { AuditFields, Id, ISODateString } from './common';

export type Session = {
  id: Id;
  ownerId: Id;
  title: string;
  date: ISODateString;
  summary?: string;
  adventureId?: Id;
  npcIds?: Id[];
  creatureIds?: Id[];
  mapIds?: Id[];
  notes?: string;
  audit: AuditFields;
};
