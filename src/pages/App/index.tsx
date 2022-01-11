import React from 'react';
import './index.css';
import logo from './logo.svg';
import { makeAutoObservable, reaction } from "mobx";
import { useModel } from '../../models';
import { PageProvider } from '../../models/pageContext';
import RadioGroup from '../../components/RadioGroup';
import TableLimit from '../../components/TableLimit';
import TableSearch from '../../components/TableSearch';
import { createDisposable } from "../../models/features/disposable";
import { createSelect } from "../../models/select";
import { createSelectOption } from "../../models/selectOption";
import { createLimit } from '../../models/tables/limit';
import { createSearch } from '../../models/tables/search';
import { createDisableable } from '../../models/features/disableable';

const createAppModel = () => {
  const disposable = createDisposable();
  const disableable = createDisableable();
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
    displayable: option,
    selectable: {
      selected: !index
    }
  }));
  const radioGroup = createSelect({
    selected: radioOptions[0],
    options: radioOptions,
  });
  const oldChangeSelected = radioGroup.changeSelected;
  radioGroup.changeSelected = (selected) => {
    const { displayable: { value = true } } = selected ?? { displayable: {} };
    disableable.changeDisabled(value);
    oldChangeSelected(selected);
  }
  const limit = createLimit({
    disableable: disableable
  });
  const search = createSearch({
    disableable: disableable
  });
  disposable.add(
    reaction(
      () => radioGroup.selected?.displayable.value,
      (value) => console.log(`Selected option: ${value}`)
    )
  )
  disposable.add(
    reaction(
      () => limit.select.selected,
      (value) => console.log(`Table limit: ${value}`)
    )
  )
  disposable.add(
    reaction(
      () => search.displayable.value,
      (value) => console.log(`Table search: ${value}`)
    )
  )
  return makeAutoObservable({
    disposable,
    radioGroup,
    limit,
    search
  });
}

function App() {
  const [ model ] = useModel(createAppModel);
  const {
    radioGroup,
    limit,
    search
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
        </header>
      </div>
    </PageProvider>
  );
}

export default App;
