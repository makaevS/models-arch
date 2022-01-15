import { makeAutoObservable } from "mobx";
import {
  Instance,
  InstanceDefault,
  Internals,
  MakeModel,
} from "..";

export type Newable = MakeModel<'Newable', {
  isNew: boolean;
}, {}, {}>;

export const createDefaultChangeIsNew = (internals: Internals<Newable>) => (value: boolean) => {
  internals.isNew = value;
}

export const createNewable = (
  params?: InstanceDefault<Newable>
): Instance<Newable> => {
  const {
    isNew = false,
    createChangeIsNew = createDefaultChangeIsNew
  } = params ?? {};
  const internals: Internals<Newable> = makeAutoObservable({
    isNew,
    changeIsNew: () => null
  });
  internals.changeIsNew = createChangeIsNew(internals);
  return internals as Instance<Newable>;
}