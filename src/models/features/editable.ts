import { makeAutoObservable } from "mobx";
import {
  ChangeMethods,
  CreateMethods,
  Internals,
  OmitMethods,
  With
} from "..";

export type Editable =
& Readonly<EditableFields>
& EditableMethods

export type WithEditable = With<Editable, 'editable'>;

export type EditableDefault = Partial<
  & OmitMethods<Editable>
  & EditableDefaultMethods
>;

export type WithEditableDefault = With<EditableDefault, 'editableDefault'>;

type EditableFields = {
  allowEdit: boolean;
  editing: boolean;
  edited: boolean;
}

type EditableMethods = ChangeMethods<EditableFields>;

type EditableDefaultMethods = CreateMethods<Editable>;

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
  params?: EditableDefault
): Editable => {
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
  return internals as Editable;
};