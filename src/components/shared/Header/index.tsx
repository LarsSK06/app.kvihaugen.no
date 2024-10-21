// Imports

import Navigation from "./Navigation";



// Component

export default (): React.ReactNode => {
    return (
        <header className="h-header border-b border-b-color-2 border-solid">
            <div className="responsive h-full flex justify-between items-center">
                <Navigation/>
            </div>
        </header>
    );
};