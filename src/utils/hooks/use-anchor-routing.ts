// Imports

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";



// Types

export type UseAnchorRoutingInput = React.MouseEvent<HTMLAnchorElement>;

export type UseAnchorRoutingFunction =
    (input: UseAnchorRoutingInput) => void;



// Functions

export function useAnchorRouting(): UseAnchorRoutingFunction{

    const router: AppRouterInstance = useRouter();

    return (input: UseAnchorRoutingInput): void => {
        if(typeof input == "string")
            return router.push(input);

        input.preventDefault();

        router.push(
            input.currentTarget.href
        );
    };
}