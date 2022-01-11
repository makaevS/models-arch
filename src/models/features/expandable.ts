import { makeAutoObservable } from "mobx";
import { With } from "..";

/**
 * `allowExpand` - Shows if model can be marked as expanded.
 * 
 * `expanded` - Shows if model marked.
 */
export type Expandable = {
  /** Shows if model can be marked as expanded. */
  allowExpand: boolean;
  /** Shows if model marked. */
  expanded: boolean;
}

/** Model that has `Expandable`. */
export type WithExpandable = With<Expandable, 'expandable'>;

/** Default `expandable` object. */
export type ExpandableDefault = Partial<Expandable>;

/** Object that has `expandable` default. */
export type WithExpandableDefault =
  With<ExpandableDefault, 'expandableDefault'>;

/** Function that creates `expandable` observable. */
export const createExpandable = (
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