"use client";



// Imports

import { useState } from "react";
import { IUserListFilters } from "@/utils/types/users";

import Filters from "./components/Filters";
import List from "./components/List";



// Component

export default (): React.ReactNode => {

    const [filters, setFilters] = useState<IUserListFilters>({});

    return (
        <main className="responsive">
            <Filters filters={filters} setFilters={setFilters}/>
            <List filters={filters}/>
        </main>
    );
}