import { forwardRef, FunctionComponent } from "react";

type FileType = 'images' | 'documents' | 'files';

interface INoFilesComponentProps {
    type: FileType;
}



const NoFilesComponent = forwardRef<HTMLDivElement | null, INoFilesComponentProps>(({type}, ref) => {
  return (
    <div ref={ref}>Import {type}</div>
  )
});

export default NoFilesComponent;