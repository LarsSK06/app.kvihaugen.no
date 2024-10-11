// Imports

import { t } from "@/utils/i18n";

import Button from "./Button";



// Component

export default (): React.ReactNode => (
    <nav className="h-full">
        <ul className="h-full flex gap-8">
            <Button href="/">
                {t("Home")}
            </Button>
        </ul>
    </nav>
);