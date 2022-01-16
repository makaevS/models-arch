import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel
} from "..";

export type HasType<T> = MakeModel<'HasType', {
  type: T
}, {}, {}, never, 'type'>;

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
  const internals: Internals<HasType<T>> = makeAutoObservable({
    type,
    changeType: () => null
  });
  internals.changeType = createChangeType(internals);
  return internals as Instance<HasType<T>>;
}