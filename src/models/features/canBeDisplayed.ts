import { makeAutoObservable } from "mobx";
import {
  Internals,
  MakeModel,
  Instance,
  Defaults
} from "..";

export type CanBeDisplayed<T> = MakeModel<'CanBeDisplayed', {
  label: string;
  value: T;
}, {}, {}, never, 'value'>

export const createDefaultChangeLabel = <T>(
  internals: Internals<CanBeDisplayed<T>>
) => (value: string) => {
  internals.label = value;
}

export const createDefaultChangeValue = <T>(
  internals: Internals<CanBeDisplayed<T>>
) => (value: T) => {
  internals.value = value;
}

export const createCanBeDisplayed = <T>(
  params: Defaults<CanBeDisplayed<T>>
): Instance<CanBeDisplayed<T>> => {
  const {
    label = String(params.value),
    value,
    createChangeLabel = createDefaultChangeLabel,
    createChangeValue = createDefaultChangeValue
  } = params;
  const internals: Internals<CanBeDisplayed<T>> = makeAutoObservable({
    label: label,
    value: value,
    changeLabel: () => null,
    changeValue: () => null
  });
  internals.changeLabel = createChangeLabel(internals);
  internals.changeValue = createChangeValue(internals);
  return internals as Instance<CanBeDisplayed<T>>;
};