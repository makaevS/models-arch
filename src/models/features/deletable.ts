import { makeAutoObservable } from "mobx";
import { With } from "..";

/**
 * `allowDelete` - Shows if model can be deleted.
 * 
 * `deleting` - Shows if model is in deletion right now.
 * 
 * `deleted` - Shows if model was deleted.
 */
type Deletable = {
  /** Shows if model can be deleted. */
  allowDelete: boolean;
  /** Shows if model is in deletion right now. */
  deleting: boolean;
  /** Shows if model was deleted. */
  deleted: boolean;
}

/** Model that has `Deletable`. */
type WithDeletable = With<Deletable, 'deletable'>;

/** Default `deletable` object. */
type DeletableDefault = Partial<Deletable>;

/** Object that has `deletable` default. */
type WithDeletableDefault = With<DeletableDefault, 'deletableDefault'>;

/** Function that creates `deletable` observable. */
const createDeletable = (
  params?: DeletableDefault
): Deletable => {
  const {
    allowDelete = true,
    deleting = false,
    deleted = false,
  } = params ?? {};
  return makeAutoObservable({
    allowDelete,
    deleting,
    deleted,
  });
};

export type {
  Deletable,
  WithDeletable,
  DeletableDefault,
  WithDeletableDefault
};
export { createDeletable };