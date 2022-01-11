import React, { createContext, useContext, createElement } from 'react';
import { WithDisposable } from '.';

const PageContext = createContext<WithDisposable | null>(null);

/**
 * Custom hook for `PageContext`.
 * 
 * @returns Page model of type `DisposableModel`.
 * 
 * Intended to be used for cases where page element's model require disposable model in order to register own disposer.
 */
const usePageContext = () => {
  const model = useContext(PageContext);

  if(!model) throw new Error('Page model context must be provided!');
  
  return model;
}

/** Context provider for `PageContext`. */
const PageProvider: React.FC<{ model: WithDisposable; }> = ({
  model,
  children 
}) => createElement(PageContext.Provider, { value: model }, children);

export { usePageContext, PageProvider };