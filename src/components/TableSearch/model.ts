import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
} from "../../models";
import {
  createDisableable,
  Disableable,
} from "../../models/features/disableable";
import {
  createDisplayable,
  Displayable,
} from "../../models/features/displayable";

export type Search = MakeModel<
  'Search',
  With<Disableable> & With<Displayable<string>>,
  {
    handleChange: (value: string) => void;
    handleSubmit: () => void;
  },
  {},
  'disableable' | 'displayable'
>;

export const createDefaultHandleChange = (model: Internals<Search>) => (value: string) => {
  model.displayable?.changeLabel(value);
}

export const createDefaultHandleSubmit = (model: Internals<Search>) => () => {
  model.displayable?.changeValue(model.displayable.label);
}

export const createSearch = (
  params?: Defaults<Search>
): Instance<Search> => {
  const {
    disableable,
    displayable,
    createHandleChange = createDefaultHandleChange,
    createHandleSubmit = createDefaultHandleSubmit
  } = params ?? {};
  const internals: Internals<Search> = makeAutoObservable({
    disableable: disableable ?? createDisableable(),
    displayable: displayable ?? createDisplayable({ value: '' }),
    handleChange: () => null,
    handleSubmit: () => null
  });
  internals.handleChange = createHandleChange(internals);
  internals.handleSubmit = createHandleSubmit(internals);
  return internals as Instance<Search>;
}