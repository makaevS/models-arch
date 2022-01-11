import { makeAutoObservable } from "mobx";
import {
  ChangeMethods,
  CreateMethods,
  Internals,
  OmitMethods,
  With
} from "..";

export type Newable =
  & Readonly<NewableFields>
  & NewableMethods

export type WithNewable = With<Newable, 'newable'>;

export type NewableDefault = Partial<
  & OmitMethods<Newable>
  & NewableDefaultMethods
>;

export type WithNewableDefault = With<NewableDefault, 'newableDefault'>;

type NewableFields = {
  isNew: boolean;
};

type NewableMethods = ChangeMethods<NewableFields>;

type NewableDefaultMethods = CreateMethods<Newable>;

export const createDefaultChangeIsNew = (internals: Internals<Newable>) => (value: boolean) => {
  internals.isNew = value;
}

export const createNewable = (
  params?: NewableDefault
): Newable => {
  const {
    isNew = false,
    createChangeIsNew = createDefaultChangeIsNew
  } = params ?? {};
  const internals: Internals<Newable> = makeAutoObservable({
    isNew,
    changeIsNew: () => null
  });
  internals.changeIsNew = createChangeIsNew(internals);
  return internals as Newable;
}