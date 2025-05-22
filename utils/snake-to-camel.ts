import _ from "lodash";

/**
 * @description
 * Utility functions for the Metaplanet application.
 * Includes a function to convert snake_case keys to camelCase, handling nested objects and arrays.
 *
 * @dependencies
 * - lodash: Used for object manipulation and key conversion
 */

/**
 * Converts snake_case keys in an object to camelCase recursively.
 * Handles nested objects and arrays with proper TypeScript typing.
 *
 * @template T - The type of the input object
 * @param obj - The object to convert (can be an object, array, or primitive)
 * @returns The converted object with camelCase keys, preserving the structure of T
 */
export function snakeToCamel<T>(obj: T): T {
  // If it's an array, map over it and recurse
  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item)) as unknown as T;
  }

  // If it's an object (but not null), convert keys and recurse on values
  if (_.isObject(obj) && obj !== null) {
    const converted = _.mapKeys(obj, (_value: unknown, key: string) =>
      _.camelCase(key)
    );
    return _.mapValues(converted, (value) => snakeToCamel(value)) as T;
  }

  // If it's a primitive (or null), return as is
  return obj;
}
