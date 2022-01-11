import { makeAutoObservable } from "mobx";
import {
  ChangeMethods,
  CreateMethods,
  Internals,
  OmitMethods,
  With
} from "..";

export type Disableable =
  & Readonly<DisableableFields>
  & DisableableMethods;

export type WithDisableable = With<Disableable, 'disableable'>;

export type DisableableDefault = Partial<
  & OmitMethods<Disableable>
  & DisableableDefaultMethods
>;

export type WithDisableableDefault =
  With<DisableableDefault, 'disableableDefault'>;

type DisableableFields = {
  disabled: boolean;
}

type DisableableMethods = ChangeMethods<DisableableFields>;

type DisableableDefaultMethods = CreateMethods<Disableable>;

export const createDefaultChangeDisabled = (internals: Internals<Disableable>) => (value: boolean) => {
  internals.disabled = value;
}

export const createDisableable = (
  params?: DisableableDefault
): Disableable => {
  const {
    disabled = false,
    createChangeDisabled = createDefaultChangeDisabled
  } = params ?? {};
  const internals: Internals<Disableable> = makeAutoObservable({
    disabled,
    changeDisabled: () => null
  });
  internals.changeDisabled = createChangeDisabled(internals);
  return internals as Disableable;
}