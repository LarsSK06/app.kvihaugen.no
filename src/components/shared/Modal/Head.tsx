// Imports

import HorizontalRule from "../HorizontalRule";

import { Button, Typography } from "@mui/material";



// Types

interface IProps{
    id: string;
    heading?: string;
    onClose?: () => void;
}



// Component

export default ({ id, heading, onClose }: IProps): React.ReactNode => {

    const labelId: string = `${id}:label`;

    return (
        <>
            <div className="w-full h-fit box-p flex justify-between items-start gap-8">
                {heading && (
                    <Typography id={labelId} variant="h2">
                        {heading}
                    </Typography>
                )}
                <Button onClick={onClose} className="ml-auto">
                    X
                </Button>
            </div>
            <HorizontalRule/>
        </>
    );
};