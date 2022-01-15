import { makeAutoObservable } from 'mobx';
import {
  Instance,
  InstanceDefault,
  Internals, MakeModel
} from '..';

export type Optionable<T> = MakeModel<'Optionable', {
  options: T[];
}, {}, {}>;

export const createDefaultChangeOptions = <T>(
  internals: Internals<Optionable<T>>
) => (value: T[]) => {
  internals.options = value;
}

export const createOptionable = <T>(
  params?: InstanceDefault<Optionable<T>>
): Instance<Optionable<T>> => {
  const {
    options = [],
    createChangeOptions = createDefaultChangeOptions
  } = params ?? {};
  const internals: Internals<Optionable<T>> = makeAutoObservable({
    options,
    changeOptions: () => null
  });
  internals.changeOptions = createChangeOptions(internals);
  return internals as Instance<Optionable<T>>;
}