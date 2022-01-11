/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { WithDisposable } from './features/disposable';

export type CreateModel<T> = () => T;

export type CreateMethods<T> = {
  [K in keyof T as T[K] extends Function
    ? `create${Capitalize<string & K>}`
    : never]: (internals: Internals<T>) => T[K]
}

export type ChangeMethods<T, N extends keyof T = never> = {
  [
    K in keyof T as
    K extends N ?
    never
    : `change${Capitalize<string & K>}`
  ]-?: (value: T[K]) => void;
}

export type OmitMethods<T, N extends keyof T = never> = {
  [
    K in keyof T as
    K extends N
    ? K
    : T[K] extends Function
      ? never
      : K
  ]: T[K]
}

export type With<T, K extends string> = {
  [key in K]: T
}

export type Internals<T> = {
  -readonly[K in keyof T]: T[K] | (T[K] extends Function ? (() => null) : null);
}

const modelsCache = new Map<string, unknown>();

/**
 * @param id Model unique identifier.
 * @param create Function, that returns model instance.
 * @returns Cached model instance.
 * 
 * Either returns model instance from cache or create new instance, cache and return it.
 */
export const getModel = <T>(id: string, create: CreateModel<T>) => {
  const cachedModel = modelsCache.get(id) as T | undefined;
  if(cachedModel) return cachedModel;
  const newModel = create();
  modelsCache.set(id, newModel);
  return newModel;
}

/**
 * @param id Model unique identifier.
 * 
 * Removes model from cache.
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
  T extends Partial<WithDisposable>,
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