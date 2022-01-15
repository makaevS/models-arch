import React from 'react';
import './index.css';
import logo from './logo.svg';
import { makeAutoObservable, reaction } from "mobx";
import { Instance, Internals, useModel, With } from '../../models';
import { PageProvider } from '../../models/pageContext';
import { RadioGroup } from '../../components/RadioGroup';
import { TableLimit } from '../../components/TableLimit/component';
import { TableSearch } from '../../components/TableSearch';
import { createDisposable, Disposable } from "../../models/features/disposable";
import { createSelectOption, SelectOption } from "../../models/selectOption";
import { createLimit, Limit } from '../../components/TableLimit';
import { createSearch, Search } from '../../components/TableSearch/model';
import { createDisableable, Disableable } from '../../models/features/disableable';
import { Observer } from 'mobx-react-lite';
import { Modal } from '../../components/Modal';
import PeriodForm from '../../components/PeriodForm';
import { createDisplayable } from '../../models/features/displayable';
import { createSelectable } from '../../models/features/selectable';
import { createOptionable } from '../../models/features/optionable';
import { createSelectRadio, SelectRadio } from '../../components/RadioGroup/model';

type AppModel =
  & {
    showModal: () => void
  }
  & Readonly<
    & With<Disposable>
    & With<Disableable>
    & With<Limit>
    & With<Search>
    & {
      radioGroup: Instance<SelectRadio<Instance<SelectOption<boolean>>>>,
      modals: unknown[]
    }
  >

const createAppModel = (): AppModel => {
  const internals: Internals<AppModel> = makeAutoObservable({
    disposable: createDisposable(),
    disableable: createDisableable(),
    limit: null,
    search: null,
    radioGroup: null,
    modals: [],
    showModal: () => null
  });
  internals.limit = createLimit({
    disableable: (internals as AppModel).disableable
  });
  console.log(internals.limit)
  internals.search = createSearch({
    disableable: (internals as AppModel).disableable
  });
  const radioOptions = [
    {
      label: 'enabled',
      value: false
    },
    {
      label: 'disabled',
      value: true
    }
  ].map((option, index) => createSelectOption({
    displayable: createDisplayable(option),
    selectable: createSelectable({
      selected: !index
    })
  }));
  internals.radioGroup = createSelectRadio({
    selected: radioOptions[0],
    optionable: createOptionable({
      options: radioOptions
    }),
  });
  const oldChangeSelected = internals.radioGroup.changeSelected;
  internals.radioGroup.changeSelected = (selected) => {
    const { displayable: { value = true } } = selected ?? { displayable: {} };
    internals.disableable?.changeDisabled(value);
    oldChangeSelected(selected);
  }
  internals.showModal = () => {
    internals.modals?.push({});
  }
  const model = internals as AppModel;
  model.disposable.add(
    reaction(
      () => model.limit.select.selected,
      (value) => console.log(`Table limit: ${value}`)
    )
  )
  model.disposable.add(
    reaction(
      () => model.search.displayable.value,
      (value) => console.log(`Table search: ${value}`)
    )
  )
  model.disposable?.add(
    reaction(
      () => model.radioGroup.selected?.displayable.value,
      (value) => console.log(`Selected option: ${value}`)
    )
  )
  return model;
}

function App() {
  const [ model ] = useModel(createAppModel);
  const {
    radioGroup,
    limit,
    search,
    showModal
  } = model;
  return (
    <PageProvider model={model}>
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <fieldset>
            <RadioGroup select={radioGroup} />
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
