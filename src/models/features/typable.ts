import { makeAutoObservable } from "mobx";
import {
  Instance,
  InstanceDefault,
  Internals,
  MakeModel
} from "..";

export type Typable<T> = MakeModel<'Typable', {
  type: T
}, {}, {}, never, 'type'>;

export const createDefaultChangeType = <T>(internals: Internals<Typable<T>>) => (value: T) => {
  internals.type = value;
}

export const createTypable = <T>(
  params: InstanceDefault<Typable<T>>
): Instance<Typable<T>> => {
  const {
    type,
    createChangeType = createDefaultChangeType
  } = params;
  const internals: Internals<Typable<T>> = makeAutoObservable({
    type,
    changeType: () => null
  });
  internals.changeType = createChangeType(internals);
  return internals as Instance<Typable<T>>;
}