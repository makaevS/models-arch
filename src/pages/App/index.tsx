import React from 'react';
import './index.css';
import logo from './logo.svg';
import { makeAutoObservable, reaction } from "mobx";
import { Instance, Internals, useModel, With } from '../../models';
import { PageProvider } from '../../models/pageContext';
import { TableLimit } from '../../components/TableLimit/component';
import { TableSearch } from '../../components/TableSearch';
import { createCanBeDisposed, CanBeDisposed } from "../../models/features/canBeDisposed";
import { createLimit, Limit } from '../../components/TableLimit';
import { createSearch, Search } from '../../components/TableSearch/model';
import { createCanBeDisabled, CanBeDisabled } from '../../models/features/canBeDisabled';
import { Observer } from 'mobx-react-lite';
import { Modal } from '../../components/Modal';
import PeriodForm from '../../components/PeriodForm';

type AppModel =
  & {
    showModal: () => void;
  }
  & Readonly<
    & With<CanBeDisposed>
    & With<CanBeDisabled>
    & With<Limit>
    & With<Search>
    & {
      modals: unknown[]
    }
  >

const createAppModel = (): AppModel => {
  const internals: Internals<AppModel> = {
    canBeDisposed: createCanBeDisposed(),
    canBeDisabled: createCanBeDisabled(),
    limit: null,
    search: null,
    modals: [],
    showModal: () => null,
  };
  const createChangeCanBeDisabled = () => (value: Instance<CanBeDisabled>) => {
    internals.canBeDisabled = value;
  };
  internals.limit = createLimit({
    canBeDisabled: (internals as AppModel).canBeDisabled,
    createChangeCanBeDisabled
  });
  internals.search = createSearch({
    canBeDisabled: (internals as AppModel).canBeDisabled,
    createChangeCanBeDisabled,
  });
  internals.showModal = () => {
    internals.modals?.push({});
  };
  const model = makeAutoObservable(internals) as AppModel;
  model.canBeDisposed.add(
    reaction(
      () => model.limit.select.hasSelected.selected,
      (value) => console.log(`Table limit: ${value}`)
    )
  )
  model.canBeDisposed.add(
    reaction(
      () => model.search.canBeDisplayed.value,
      (value) => console.log(`Table search: ${value}`)
    )
  )
  return model;
}

function App() {
  const [ model ] = useModel(createAppModel);
  const {
    limit,
    search,
    showModal
  } = model;
  return (
    <PageProvider model={model}>
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <Observer>
            {() => {
              const {
                canBeDisabled: {
                  disabled,
                  changeDisabled
                }
              } = model;
              return (
                <button type='button' onClick={() => {
                  changeDisabled(!disabled)
                }}>
                  {disabled ? 'enable' : 'disable'}
                </button>
              )
            }}
          </Observer>
          <fieldset>
            <TableLimit limit={limit} />
            <TableSearch search={search} />
          </fieldset>
          <button type='button' onClick={showModal}>show modal</button>
        </header>
      </div>
      <Observer>
        {() => (
          <>
            {model.modals.map((modal, index) => (
              <Modal key={index}>
                {{
                  Header: <h2>Choose period</h2>,
                  Content: <PeriodForm />
                }}
              </Modal>
            ))}
          </>
        )}
      </Observer>
    </PageProvider>
  );
}

export default App;
