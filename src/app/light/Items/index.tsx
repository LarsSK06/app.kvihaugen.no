// Imports

import { IGetLight } from "@/utils/types";
import MenuItem from "./Item";

// Types

interface IProps{
    lights?: IGetLight[];
    loading: boolean;
}



// Component

export default ({ lights, loading }: IProps): React.ReactNode => {
    return lights && !loading
        ? lights.map((i: IGetLight): React.ReactNode => (
            <MenuItem id={i.id} name={i.name} key={i.id}/>
        ))
        : [...Array(7)].map((i: number): React.ReactNode => (
            <li className="skeleton w-full h-12" key={i}/>
        ));
};