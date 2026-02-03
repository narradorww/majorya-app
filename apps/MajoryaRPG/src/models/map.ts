import { AuditFields, Id } from './common';

export type MapPoint = {
  id: Id;
  label: string;
  description?: string;
  x: number;
  y: number;
};

export type GameMap = {
  id: Id;
  ownerId: Id;
  title: string;
  imageUri?: string;
  points: MapPoint[];
  notes?: string;
  audit: AuditFields;
};
