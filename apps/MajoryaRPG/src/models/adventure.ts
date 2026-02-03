import { AuditFields, Id } from './common';

export type AdventureStatus = 'draft' | 'active' | 'completed';

export type AdventureChapter = {
  id: Id;
  title: string;
  summary?: string;
  order: number;
};

export type Adventure = {
  id: Id;
  ownerId: Id;
  title: string;
  synopsis?: string;
  status: AdventureStatus;
  chapters: AdventureChapter[];
  notes?: string;
  audit: AuditFields;
};
