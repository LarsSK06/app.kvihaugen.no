// Imports

import classNames from "classnames"



// Component

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>): React.ReactNode => (
    <hr {...props} className={classNames("border-solid border-t border-t-color-2", props.className)}/>
);