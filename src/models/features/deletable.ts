import { makeAutoObservable } from "mobx";
import { With } from "..";

/**
 * `allowDelete` - Shows if model can be deleted.
 * 
 * `deleting` - Shows if model is in deletion right now.
 * 
 * `deleted` - Shows if model was deleted.
 */
export type Deletable = {
  /** Shows if model can be deleted. */
  allowDelete: boolean;
  /** Shows if model is in deletion right now. */
  deleting: boolean;
  /** Shows if model was deleted. */
  deleted: boolean;
}

/** Model that has `Deletable`. */
export type WithDeletable = With<Deletable, 'deletable'>;

/** Default `deletable` object. */
export type DeletableDefault = Partial<Deletable>;

/** Object that has `deletable` default. */
export type WithDeletableDefault = With<DeletableDefault, 'deletableDefault'>;

/** Function that creates `deletable` observable. */
export const createDeletable = (
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