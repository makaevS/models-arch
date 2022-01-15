import React from 'react';
import './component.css';
import { observer } from 'mobx-react-lite';
import Radio from '../Radio';
import { SelectOption } from '../../models/selectOption';
import { Instance, With } from '../../models';
import { SelectRadio } from './model';

type RadioGroupProps<T> = With<SelectRadio<Instance<SelectOption<T>>>>;

export const RadioGroup = observer(<T,>({
  select
}: RadioGroupProps<T>) => {
  const {
    optionable: {
      options
    }
  } = select;
  return (
    <fieldset className='radio-group'>
      {options.map((option, index) => (
        <Radio
          key={index}
          selectOption={option}
        />
      ))}
    </fieldset>
  )
});