// Imports

import { IParentProps } from "@/utils/types";
import { nanoid } from "nanoid";



// Types

interface IProps extends IParentProps{
    id?: string;
    open: boolean;
    onClose: () => void;
    onCancel: () => void;
    onAccept: () => void;
}



// Component

export default ({
    id = nanoid(),
    open,
    onClose,
    onCancel,
    onAccept,
    children
}: IProps): React.ReactNode => {

    return (
        <div className="w-full h-vp">
            
        </div>
    );
};