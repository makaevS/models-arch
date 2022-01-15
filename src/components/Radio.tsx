import React from 'react';
import { Observer, observer } from 'mobx-react-lite';
import { SelectOption } from '../models/selectOption';
import { With } from '../models';

type RadioProps<T> = With<SelectOption<T>>;

const Radio = observer(<T,>({ selectOption }: RadioProps<T>) => {
  const {
    displayable,
    selectable
  } = selectOption;
  return (
    <label>
      <Observer>
        {() => (
          <input
            type="radio"
            value={displayable.value as unknown as undefined}
            disabled={!selectable.allowSelect}
            checked={selectable.selected}
            onChange={ () => selectable.changeSelected(true) }
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