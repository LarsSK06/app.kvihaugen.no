// Imports

import Profile from "./Profile";
import Navigation from "./Navigation";

import { useState } from "react";



// Component

export default (): React.ReactNode => {

    //const [user, setUser] = useState<{}>();

    return (
        <header className="h-header border-b border-b-color-2 border-solid">
            <div className="responsive h-full flex justify-between items-center">
                <Navigation/>
                {/*<Profile
                    avatar={user?.avatar}
                    name={user?.name}
                />*/}
            </div>
        </header>
    );
};