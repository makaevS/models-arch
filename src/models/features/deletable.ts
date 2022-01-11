import { makeAutoObservable } from "mobx";
import {
  ChangeMethods,
  CreateMethods,
  Internals,
  OmitMethods,
  With
} from "..";

export type Deletable = Readonly<DeletableFields> & DeletableMethods;

export type WithDeletable = With<Deletable, 'deletable'>;

export type DeletableDefault = Partial<
  & OmitMethods<Deletable>
  & DeletableDefaultMethods
>;

export type WithDeletableDefault = With<DeletableDefault, 'deletableDefault'>;

type DeletableFields = {
  allowDelete: boolean;
  deleted: boolean;
  deleting: boolean;
}

type DeletableMethods = ChangeMethods<DeletableFields>;

type DeletableDefaultMethods = CreateMethods<Deletable>;

export const createDefaultChangeAllowDelete = (internals: Internals<Deletable>) => (value: boolean) => {
  internals.allowDelete = value;
}

export const createDefaultChangeDeleted = (internals: Internals<Deletable>) => (value: boolean) => {
  internals.deleted = value;
}

export const createDefaultChangeDeleting = (internals: Internals<Deletable>) => (value: boolean) => {
  internals.deleting = value;
}

export const createDeletable = (
  params?: DeletableDefault
): Deletable => {
  const {
    allowDelete = true,
    deleted = false,
    deleting = false,
    createChangeAllowDelete = createDefaultChangeAllowDelete,
    createChangeDeleted = createDefaultChangeDeleted,
    createChangeDeleting = createDefaultChangeDeleting
  } = params ?? {};
  const internals: Internals<Deletable> = makeAutoObservable({
    allowDelete,
    deleting,
    deleted,
    changeAllowDelete: () => null,
    changeDeleted: () => null,
    changeDeleting: () => null
  });
  internals.changeAllowDelete = createChangeAllowDelete(internals);
  internals.changeDeleted = createChangeDeleted(internals);
  internals.changeDeleting = createChangeDeleting(internals);
  return internals as Deletable;
};