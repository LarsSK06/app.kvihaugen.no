// Imports

import Loader from "./Loader";
import Modal from "./Modal";



// Types

interface IProps{
    id: string;
    open: boolean;
}



// Component

export default ({ id, open }: IProps): React.ReactNode => (
    <Modal id={id} open={open}>
        <div className="w-64 h-48 flex justify-center items-center">
            <Loader/>
        </div>
    </Modal>
);