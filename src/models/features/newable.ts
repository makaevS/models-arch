import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
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
  params?: Defaults<Newable>
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