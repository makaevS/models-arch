import { makeAutoObservable } from "mobx";
import {
  Defaults,
  Instance,
  Internals,
  MakeModel
} from "..";

export type Deletable = MakeModel<'Deletable', {
  allowDelete: boolean;
  deleted: boolean;
  deleting: boolean;
}>;

export const createDefaultChangeAllowDelete = (
  internals: Internals<Deletable>
) => (value: boolean) => {
  internals.allowDelete = value;
}

export const createDefaultChangeDeleted = (
  internals: Internals<Deletable>
) => (value: boolean) => {
  internals.deleted = value;
}

export const createDefaultChangeDeleting = (
  internals: Internals<Deletable>
) => (value: boolean) => {
  internals.deleting = value;
}

export const createDeletable = (
  params?: Defaults<Deletable>
): Instance<Deletable> => {
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
    deleted,
    deleting,
    changeAllowDelete: () => null,
    changeDeleted: () => null,
    changeDeleting: () => null,
  });
  internals.changeAllowDelete = createChangeAllowDelete(internals);
  internals.changeDeleted = createChangeDeleted(internals);
  internals.changeDeleting = createChangeDeleting(internals);
  return internals as Instance<Deletable>;
};