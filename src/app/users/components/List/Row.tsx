// Imports

import { TableCell, TableRow, Typography } from "@mui/material";

import Link from "next/link";



// Types

interface IProps{
    id: number;
    name: string;
    email: string;
}



// Component

export default ({ id, name, email}: IProps): React.ReactNode => (
    <TableRow>
        <TableCell>
            <Typography>
                {id}
            </Typography>
        </TableCell>
        <TableCell>
            <Link href={`/users/${id}`}>
                <Typography>
                    {name}
                </Typography>
            </Link>
        </TableCell>
        <TableCell>
            <Link href={`mailto:${email}`}>
                <Typography>
                    {email}
                </Typography>
            </Link>
        </TableCell>
    </TableRow>
);