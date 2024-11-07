// Imports

import { useAnchorRouting, UseAnchorRoutingFunction } from "@/utils/hooks/use-anchor-routing";
import { t } from "@/utils/i18n";
import { IPublicUser } from "@/utils/types/users";
import { Button, TableCell, TableRow, Typography } from "@mui/material";



// Types

interface IProps{
    user: IPublicUser;
    admin: boolean;
    onEditClick: (id: number) => void;
    onDeleteClick: (id: number) => void;
}



// Component

export default ({ user, admin, onEditClick, onDeleteClick }: IProps): React.ReactNode => {

    const route: UseAnchorRoutingFunction = useAnchorRouting();

    return (
        <TableRow>
            <TableCell>
                <Typography>
                    {user.id}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {`${user.lastName}, ${user.firstName}`}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {user.gender}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {user.email}
                </Typography>
            </TableCell>
            <TableCell>
                <img
                    src={user.administrator ? "/icons/check.svg" : "/icons/cross.svg"}
                    alt={t(user.administrator ? "all.Yes" : "all.No")}
                    title={t(user.administrator ? "all.Yes" : "all.No")}
                    className="h-4"
                />
            </TableCell>
            <TableCell>
                <img
                    src={user.active ? "/icons/check.svg" : "/icons/cross.svg"}
                    alt={t(user.active ? "all.Yes" : "all.No")}
                    title={t(user.active ? "all.Yes" : "all.No")}
                    className="h-4"
                />
            </TableCell>
            <TableCell className="flex gap-2">
                <Button variant="outlined" href={`/users/${user.id}`} onClick={route}>
                    {t("all.View")}
                </Button>
                {admin && (
                    <>
                        <Button variant="outlined" onClick={(): void => onEditClick(user.id)} color="warning">
                            {t("all.Edit")}
                        </Button>
                        <Button variant="outlined" onClick={(): void => onDeleteClick(user.id)} color="error">
                            {t("all.Delete")}
                        </Button>
                    </>
                )}
            </TableCell>
        </TableRow>
    );
};