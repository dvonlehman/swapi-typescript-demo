import camelcaseKeys from 'camelcase-keys';
import camelcase from 'camelcase';
import { IEntity } from './types';

const ENTITY_PLURAL_NAMES = [
  'films',
  'vehicles',
  'planets',
  'starships',
  'characters',
];

export interface IMapEntityOptions {
  numberFields?: string[];
  referenceFields?: string[];
}

export function extractIdFromEntityUrl(url: string): number {
  // Trim the trailing slash off
  const match = url.match(/\/(\d+)\/$/);
  if (!match || match.length < 2) {
    throw new Error('Could not extract entity ID from url');
  }

  return parseInt(match[1], 10);
}

function mapEntity<T extends IEntity>(
  rawData: Record<string, any>,
  options?: IMapEntityOptions
): T {
  let exclude = ENTITY_PLURAL_NAMES;
  if (options) {
    if (options.referenceFields) {
      exclude = exclude.concat(options.referenceFields);
    }
    if (options.numberFields) {
      exclude = exclude.concat(options.numberFields);
    }
  }

  const entity = camelcaseKeys(rawData, { exclude, deep: true });

  if (options && options.numberFields) {
    for (const field of options.numberFields) {
      const numericValue = parseInt(rawData[field], 10);
      if (!isNaN(numericValue)) {
        entity[camelcase(field)] = numericValue;
      }
    }
  }
  entity.id = extractIdFromEntityUrl(rawData.url);

  return entity as T;
}

export default mapEntity;
