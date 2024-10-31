// Imports

import { PublicityStatus } from "@/utils/types/documents";
import { Typography } from "@mui/material";

import Link from "next/link";



// Types

interface IProps{
    id: number;
    name: string;
    publicity: PublicityStatus;
    owner: string;
}



// Component

export default ({ id, name, publicity, owner }: IProps): React.ReactNode => (
    <Link href={`/documents/${id}`} className="p-4 flex items-center gap-4 transition-all hover:bg-glass focus:bg-glass">
        <img src="/icons/interface/book-alt.svg" className="h-12"/>
        <div className="flex flex-col">
            <Typography className="leading-fit">
                {name}
            </Typography>
            <Typography className="leading-fit">
                {owner}
            </Typography>
        </div>
    </Link>
);