/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Disposable } from './features/disposable';

export type Model = MakeModel<
  unknown,
  unknown,
  unknown,
  unknown,
  never,
  never
>;

export type Instance<T extends Model> = T['Instance'];

export type Defaults<T extends Model> = T['Defaults'];

export type With<T extends Model> = T['With'];

export type MakeModel<
  InstanceName,
  InstanceFields = unknown,
  InstanceMethods = unknown,
  InstanceDefaults = unknown,
  ExcludeChangers extends keyof InstanceFields = never,
  MandatoryFields extends keyof InstanceFields = never
> = {
  Instance: MakeInstance<
    InstanceFields,
    InstanceMethods,
    ExcludeChangers
  >;
  Defaults: MakeDefaults<
    InstanceFields,
    InstanceMethods,
    InstanceDefaults,
    ExcludeChangers,
    MandatoryFields
  >;
  With: {
    [Field in `${Uncapitalize<string & InstanceName>}`]: Instance<
      MakeModel<
        InstanceName,
        InstanceFields,
        InstanceMethods,
        InstanceDefaults,
        ExcludeChangers,
        MandatoryFields
      >
    >
  };
}

export type ExtendModel<
  SomeModel extends Model,
  InstanceFields = unknown,
  InstanceMethods = unknown,
  InstanceDefaults = unknown,
  ExcludeChangers extends keyof InstanceFields = never,
  MandatoryFields extends keyof InstanceFields = never
> = {
  Instance:
    & Instance<SomeModel>
    & MakeInstance<
      InstanceFields,
      InstanceMethods,
      ExcludeChangers
    >;
  Defaults:
    & Defaults<SomeModel>
    & MakeDefaults<
      InstanceFields,
      InstanceMethods,
      InstanceDefaults,
      ExcludeChangers,
      MandatoryFields
    >;
  With: {
    [K in keyof With<SomeModel>]: Instance<
      ExtendModel<
        SomeModel,
        InstanceFields,
        InstanceMethods,
        InstanceDefaults,
        ExcludeChangers,
        MandatoryFields
      >
    >
  }
}

export type MakeInstance<
  InstanceFields = unknown,
  InstanceMethods = unknown,
  ExcludeChangers extends keyof InstanceFields = never
> =
  & Readonly<InstanceFields>
  & InstanceMethods
  & InstanceChangers<InstanceFields, ExcludeChangers>;

export type MakeDefaults<
  InstanceFields,
  InstanceMethods = unknown,
  InstanceDefaults = unknown,
  ExcludeChangers extends keyof InstanceFields = never,
  MandatoryFields extends keyof InstanceFields = never,
> =
  & InstanceDefaults
  & Pick<InstanceFields, MandatoryFields>
  & Partial<
    & Omit<InstanceFields, MandatoryFields>
    & CreateMethods<
      & InstanceMethods
      & InstanceChangers<InstanceFields, ExcludeChangers>
    >
  >;

export type InstanceChangers<
  Instance,
  Exclude = never,
> = {
  [
    Field in keyof Instance as
    Field extends Exclude
    ? never
    : `change${Capitalize<string & Field>}`
  ] -?: (value: Instance[Field]) => void;
}

export type CreateModel<T> = () => T;

export type CreateMethods<Instance> = {
  [
    Field in keyof Instance as
    `create${Capitalize<string & Field>}`
  ]: (internals: Internals<Model>) => Instance[Field]
}

export type ChangeMethods<Instance, Exclude extends keyof Instance = never> = {
  [
    Field in keyof Instance as
    Field extends Exclude ?
    never
    : `change${Capitalize<string & Field>}`
  ] -?: (value: Instance[Field]) => void;
}

export type Internals<
  Type,
  Inst = Type extends Model ? Instance<Type> : Type
> = {
  -readonly [Field in keyof Inst]:
    | Inst[Field]
    | (Inst[Field] extends Function ? (() => null) : null)
}

const modelsCache = new Map<string, unknown>();

/**
 * @param id Instance unique identifier.
 * @param create Function, that returns model instance.
 * @returns Cached model instance.
 * 
 * Either returns model instance from cache or create new instance, cache and return it.
 */
export const getModel = <T>(
  id: string,
  create: CreateModel<T>
) => {
  const cachedModel = modelsCache.get(id) as T | undefined;
  if(cachedModel) return cachedModel;
  const newModel = create();
  modelsCache.set(id, newModel);
  return newModel;
}

/**
 * @param id Instance unique identifier.
 * 
 * Removes model instance from cache.
 */
export const removeModel = (id: string) => {
  modelsCache.delete(id);
}

/**
 * Custom hook for model-oriented component state.
 * 
 * @param create Function, that returns model instance.
 * @param id `optional` Model unique identifier.
 * @param autoDispose `optional` Defines if model should be disposed on component unmount or `id` change. `id` must be provided.
 * @returns Tuple with model instance and (if autoDispose was set to false) dispose function.
 * 
 * *Description*
 * 
 * Tipical usage is to pass `create` function.
 * Hook will return model instance that will be disposed on parent component unmount.
 * 
 * Passing `id` will set model instance to cache. Must be provided if `create` should be replaced and other model instance should be returned. By default, cached instance will be disposed on parent component unmount and on `id` param change.
 * 
 * Passing `false` to `autoDispose` will disable default auto-disposing and return `dispose` function in tuple alongside model instance. It's required to keep model instance intact (cached) regardless of parent component's lifecycle.
 */
export const useModel = <
  T extends Partial<With<Disposable>>,
  K extends string | undefined
>(
  create: CreateModel<T>,
  id?: K,
  autoDispose: K extends undefined ? true : Boolean = true,
): [model: T, dispose?: () => void] => {
  const [state, setState] = useState(() => ({
    id,
    model: id ? getModel(id, create) : create(),
    autoDispose,
  }));

  const dispose = useCallback(() => {
    state.model.disposable?.dispose();
    if(state.id) removeModel(state.id);
  }, [state])

  useEffect(() => () => {
    if(state.autoDispose) dispose();
  }, [state]);

  useEffect(() => {
    setState(oldState => {
      if(oldState.autoDispose) dispose();
      return {
        id,
        model: id ? getModel(id, create) : create(),
        autoDispose,
      }
    })
  }, [id]);

  return [state.model, state.autoDispose ? undefined : dispose];
}