import { SyntheticEvent, useContext } from "react";
import FormContext from "./context";


interface InputOptions {
    name: string;
    onInputChange: (name:string, value:string) => void;
    formatValueFunctions?: Function[]
}

const useInput = (options: InputOptions) => {
    const {name, onInputChange} = options;
    const {values, errors} = useContext(FormContext);

    const handleChange = (name:string, value: any ) => {
        let returnValue = value;

        if(options.formatValueFunctions){
            options.formatValueFunctions.forEach(func => {
                returnValue = func(values[name], returnValue)
            })
        }
        

        onInputChange(name, value);
    }


    return {handleChange, value: values[name] || '', errors: errors[name]};
}

export default useInput;