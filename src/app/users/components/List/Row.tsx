// Imports

import { IParentProps } from "@/utils/types";
import { nanoid } from "nanoid";



// Component

export default ({ children }: IParentProps<React.ReactNode[]>): React.ReactNode => (
    <tr className="even:bg-glass">
        {children?.map((i: React.ReactNode): React.ReactNode => (
            <th className="p-2 text-left" key={nanoid()}>
                {i}
            </th>
        ))}
    </tr>
);