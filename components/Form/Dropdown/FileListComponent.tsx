import { FunctionComponent, SyntheticEvent } from "react";
import FileDisplayComponent from "./FileDisplayComponent";
import styles from "./Dropdown.module.scss";

interface IFilelistComponent {
    files: File[];
    onRemove: (fileID:string) => void;
}

const FileListComponent: FunctionComponent<IFilelistComponent> = ({files, onRemove}) => {


  return (
    <div className={`flex-column w-50 ${styles['item-container']}`}>{files.map(file => <FileDisplayComponent onRemove={() => onRemove(file.name)} file={file} key={file.name}/>)}</div>
  )
}

export default FileListComponent