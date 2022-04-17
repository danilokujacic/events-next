import {
  SyntheticEvent,
  useRef,
  DragEvent,
  FunctionComponent,
  useState,
  ChangeEvent,
} from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';
import FieldWrapper from '../FieldWrapper';
import useInput from '../../../hooks/useInput';
import styles from './Dropdown.module.scss';
import FileListComponent from './FileListComponent';
import NoFilesComponent from './NoFilesComponent';

interface IDropdownProps {
  onDrop: (name: string, files: File[]) => void;
  onRemove: (name: string, files: File[]) => void;
  label: string;
  multiple?: boolean;
  name: string;
  required?: boolean;
}

const Dropdown: FunctionComponent<IDropdownProps> = ({
  name,
  onDrop,
  label,
  onRemove,
  multiple = false,
  required,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<File[] | null>(null);

  const handleDragOver = (event: SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (ref.current) {
      ref.current.classList.add('border-primary');
    }
    if (messageRef.current) {
      messageRef.current.classList.add('text-primary');
    }
  };
  const handleDragOut = (event: SyntheticEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.classList.remove('border-primary');
    }
    if (messageRef.current) {
      messageRef.current.classList.remove('text-primary');
    }
  };
  const handleMouseOver = (event: SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (ref.current) {
      ref.current.classList.add('border-primary');
    }
    if (messageRef.current) {
      messageRef.current.classList.add('text-primary');
    }
  };
  const handleMouseOut = (event: SyntheticEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.classList.remove('border-primary');
    }
    if (messageRef.current) {
      messageRef.current.classList.remove('text-primary');
    }
  };

  const handleRemove = (id: string) => {
    if (items) {
      setItems(items.filter((file) => file.name !== id));
      onRemove(
        name,
        items.filter((file) => file.name !== id),
      );
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (ref.current) {
      ref.current.classList.remove('border-primary');
    }
    if (messageRef.current) {
      messageRef.current.classList.remove('text-primary');
    }
    const files = [];
    for (let i = 0; i < event.dataTransfer.items.length; i++) {
      const item = event.dataTransfer.items[i];
      const fileItem = item.getAsFile();
      if (fileItem) {
        files.push(fileItem);
      }
    }
    setItems(files);
    onDrop(name, files);
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      setItems(Array.from(event.target.files));
      onDrop(name, Array.from(event.target.files));
    }
  };

  const { errors } = useInput({ name, onInputChange: () => {} });

  return (
    <FieldWrapper
      className='w-100 d-flex flex-column'
      label={label}
      required={required}
      errors={errors}>
      <div
        ref={ref}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onDrop={handleDrop}
        onClick={handleContainerClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragOut}
        className={`container-fluid p-3 ${styles['dropdown-container']}`}>
        <input
          onChange={handleInputChange}
          multiple={multiple}
          ref={inputRef}
          type='file'
          style={{ display: 'none' }}
        />
        {!items || !items.length ? (
          <NoFilesComponent ref={messageRef} type='images' />
        ) : (
          <FileListComponent onRemove={handleRemove} files={items} />
        )}
      </div>
    </FieldWrapper>
  );
};

export default Dropdown;
