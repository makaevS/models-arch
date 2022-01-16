import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
} from "..";

export type CanBeEdited = MakeModel<'CanBeEdited', {
  editing: boolean;
  edited: boolean;
  permitEdit: boolean;
}, {}, {}>;

export const createDefaultChangeEdited = (internals: Internals<CanBeEdited>) => (value: boolean) => {
  internals.edited = value;
}

export const createDefaultChangeEditing = (internals: Internals<CanBeEdited>) => (value: boolean) => {
  internals.editing = value;
}

export const createDefaultChangePermitEdit = (internals: Internals<CanBeEdited>) => (value: boolean) => {
  internals.permitEdit = value;
}

export const createCanBeEdited = (
  params?: Defaults<CanBeEdited>
): Instance<CanBeEdited> => {
  const {
    edited = false,
    editing = false,
    permitEdit = true,
    createChangeEdited = createDefaultChangeEdited,
    createChangeEditing = createDefaultChangeEditing,
    createChangePermitEdit = createDefaultChangePermitEdit,
  } = params ?? {};
  const internals: Internals<CanBeEdited> = makeAutoObservable({
    editing,
    edited,
    permitEdit,
    changeEdited: () => null,
    changeEditing: () => null,
    changePermitEdit: () => null,
  });
  internals.changeEdited = createChangeEdited(internals);
  internals.changeEditing = createChangeEditing(internals);
  internals.changePermitEdit = createChangePermitEdit(internals);
  return internals as Instance<CanBeEdited>;
};