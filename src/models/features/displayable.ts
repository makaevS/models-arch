import { makeAutoObservable } from "mobx";
import {
  ChangeMethods,
  CreateMethods,
  Internals,
  OmitMethods,
  With
} from "..";

export type Displayable<T> =
  & Readonly<DisplayableFields<T>>
  & DisplayableMethods<T>;

export type WithDisplayable<T> =
  With<Displayable<T>, 'displayable'>;

export type DisplayableDefault<T> =
  & Pick<OmitMethods<Displayable<T>, 'value'>, 'value'>
  & Partial<
    & DisplayableDefaultMethods<T>
    & Exclude<OmitMethods<Displayable<T>>, 'value'>
  >;

export type WithDisplayableDefault<T> =
  With<DisplayableDefault<T>, 'displayableDefault'>;

type DisplayableFields<T> = {
  label: string;
  value: T;
}

type DisplayableMethods<T> = ChangeMethods<DisplayableFields<T>>;

type DisplayableDefaultMethods<T> = CreateMethods<Displayable<T>>;

export const createDefaultChangeLabel = <T>(internals: Internals<Displayable<T>>) => (value: string) => {
  internals.label = value;
}

export const createDefaultChangeValue = <T>(internals: Internals<Displayable<T>>) => (value: T) => {
  internals.value = value;
}

export const createDisplayable = <T>(
  params: DisplayableDefault<T>
): Displayable<T> => {
  const {
    label = String(params.value),
    value,
    createChangeLabel = createDefaultChangeLabel,
    createChangeValue = createDefaultChangeValue
  } = params;
  const internals: Internals<Displayable<T>> = makeAutoObservable({
    label,
    value,
    changeLabel: () => null,
    changeValue: () => null
  });
  internals.changeLabel = createChangeLabel(internals);
  internals.changeValue = createChangeValue(internals);
  return internals as Displayable<T>;
};