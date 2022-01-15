import { makeAutoObservable } from "mobx";
import {
  Instance,
  InstanceDefault,
  Internals, MakeModel,
} from "..";

export type Expandable = MakeModel<'Expandable', {
  allowExpand: boolean;
  expanded: boolean;
}, {}, {}>;

export const createDefaultChangeAllowExpand = (internals: Internals<Expandable>) => (value: boolean) => {
  internals.allowExpand = value;
}

export const createDefaultChangeExpanded = (internals: Internals<Expandable>) => (value: boolean) => {
  internals.expanded = value;
}

export const createExpandable = (
  params?: InstanceDefault<Expandable>
): Instance<Expandable> => {
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
  return internals as Instance<Expandable>;
}