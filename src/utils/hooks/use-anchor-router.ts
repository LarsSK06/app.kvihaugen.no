// Imports

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";



// Types

export type UseAnchorRouterEvent =
    React.MouseEvent<HTMLAnchorElement>;

export type UseAnchorRouterFunction =
    (event: UseAnchorRouterEvent) => void;



// Functions

export function useAnchorRouter(): UseAnchorRouterFunction{

    const router: AppRouterInstance = useRouter();

    return (event: UseAnchorRouterEvent): void => {
        event.preventDefault();

        if(!event.currentTarget.href)
            return;

        router.push(event.currentTarget.href);
    };
}