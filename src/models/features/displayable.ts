import { makeAutoObservable } from "mobx";
import {
  Internals,
  MakeModel,
  Instance,
  Defaults
} from "..";

export type Displayable<T> = MakeModel<'Displayable', {
  label: string;
  value: T;
}, {}, {}, never, 'value'>

export const createDefaultChangeLabel = <T>(
  internals: Internals<Displayable<T>>
) => (value: string) => {
  internals.label = value;
}

export const createDefaultChangeValue = <T>(
  internals: Internals<Displayable<T>>
) => (value: T) => {
  internals.value = value;
}

export const createDisplayable = <T>(
  params: Defaults<Displayable<T>>
): Instance<Displayable<T>> => {
  const {
    label = String(params.value),
    value,
    createChangeLabel = createDefaultChangeLabel,
    createChangeValue = createDefaultChangeValue
  } = params;
  const internals: Internals<Displayable<T>> = makeAutoObservable({
    label: label,
    value: value,
    changeLabel: () => null,
    changeValue: () => null
  });
  internals.changeLabel = createChangeLabel(internals);
  internals.changeValue = createChangeValue(internals);
  return internals as Instance<Displayable<T>>;
};