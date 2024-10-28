// Imports

import { t } from "@/utils/i18n";
import { Button, TableCell, TableRow, Typography } from "@mui/material";

import Link from "next/link";



// Types

interface IProps{
    id: number;
    name: string;
    email: string;
    admin: boolean;
    onEditClick: (id: number) => void;
    onDeleteClick: (id: number) => void;
}



// Component

export default ({ id, name, email, admin, onEditClick, onDeleteClick }: IProps): React.ReactNode => (
    <TableRow key={id}>
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
        {admin && (
            <TableCell className="flex gap-1">
                <Button onClick={(): void => onEditClick(id)} variant="outlined">
                    {t("all.Edit")}
                </Button>
                <Button onClick={(): void => onDeleteClick(id)} variant="outlined" color="error">
                    {t("all.Delete")}
                </Button>
            </TableCell>
        )}
    </TableRow>
);