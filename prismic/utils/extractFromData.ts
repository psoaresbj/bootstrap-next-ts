import keysToCamel from './keysToCamel';

const extractFromData = (obj: any, partial: string, snakeCase?: boolean) => {
  try {
    const data = !snakeCase ? obj : { ...keysToCamel(obj) };

    return Object.keys(data).reduce((result, key) => {
      const [, splitKey] = key.split(!snakeCase ? `${partial}_` : partial);

      return splitKey
        ? { ...result, [!snakeCase ? splitKey : `${splitKey.charAt(0).toLowerCase()}${splitKey.slice(1)}`]: data[key] }
        : result;
    }, {});
  } catch (error) {
    console.warn(`[extractFromData] - partial ${partial} not found in`, obj);

    return {};
  }
};

export default extractFromData;
