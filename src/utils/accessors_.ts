import { capitalize } from './capitalize';

/** Function that will be used as getter for `K` property of `T`. */
type Getter<T, K extends keyof T> = () => T[K];

/** Function that will be used as setter for `K` property of `T`. */
type Setter<T, K extends keyof T> = (value: T[K]) => void;

/** Function that creates getter for `K` property of `T`. */
type CreateGetter<T, K extends keyof T> = (obj: T, prop: K) => Getter<T, K>;

/** Function that creates setter for `K` property of `T`. */
type CreateSetter<T, K extends keyof T> = (obj: T, prop: K) => Setter<T, K>;

/** Utility type that returns object with accessors to every `K` of `T` */
type Accessors<T> = {
  [K in keyof T as `createGet${Capitalize<string & K>}`]: CreateGetter<T, K>;
} & {
  [K in keyof T as `createSet${Capitalize<string & K>}`]: CreateSetter<T, K>;
};

/**
 * @param obj Object, whose property value will be return from getter.
 * @param prop Name of property, whose value will be returned from getter.
 * @returns Function returning value of given property.
 */
const createGetter = <T, K extends keyof T>(obj: T, prop: K) => {
  const { [prop]: property } = obj;
  return () => property;
}

/**
 * @param obj Object, whose property value will be changed in setter.
 * @param prop Name of property, whose value will be changed in setter.
 * @returns Function changing value of given property.
 */
const createSetter = <T, K extends keyof T>(obj: T, prop: K) => {
  return (value: T[K]) => obj[prop] = value;
}

/**
 * @param obj Object, whose properties will be accessed through returned object.
 * @param accessors `optional` Object, containing custom getters / setters.
 * @returns Object, whose properties are getters / setters for given object.
 */
const createAccessors = <T>(obj: T, accessors?: Partial<Accessors<T>>) => {
  let accessWrapper = {} as T;
  const propsNames = Object.getOwnPropertyNames(obj);
  propsNames.forEach(propName => {
    const createGetName =
      `createGet${capitalize(propName)}` as keyof typeof accessors;
    const createSetName =
      `createSet${capitalize(propName)}` as keyof typeof accessors;
    const createCustomGetter: CreateGetter<T, keyof T> | undefined =
      accessors?.[createGetName];
    const createCustomSetter: CreateSetter<T, keyof T> | undefined =
      accessors?.[createSetName];
    const getter = (
      createCustomGetter ?? createGetter
    )(obj, propName as keyof typeof obj);
    const setter = (
      createCustomSetter ?? createSetter
    )(obj, propName as keyof typeof obj);
    accessWrapper = {
      ...accessWrapper,
      get [propName]() {
        return getter();
      },
      set [propName](value: unknown) {
        setter(value as T[keyof T]);
      }
    }
  });
  return accessWrapper;
}

export type {
  Getter,
  Setter,
  CreateGetter,
  CreateSetter,
  Accessors,
}
export {
  createGetter,
  createSetter,
  createAccessors,
}