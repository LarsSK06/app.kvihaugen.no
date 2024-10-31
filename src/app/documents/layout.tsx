"use client";



import ErrorModal from "@/components/shared/ErrorModal";
// Imports

import HorizontalRule from "@/components/shared/HorizontalRule";
import Sidebar from "@/components/shared/Sidebar";

import { useDebounce } from "@/utils/hooks/use-debounce";
import { useFetch } from "@/utils/hooks/use-fetch";
import { t } from "@/utils/i18n";
import { Endpoint, IParentProps } from "@/utils/types";
import { IPublicDocument } from "@/utils/types/documents";
import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Result from "./components/Result";



// Types

// Component

export default ({ children }: IParentProps): React.ReactNode => {

    const [error, setError] = useState<string>();
    const [results, setResults] = useState<IPublicDocument[]>();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    function onSearch(): void{

    }

    function onSearchFieldChange(event: React.ChangeEvent<HTMLInputElement>): void{
        const value: string = event.currentTarget.value;
        
        if(value == "")
            return;

        setSearchQuery(event.currentTarget.value);
    }

    useDebounce<string>((): void => {
        onSearch()
    }, 2000, searchQuery);

    const {
        loading: areDocumentsLoading,
        call: fetchDocuments
    } = useFetch<IPublicDocument[]>({
        endpoint: Endpoint.Documents,
        onSuccess: setResults,
        onError: (value: string) => {
            if(value !== error) setError(value);
            else setShowErrorModal(true);
        }
    });

    useEffect((): void => {
        fetchDocuments();
    }, []);

    useEffect((): void => {
        if(error) setShowErrorModal(true);
    }, [error]);

    const loading: boolean = areDocumentsLoading;

    return (
        <>
            <ErrorModal
                id="error-modal"
                open={showErrorModal}
                loading={loading}
                error={error}
                onClose={(): void => setShowErrorModal(false)}
            />
            <div className="w-full h-torso flex">
                <Sidebar>
                    <div className="h-full flex flex-col">
                        <TextField
                            className="m-4"
                            label={t("all.Search")}
                            placeholder={t("all.Search")}
                            onChange={onSearchFieldChange}
                        />
                        <HorizontalRule/>
                        {loading || !results ? (
                            <>Loading...</>
                        ) : results.length > 0 ? (
                            <ol>
                                {results.map((i: IPublicDocument): React.ReactNode => (
                                    <Result
                                        key={i.id}
                                        id={i.id}
                                        name={i.name}
                                        publicity={i.publicity}
                                        owner={i.owner.name}
                                    />
                                ))}
                            </ol>
                        ) : (
                            <div className="flex-grow flex justify-center items-center">
                                <div className="flex flex-col items-center gap-2 max-w-full">
                                    <img className="w-12" src="/icons/interface/car-mechanic.svg"/>
                                    <Typography className="max-w-full overflow-hidden overflow-ellipsis text-nowrap">
                                        {t("errors.CouldNotGetAnyResults")}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </div>
                </Sidebar>
                <main className="flex-grow">
                    {children}
                </main>
            </div>
        </>
    );
};