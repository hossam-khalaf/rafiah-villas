import { type SchemaTypeDefinition } from 'sanity';
import { villaType } from './villa';
import { siteSettingsType } from './siteSettings';

export const schemaTypes: SchemaTypeDefinition[] = [
  villaType,
  siteSettingsType,
];
