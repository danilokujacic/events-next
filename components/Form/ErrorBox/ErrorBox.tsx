import { FunctionComponent } from "react";

interface IErrorBoxProps {
    message?: string;
}

const ErrorBox: FunctionComponent<IErrorBoxProps> = ({message}) => {
  return (
    message ? <p className="text-danger my-2 font-italic">{message}</p> : <></>
  )
}

export default ErrorBox