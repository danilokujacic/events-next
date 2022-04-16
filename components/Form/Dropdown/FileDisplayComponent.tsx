import { faFile, faFilePdf, faFileWord, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, SyntheticEvent } from "react"
import { Button } from "react-bootstrap";
import styles from "./Dropdown.module.scss";

interface IFileDisplayComponentProps {
    file: File;
    onRemove: Function;
}

const getIcon = (fileType: string) => {

    if(fileType.includes('image')){
        return <FontAwesomeIcon icon={faImage} />
    }
    if(fileType.includes('pdf')) {
        return <FontAwesomeIcon icon={faFilePdf} />
    }
    if(fileType.includes('doc')){
        return <FontAwesomeIcon icon={faFileWord} />
    }

    return <FontAwesomeIcon icon={faFile} />
}

const FileDisplayComponent: FunctionComponent<IFileDisplayComponentProps> = ({file, onRemove}) => {
  return (
    <div className='w-100 d-flex justify-content-between align-items-center'>
        <div className="d-flex align-items-center"><div className="px-2">{getIcon(file.type)}</div><p className="mb-0 ml-2">{file.name}</p></div> 
        <Button className={styles['remove-button']} onClick={(event) => {
            event.stopPropagation();
            onRemove()
        }}>
            <FontAwesomeIcon className="text-danger" icon={faTrash} />
        </Button>
    </div>
  )
}

export default FileDisplayComponent