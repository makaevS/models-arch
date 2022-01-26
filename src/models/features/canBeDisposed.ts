import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  makeInstance
} from "..";

export type CanBeDisposed = MakeModel<'CanBeDisposed', {
  disposers: (() => void)[]
}, {
  add: (disposer: () => void) => void;
  dispose: () => void;
}, {}, 'disposers'>;

export const createDefaultAdd = (internals: Internals<CanBeDisposed>) => (disposer: () => void) => {
  internals.disposers?.push(disposer);
}

export const createDefaultDispose = (internals: Internals<CanBeDisposed>) => () => internals.disposers?.forEach(disposer => disposer())

export const createCanBeDisposed = (
  params?: Defaults<CanBeDisposed>
): Instance<CanBeDisposed> => {
  const {
    disposers = [],
    createAdd = createDefaultAdd,
    createDispose = createDefaultDispose,
    createChangeDisposers = (
      internals: Internals<CanBeDisposed>
    ) => (value: (() => void)[]) => {
      internals.dispose();
      internals.disposers = value;
    }
  } = params ?? {};
  const internals: Internals<CanBeDisposed> = {
    disposers,
    add: () => null,
    dispose: () => null,
    changeDisposers: () => null
  };
  internals.add = createAdd(internals);
  internals.dispose = createDispose(internals);
  internals.changeDisposers = createChangeDisposers(internals);
  return makeInstance(internals);
}