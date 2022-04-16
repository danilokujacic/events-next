import moment from "moment";
import { FunctionComponent, SyntheticEvent } from "react"
import ErrorBox from "../ErrorBox/ErrorBox";
import FieldWrapper from "../FieldWrapper";
import { IInputProps } from "../types";
import useInput from "../useInput";

interface IDateProps {
    pattern?: string;
    label: string;
    name: string;
    value: string;
    id: string;
    className?: string;
    required?:boolean;
}

const Date: FunctionComponent<IDateProps & IInputProps> = ({id,name,label,onInputChange, pattern, className, required}) => {
  const {handleChange, value, errors} = useInput({name, onInputChange})

  const onChange = (event:SyntheticEvent) => {
    const evTarget:any = event.target;

    handleChange(name, moment(evTarget.value).toISOString());
  }

  let defaultValue = '';
  if(moment(value).isValid()){
    defaultValue = moment(value).format('yyyy-MM-DD')
  }

  return (
    <FieldWrapper label={label} id={id} errors={errors} required={required}>
      <input
        name={name}
        type='date'
        value={defaultValue}
        onChange={onChange}
      
        pattern={pattern}
        id={id}
        className={className}
      />
    </FieldWrapper>
  )
}

export default Date