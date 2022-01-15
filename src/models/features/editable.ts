import { makeAutoObservable } from "mobx";
import {
  Instance,
  InstanceDefault,
  Internals,
  MakeModel,
} from "..";

export type Editable = MakeModel<'Editable', {
  allowEdit: boolean;
  editing: boolean;
  edited: boolean;
}, {}, {}>;

export const createDefaultChangeAllowEdit = (internals: Internals<Editable>) => (value: boolean) => {
  internals.allowEdit = value;
}

export const createDefaultChangeEdited = (internals: Internals<Editable>) => (value: boolean) => {
  internals.edited = value;
}

export const createDefaultChangeEditing = (internals: Internals<Editable>) => (value: boolean) => {
  internals.editing = value;
}

export const createEditable = (
  params?: InstanceDefault<Editable>
): Instance<Editable> => {
  const {
    allowEdit = true,
    edited = false,
    editing = false,
    createChangeAllowEdit = createDefaultChangeAllowEdit,
    createChangeEdited = createDefaultChangeEdited,
    createChangeEditing = createDefaultChangeEditing
  } = params ?? {};
  const internals: Internals<Editable> = makeAutoObservable({
    allowEdit,
    editing,
    edited,
    changeAllowEdit: () => null,
    changeEdited: () => null,
    changeEditing: () => null
  });
  internals.changeAllowEdit = createChangeAllowEdit(internals);
  internals.changeEdited = createChangeEdited(internals);
  internals.changeEditing = createChangeEditing(internals);
  return internals as Instance<Editable>;
};