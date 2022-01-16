import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel
} from "..";

export type CanBeDisabled = MakeModel<'CanBeDisabled', {
  disabled: boolean;
}, {}, {}>;

export const createDefaultChangeDisabled = (internals: Internals<CanBeDisabled>) => (value: boolean) => {
  internals.disabled = value;
}

export const createCanBeDisabled = (
  params?: Defaults<CanBeDisabled>
): Instance<CanBeDisabled> => {
  const {
    disabled = false,
    createChangeDisabled = createDefaultChangeDisabled
  } = params ?? {};
  const internals: Internals<CanBeDisabled> = makeAutoObservable({
    disabled,
    changeDisabled: () => null
  });
  internals.changeDisabled = createChangeDisabled(internals);
  return internals as Instance<CanBeDisabled>;
}