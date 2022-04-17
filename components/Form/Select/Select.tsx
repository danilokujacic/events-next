import { FunctionComponent, HTMLProps, SyntheticEvent } from 'react';
import useInput from '../../../hooks/useInput';
import { IInputProps } from '../../../types/Form';
import ErrorBox from '../ErrorBox/ErrorBox';
import FieldWrapper from '../FieldWrapper';

type Option = {
  value: string;
  label: string;
};

interface ISelectProps {
  options: Option[];
}

const Select: FunctionComponent<
  HTMLProps<HTMLInputElement> & ISelectProps & IInputProps
> = ({
  required,
  multiple,
  className,
  onInputChange,
  id,
  label,
  name,
  placeholder,
  options,
}) => {
  const { handleChange, value, errors } = useInput({
    name: name || '',
    onInputChange,
  });

  const onChangeMulti = (event: SyntheticEvent) => {
    const evTarget: any = event.target;

    const selectedOptions = Array.from(evTarget.options)
      .filter((option: any, index: number) => index !== 0 && option.selected)
      .map((option: any) => option.value);

    handleChange(name, selectedOptions);
  };

  const onChange = (event: SyntheticEvent) => {
    const evTarget: any = event.target;

    handleChange(name, evTarget.value);
  };

  const defaultValue = multiple ? [] : '';

  return (
    <FieldWrapper id={id} label={label} errors={errors} required={required}>
      <select
        name={name}
        id={id}
        value={value || defaultValue}
        className={className}
        multiple={multiple}
        placeholder={placeholder}
        onChange={multiple ? onChangeMulti : onChange}>
        <option hidden value=''></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};

export default Select;
