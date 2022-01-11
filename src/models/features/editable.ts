import { makeAutoObservable } from "mobx";
import { With } from "..";

/**
 * `allowEdit` - Shows if model can be edited.
 * 
 * `editing` - Shows if model is in edit right now.
 * 
 * `edited` - Shows if model was edited.
 */
 type Editable = {
  /** Shows if model can be edited. */
  allowEdit: boolean;
  /** Shows if model is in edit right now. */
  editing: boolean;
  /** Shows if model was edited. */
  edited: boolean;
}

/** Model that has `Editable`. */
type WithEditable = With<Editable, 'editable'>;

/** Default `editable` object. */
type EditableDefault = Partial<Editable>;

/** Object that has `editable` default. */
type WithEditableDefault = With<EditableDefault, 'editableDefault'>;

/** Function that creates `editable` observable. */
const createEditable = (
  params?: EditableDefault
): Editable => {
  const {
    allowEdit = true,
    editing = false,
    edited = false,
  } = params ?? {};
  return makeAutoObservable({
    allowEdit,
    editing,
    edited
  });
};

export type {
  Editable,
  WithEditable,
  EditableDefault,
  WithEditableDefault
};
export { createEditable };