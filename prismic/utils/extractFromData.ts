import keysToCamel from './keysToCamel';

const extractFromData = (obj: any, partial: string, camelCase?: boolean) => {
  try {
    const data = !camelCase ? obj : { ...keysToCamel(obj) };

    return Object.keys(data).reduce((result, key) => {
      const [, splitKey] = key.split(!camelCase ? `${partial}_` : partial);

      return splitKey
        ? {
            ...result,
            [!camelCase ? splitKey : `${splitKey.charAt(0).toLowerCase()}${splitKey.slice(1)}`]: data[key]
          }
        : result;
    }, {});
  } catch (error) {
    console.warn(`[extractFromData] - partial ${partial} not found in`, obj);

    return {};
  }
};

export default extractFromData;
