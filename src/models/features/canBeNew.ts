import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
} from "..";

export type CanBeNew = MakeModel<'CanBeNew', {
  isNew: boolean;
}, {}, {}>;

export const createDefaultChangeIsNew = (internals: Internals<CanBeNew>) => (value: boolean) => {
  internals.isNew = value;
}

export const createCanBeNew = (
  params?: Defaults<CanBeNew>
): Instance<CanBeNew> => {
  const {
    isNew = false,
    createChangeIsNew = createDefaultChangeIsNew
  } = params ?? {};
  const internals: Internals<CanBeNew> = makeAutoObservable({
    isNew,
    changeIsNew: () => null
  });
  internals.changeIsNew = createChangeIsNew(internals);
  return internals as Instance<CanBeNew>;
}