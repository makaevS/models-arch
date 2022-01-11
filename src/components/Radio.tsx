import React from 'react';
import { Observer, observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { SelectOption } from '../models/selectOption';

type RadioProps<T> = {
  model: SelectOption<T>
}

const Radio = observer(<T,>({ model }: RadioProps<T>) => {
  const {
    displayable,
    selectable
  } = model;
  return (
    <label>
      <Observer>
        {() => (
          <input
            type="radio"
            value={displayable.value as unknown as undefined}
            disabled={!selectable.allowSelect}
            checked={selectable.selected}
            onChange={ () => selectable.handleSelected(true) }
          />
        )}
      </Observer>
      <Observer>
        {() => (<>{displayable.label}</>)}
      </Observer>
    </label>
  )
});

export default Radio;