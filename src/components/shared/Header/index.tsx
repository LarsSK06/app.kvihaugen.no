// Imports

import { useGlobalState } from "@/utils/hooks/use-global-state";
import { GlobalState, IGetUser } from "@/utils/types";

import Profile from "./Profile";
import Navigation from "./Navigation";



// Component

export default (): React.ReactNode => {

    const [user, setUser] = useGlobalState<IGetUser>(GlobalState.User);

    return (
        <header className="h-header border-b border-b-glass border-solid">
            <div className="responsive h-full flex justify-between items-center">
                <Navigation/>
                <Profile
                    avatar={user?.avatar}
                    name={user?.name}
                />
            </div>
        </header>
    );
};