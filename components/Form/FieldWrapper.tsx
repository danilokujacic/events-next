import { FunctionComponent } from "react"
import ErrorBox from "./ErrorBox/ErrorBox";

interface IFieldWrapper {
    errors?: string;
    required?: boolean;
    label?: string;
    id?: string;
    className?:string;
}

const FieldWrapper: FunctionComponent<IFieldWrapper> = ({className, errors,required, label,id, children}) => {
  return (
    <div className={`${className ? className : 'w-100 d-flex flex-column my-2'}`}>
        <label className={`mb-2 ${errors ? "text-danger" : ''}`} htmlFor={id}>{label} {required ? "*" : ''}</label>
        {children}
        <ErrorBox message={errors} />
    </div>
    
  )
}

export default FieldWrapper