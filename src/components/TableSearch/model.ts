import { makeAutoObservable } from "mobx";
import {
  Instance,
  InstanceDefault,
  Internals,
  MakeModel,
  WithInstance,
  WithInstanceDefault,
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
  WithInstance<Disableable> & WithInstance<Displayable<string>>,
  {
    handleChange: (value: string) => void;
    handleSubmit: () => void;
  },
  Partial<
    & WithInstanceDefault<Disableable>
    & WithInstanceDefault<Displayable<string>>
  >,
  'disableable' | 'displayable'
>;

export const createDefaultHandleChange = (model: Internals<Search>) => (value: string) => {
  model.displayable?.changeLabel(value);
}

export const createDefaultHandleSubmit = (model: Internals<Search>) => () => {
  model.displayable?.changeValue(model.displayable.label);
}

export const createSearch = (
  params?: InstanceDefault<Search>
): Instance<Search> => {
  const {
    disableable,
    disableableDefault,
    displayable,
    displayableDefault,
    createHandleChange = createDefaultHandleChange,
    createHandleSubmit = createDefaultHandleSubmit
  } = params ?? {};
  const internals: Internals<Search> = makeAutoObservable({
    disableable: disableable ?? createDisableable(disableableDefault),
    displayable: displayable ?? createDisplayable(
      displayableDefault ?? { value: '' }
    ),
    handleChange: () => null,
    handleSubmit: () => null
  });
  internals.handleChange = createHandleChange(internals);
  internals.handleSubmit = createHandleSubmit(internals);
  return internals as Instance<Search>;
}