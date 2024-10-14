// Imports

import { preventDefault } from "@/utils/functions";
import { useAnchorRouter, UseAnchorRouterFunction } from "@/utils/hooks/use-anchor-router";

// Types

interface IProps{
    name: string;
    id: string;
}



// Component

export default ({ name, id }: IProps): React.ReactNode => {

    const route: UseAnchorRouterFunction = useAnchorRouter();

    return (
        <li>
            <a href={`/light/${id}`} onClick={route} onMouseDown={preventDefault} className="h-12 px-4 flex items-center gap-4 rounded-default hover:bg-glass focus:bg-glass transition-all">
                <span className="w-fit h-fit pr-4 border-r border-r-glass border-solid">
                    {id}
                </span>
                <span className="w-0 flex-grow overflow-hidden text-ellipsis text-nowrap">
                    {name}
                </span>
            </a>
        </li>
    );
};