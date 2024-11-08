// Imports

import Sidebar from "@/utils/components/Sidebar";

import { IParentProps } from "@/utils/types";



// Component

export default ({ children }: IParentProps): React.ReactNode => (
    <div className="w-full h-torso flex">
        <Sidebar></Sidebar>

        <main className="w-0 h-full flex-grow overflow-auto">
            {children}
        </main>
    </div>
);