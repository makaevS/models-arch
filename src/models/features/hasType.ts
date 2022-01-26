import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  makeInstance
} from "..";

export type HasType<T> = MakeModel<'HasType', {
  type: T
}, {}, {}, 'type'>;

export const createDefaultChangeType = <T>(internals: Internals<HasType<T>>) => (value: T) => {
  internals.type = value;
}

export const createHasType = <T>(
  params: Defaults<HasType<T>>
): Instance<HasType<T>> => {
  const {
    type,
    createChangeType = createDefaultChangeType
  } = params;
  const internals: Internals<HasType<T>> = {
    type,
    changeType: () => null
  };
  internals.changeType = createChangeType(internals);
  return makeInstance(internals);
}