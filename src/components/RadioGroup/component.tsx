import React from 'react';
import './component.css';
import { observer } from 'mobx-react-lite';
import { Select } from '../../models/select';
import Radio from '../Radio';
import { SelectOption } from '../../models/selectOption';
import { Instance, WithInstance } from '../../models';

type RadioGroupProps<T> = WithInstance<Select<Instance<SelectOption<T>>>>;

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