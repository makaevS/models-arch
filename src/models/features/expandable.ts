import { makeAutoObservable } from "mobx";
import { With } from "..";

/**
 * `allowExpand` - Shows if model can be marked as expanded.
 * 
 * `expanded` - Shows if model marked.
 */
 type Expandable = {
  /** Shows if model can be marked as expanded. */
  allowExpand: boolean;
  /** Shows if model marked. */
  expanded: boolean;
}

/** Model that has `Expandable`. */
type WithExpandable = With<Expandable, 'expandable'>;

/** Default `expandable` object. */
type ExpandableDefault = Partial<Expandable>;

/** Object that has `expandable` default. */
type WithExpandableDefault = With<ExpandableDefault, 'expandableDefault'>;

/** Function that creates `expandable` observable. */
const createExpandable = (
  params?: ExpandableDefault
): Expandable => {
  const {
    allowExpand = true,
    expanded = false,
  } = params ?? {};
  return makeAutoObservable({
    allowExpand,
    expanded
  });
}

export type {
  Expandable,
  WithExpandable,
  ExpandableDefault,
  WithExpandableDefault
};
export { createExpandable };