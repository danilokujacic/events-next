import { FunctionComponent, HTMLProps, SyntheticEvent } from 'react';
import useInput from '../../../hooks/useInput';
import { IInputProps } from '../../../types/Form';
import ErrorBox from '../ErrorBox/ErrorBox';
import FieldWrapper from '../FieldWrapper';

const Input: FunctionComponent<HTMLProps<HTMLInputElement> & IInputProps> = ({
  label,
  id,
  name,
  type,
  placeholder,
  onInputChange,
  required,
  className,
}) => {
  const { handleChange, value, errors } = useInput({
    name: name || '',
    onInputChange,
  });

  const onChange = (event: SyntheticEvent) => {
    const evTarget: any = event.target;

    handleChange(name, evTarget.value);
  };

  return (
    <FieldWrapper id={id} label={label} errors={errors} required={required}>
      <input
        name={name}
        type={type}
        id={id}
        onChange={onChange}
        value={value || ''}
        className={className}
        placeholder={placeholder}
      />
    </FieldWrapper>
  );
};

export default Input;
