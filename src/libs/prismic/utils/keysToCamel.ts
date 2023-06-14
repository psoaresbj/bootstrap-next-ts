import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

const keysToCamel = (obj?: { [key: string]: any }) => {
  if (!isPlainObject(obj) && !isArray(obj)) {
    return obj;
  }

  if (isPlainObject(obj)) {
    const newObject = {} as { [key: string]: any };

    Object.keys(obj as { [key: string]: any }).forEach((key: string) => {
      newObject[camelCase(key)] = keysToCamel((obj as any)[key]);
    });

    return newObject;
  }

  return (obj as any).map((index: any) => keysToCamel(index));
};

export default keysToCamel;
