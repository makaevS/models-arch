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
  const internalDisposers: (() => void)[] = [];
  const {
    disposers = () => internalDisposers,
    createAdd = createDefaultAdd,
    createDispose = createDefaultDispose
  } = params ?? {};
  const internals: Internals<CanBeDisposed> = {
    get disposers() { return disposers(); },
    add: () => null,
    dispose: () => null
  };
  internals.add = createAdd(internals);
  internals.dispose = createDispose(internals);
  return makeInstance(internals);
}