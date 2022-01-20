import {
  Instance,
  Defaults,
  Internals, MakeModel, makeInstance
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
  const internals: Internals<HasOptions<T>> = {
    options,
    changeOptions: () => null
  };
  internals.changeOptions = createChangeOptions(internals);
  return makeInstance(internals);
}