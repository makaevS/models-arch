import {
  Defaults,
  Instance,
  Internals,
  makeInstance,
  MakeModel
} from "..";

export type CanBeDeleted = MakeModel<'CanBeDeleted', {
  deleted: boolean;
  deleting: boolean;
  permitDelete: boolean;
}>;

export const createDefaultChangeDeleted = (
  internals: Internals<CanBeDeleted>
) => (value: boolean) => {
  internals.deleted = value;
}

export const createDefaultChangeDeleting = (
  internals: Internals<CanBeDeleted>
) => (value: boolean) => {
  internals.deleting = value;
}

export const createDefaultChangePermitDelete = (
  internals: Internals<CanBeDeleted>
) => (value: boolean) => {
  internals.permitDelete = value;
}

export const createCanBeDeleted = (
  params?: Defaults<CanBeDeleted>
): Instance<CanBeDeleted> => {
  const {
    deleted = false,
    deleting = false,
    permitDelete = true,
    createChangeDeleted = createDefaultChangeDeleted,
    createChangeDeleting = createDefaultChangeDeleting,
    createChangePermitDelete = createDefaultChangePermitDelete,
  } = params ?? {};
  const internals: Internals<CanBeDeleted> = {
    deleted,
    deleting,
    permitDelete,
    changeDeleted: () => null,
    changeDeleting: () => null,
    changePermitDelete: () => null,
  };
  internals.changePermitDelete = createChangePermitDelete(internals);
  internals.changeDeleted = createChangeDeleted(internals);
  internals.changeDeleting = createChangeDeleting(internals);
  return makeInstance(internals);
};