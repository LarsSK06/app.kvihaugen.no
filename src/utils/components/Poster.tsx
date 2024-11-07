// Imports

import { IParentProps } from "../types";



// Component

export default ({ children }: IParentProps): React.ReactNode => (
    <main className="w-full h-torso flex justify-center items-center">
        {children}
    </main>
);