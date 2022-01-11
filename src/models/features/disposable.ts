import { makeAutoObservable } from "mobx";
import { With } from "..";

/**
 * `add` - Function that add disposer to array of disposers.
 * 
 * `dispose` - Function that disposes model and all model's disposers.
 */
 type Disposable = {
  /** Function that add disposer to array of disposers. */
  add(disposer: () => void): void;
  /** Function that disposes model and all model's disposers. */
  dispose(): void;
}

/** Model that has `Disposable`. */
type WithDisposable = With<Disposable, 'disposable'>;

/** Function that creates `disposable` observable. */
const createDisposable = (): Disposable => {
  const disposers: (() => void)[] = [];
  return makeAutoObservable({
    add: (disposer) => disposers.push(disposer),
    dispose: () => disposers.forEach(disposer => disposer())
  });
}

export type { Disposable, WithDisposable };
export { createDisposable };