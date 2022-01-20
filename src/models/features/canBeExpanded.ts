import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  makeInstance,
} from "..";

export type CanBeExpanded = MakeModel<'CanBeExpanded', {
  permitExpand: boolean;
  expanded: boolean;
}>;

export const createDefaultChangePermitExpand = (internals: Internals<CanBeExpanded>) => (value: boolean) => {
  internals.permitExpand = value;
}

export const createDefaultChangeExpanded = (internals: Internals<CanBeExpanded>) => (value: boolean) => {
  internals.expanded = value;
}

export const createCanBeExpanded = (
  params?: Defaults<CanBeExpanded>
): Instance<CanBeExpanded> => {
  const {
    expanded = false,
    permitExpand = true,
    createChangeExpanded = createDefaultChangeExpanded,
    createChangePermitExpand = createDefaultChangePermitExpand,
  } = params ?? {};
  const internals: Internals<CanBeExpanded> = {
    expanded,
    permitExpand,
    changeExpanded: () => null,
    changePermitExpand: () => null,
  };
  internals.changeExpanded = createChangeExpanded(internals);
  internals.changePermitExpand = createChangePermitExpand(internals);
  return makeInstance(internals);
}