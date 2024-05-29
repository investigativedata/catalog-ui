import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Fuse from "fuse.js";

import filterOptions, { TActiveFilters } from "~/util/filterOptions";
import { applyActiveFilters } from '~/util/util'
import { ICatalogTransformed, IDatasetTransformed } from "~/util/transformFTM";


const initializeSearchIndex = (items: any[]) => {
 return new Fuse(items, {
   threshold: 0,
   ignoreLocation: true,
   keys: ["title"],
 });
}

type TCatalogContext = {
 searchValue: string,
 setSearchValue: (value: string) => void,
 activeFilters: TActiveFilters,
 filteredItems: IDatasetTransformed[]
}

export const CatalogContext = createContext<TCatalogContext | null>(null);

type CatalogContextProps = {
 catalog: ICatalogTransformed
}

export default function CatalogContextWrapper({ catalog, children }: React.PropsWithChildren<CatalogContextProps>) {
 const searchParams = useSearchParams()

 const getFiltersFromUrl = () => filterOptions.reduce(
   (acc, { field }) => ({ ...acc, [field]: searchParams.getAll(field) }),
   { 
     contentType: [],
     frequency: [],
     tags: [],
     countries: []
   }
 );

 const [searchValue, setSearchValue] = useState<string>('');
 const [searchIndex, setSearchIndex] = useState<any>();
 const [activeFilters, setActiveFilters] = useState<TActiveFilters>(getFiltersFromUrl());
 const [filteredItems, setFilteredItems] = useState<IDatasetTransformed[]>([]);


 useEffect(() => {
  if (catalog?.datasets) {
   setSearchIndex(initializeSearchIndex(catalog?.datasets))
  }
}, [catalog?.datasets]);


 useEffect(() => {
   const filterObj = getFiltersFromUrl()
   setActiveFilters(filterObj)
 }, [searchParams]);
 
 
 useEffect(() => {
   if (!searchIndex) {
    return;
   }

   let items = catalog?.datasets

   if (searchValue.length > 0) {
     items = searchIndex.search(searchValue)
       .map((result: any) => result.item);
   }

   if (!items) {
    return;
  }

   items = applyActiveFilters(items, activeFilters)
   
   if (!!items) {
     setFilteredItems(items)
   }
 }, [searchValue, searchIndex, activeFilters]);

  return (
   <CatalogContext.Provider
     value={{
       searchValue,
       setSearchValue,
       activeFilters,
       filteredItems
     }}
   >
     {children}
   </CatalogContext.Provider>
  );
}