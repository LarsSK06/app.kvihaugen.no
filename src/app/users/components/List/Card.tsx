// Imports

import { t } from "@/utils/i18n";
import { Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";



// Types

interface IProps{
    id: number;
    name: string;
    email: string;
}



// Component

export default ({
    id,
    name,
    email
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
        </li>
    );
};