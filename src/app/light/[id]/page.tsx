"use client";



// Imports

import { useParams } from "next/navigation";



// Component

export default (): React.ReactNode => {

    const { id } = useParams();

    return(
        <div className="w-full h-full">
            {id}
        </div>
    );
};