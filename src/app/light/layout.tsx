// Imports

import { IParentProps } from "@/utils/types";

import Sidebar from "@/components/shared/Sidebar";



// Component

export default ({ children }: IParentProps): React.ReactNode => (
    <div className="h-torso flex">
        <Sidebar/>
        <main className="h-full flex-grow">
            {children}
        </main>
    </div>
);