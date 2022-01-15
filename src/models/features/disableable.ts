import { makeAutoObservable } from "mobx";
import {
  Instance,
  InstanceDefault,
  Internals,
  MakeModel
} from "..";

export type Disableable = MakeModel<'Disableable', {
  disabled: boolean;
}, {}, {}>;

export const createDefaultChangeDisabled = (internals: Internals<Disableable>) => (value: boolean) => {
  internals.disabled = value;
}

export const createDisableable = (
  params?: InstanceDefault<Disableable>
): Instance<Disableable> => {
  const {
    disabled = false,
    createChangeDisabled = createDefaultChangeDisabled
  } = params ?? {};
  const internals: Internals<Disableable> = makeAutoObservable({
    disabled,
    changeDisabled: () => null
  });
  internals.changeDisabled = createChangeDisabled(internals);
  return internals as Instance<Disableable>;
}