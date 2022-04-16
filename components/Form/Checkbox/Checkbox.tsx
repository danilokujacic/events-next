import { FunctionComponent, HTMLProps } from 'react';

const Checkbox: FunctionComponent<HTMLProps<HTMLInputElement>> = ({
  label,
  className,
  id,
}) => {
  return (
    <div className='w-100'>
      <input type='checkbox' className={className} id={id} />
      <label className='form-check-label px-2' htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
