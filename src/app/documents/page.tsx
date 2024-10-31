// Imports

import { t } from "@/utils/i18n";
import { Typography } from "@mui/material";



// Component

export default (): React.ReactNode => (
    <div className="w-full h-full flex justify-center items-center">
        <Typography>
            {t("documents.ChooseADocument")}
        </Typography>
    </div>
);