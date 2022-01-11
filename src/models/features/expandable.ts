import { makeAutoObservable } from "mobx";
import {
  ChangeMethods,
  CreateMethods,
  Internals,
  OmitMethods,
  With
} from "..";

export type Expandable = 
  & Readonly<ExpandableFields>
  & ExpandableMethods;

export type WithExpandable = With<Expandable, 'expandable'>;

export type ExpandableDefault = Partial<
  & OmitMethods<Expandable>
  & ExpandableDefaultMethods
>;

export type WithExpandableDefault =
  With<ExpandableDefault, 'expandableDefault'>;

type ExpandableFields = {
  allowExpand: boolean;
  expanded: boolean;
};

type ExpandableMethods = ChangeMethods<ExpandableFields>;

type ExpandableDefaultMethods = CreateMethods<Expandable>;

export const createDefaultChangeAllowExpand = (internals: Internals<Expandable>) => (value: boolean) => {
  internals.allowExpand = value;
}

export const createDefaultChangeExpanded = (internals: Internals<Expandable>) => (value: boolean) => {
  internals.expanded = value;
}

export const createExpandable = (
  params?: ExpandableDefault
): Expandable => {
  const {
    allowExpand = true,
    expanded = false,
    createChangeAllowExpand = createDefaultChangeAllowExpand,
    createChangeExpanded = createDefaultChangeExpanded
  } = params ?? {};
  const internals: Internals<Expandable> = makeAutoObservable({
    allowExpand,
    expanded,
    changeAllowExpand: () => null,
    changeExpanded: () => null
  });
  internals.changeAllowExpand = createChangeAllowExpand(internals);
  internals.changeExpanded = createChangeExpanded(internals);
  return internals as Expandable;
}