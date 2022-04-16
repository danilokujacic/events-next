import moment from "moment";
import Event from "../../interfaces/GraphQL/Event";

type Values = {
    [key:string]: string | string[] | File[] | undefined | null
}


const _checkErrors = (values: Values) => {
    const errors: {[key:string]: string} = {};
    const arrayVals = Object.entries(values);

    arrayVals.forEach(([key,val]) => {
        if(!val || !val.length){
            return errors[key] = 'Required';
        }
        if(typeof val === "string"){
            if(key === 'title' && val.length < 3 && val.length > 50){
                return errors[key] = "Length can't be less than 3 and higher than 50"
            }
            if(key === "description" && val.length < 3 && val.length > 400){
                return errors[key] = "Length can't be less than 3 and higher than 400"
            }
            if(key === "endDate" && typeof values.startDate === "string" && val){
                if(moment(val).diff(moment(values.startDate), 'days') < 0){
                    return errors.startDate = 'End date cannot be before start date';
                }
            }
        }
    })


    return errors;
}

export const submitForm = async (values: Values, disableButtons:Function) => {
    const errors = _checkErrors(values);
    if(Object.keys(errors).length >= 1){
        return {errors, invalid:true};
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        if(!value){
            return;
        }
        if(Array.isArray(value)){
            value.forEach((val) => {
                formData.append(key, val);
            })
            
        }else {
            formData.append(key, value);
        }

        
        
    })

    try {
        disableButtons();
        const response: {success:boolean; event: Event} = await (await fetch('/api/create-event', {
            method: 'POST',
            body: formData,
        })).json();

        disableButtons(true)
        return response.event.Title
        
    }
    catch(err) {
        disableButtons(true)
        if(err instanceof Error){
            return {errors: {server: err.message}, invalid:true};
        }

        return {errors: {invalid:"invalid"}, invalid:true}
        
    }
}
