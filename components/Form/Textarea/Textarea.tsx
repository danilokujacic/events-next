import { FunctionComponent, HTMLProps, SyntheticEvent } from 'react';
import useInput from '../../../hooks/useInput';
import { IInputProps } from '../../../types/Form';
import styles from './Textarea.module.scss';
import ErrorBox from '../ErrorBox/ErrorBox';
import FieldWrapper from '../FieldWrapper';

const Textarea: FunctionComponent<
  HTMLProps<HTMLTextAreaElement> & IInputProps
> = ({ label, id, name, placeholder, className, required, onInputChange }) => {
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
      <textarea
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        className={`${className} ${styles.textarea} w-100`}
        placeholder={placeholder}
      />
    </FieldWrapper>
  );
};

export default Textarea;
