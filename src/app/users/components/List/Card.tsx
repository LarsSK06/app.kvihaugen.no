// Imports

import { t } from "@/utils/i18n";
import { Button, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";



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

export default ({
    id,
    name,
    email,
    admin,
    onEditClick,
    onDeleteClick
}: IProps): React.ReactNode => {

    return (
        <li className="box box-p">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography>
                                {t("all.Id")}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>
                                {id}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography>
                                {t("all.Name")}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>
                                {name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography>
                                {t("all.Email")}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography>
                                {email}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {admin && (
                <div className="flex flex-col gap-1 mt-4">
                    <Button onClick={(): void => onEditClick(id)} variant="outlined">
                        {t("all.Edit")}
                    </Button>
                    <Button onClick={(): void => onDeleteClick(id)} variant="outlined" color="error">
                        {t("all.Delete")}
                    </Button>
                </div>
            )}
        </li>
    );
};