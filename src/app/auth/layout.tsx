// Imports

import TorsoCenterContent from "@/components/shared/TorsoCenterContent";

import { IParentProps } from "@/utils/types";



// Component

export default ({ children }: IParentProps): React.ReactNode => (
    <TorsoCenterContent>
        {children}
    </TorsoCenterContent>
);