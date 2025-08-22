export type GenericObject = { [key: string]: any };

export function deepMerge<T extends GenericObject>(obj1: T, obj2: Partial<T>): GenericObject {
  const pincipalData: GenericObject = { ...obj1 };
  const secondaryData: GenericObject = { ...obj2 }

  function isObject(value: any): value is GenericObject {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  // console.log({ secondaryData });

  for (const key in secondaryData) {
    if (secondaryData?.hasOwnProperty(key)) {
      const value1 = pincipalData[key];
      const value2 = secondaryData[key];

      if (Array.isArray(value1) && Array.isArray(value2)) {
        /** Combinar os arrays */
        pincipalData[key] = [...new Set([...value1, ...value2])].filter(Boolean);

      } else if (isObject(value1) && isObject(value2)) {
        /** Merge recursivo para objetos */
        pincipalData[key] = deepMerge(value1, value2);

      } else if (Array.isArray(value1)) {
        /** Adicionar o valor ao array existente */
        pincipalData[key] = [...value1, value2].filter(Boolean);;

      } else if (Array.isArray(value2)) {
        /** Criar um array se apenas o segundo valor for um array */
        pincipalData[key] = [value1, ...value2].filter(Boolean);;

      } else {
        /** Sobrescrever o valor de obj1 pelo valor de obj2 */
        pincipalData[key] = value2;
      }
    }
  }

  return pincipalData;
}