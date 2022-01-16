import { makeAutoObservable } from 'mobx';
import {
  Instance,
  Defaults,
  Internals, MakeModel
} from '..';

export type HasOptions<T> = MakeModel<'HasOptions', {
  options: T[];
}, {}, {}>;

export const createDefaultChangeOptions = <T>(
  internals: Internals<HasOptions<T>>
) => (value: T[]) => {
  internals.options = value;
}

export const createHasOptions = <T>(
  params?: Defaults<HasOptions<T>>
): Instance<HasOptions<T>> => {
  const {
    options = [],
    createChangeOptions = createDefaultChangeOptions
  } = params ?? {};
  const internals: Internals<HasOptions<T>> = makeAutoObservable({
    options,
    changeOptions: () => null
  });
  internals.changeOptions = createChangeOptions(internals);
  return internals as Instance<HasOptions<T>>;
}