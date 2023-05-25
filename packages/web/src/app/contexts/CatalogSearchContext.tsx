import { ReactNode, createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { without, debounce, isEqual, isEmpty } from 'lodash';
import { iSearchParams, iChip, iSearchResults } from '@chiplets/types';
import { graphQL } from '~web/services/CatalogSearchService';

export interface iCatalogSearchContext {
  setKeywords: (keywords: string) => void
  toggleCategory: (cat: string) => void

  page: number
  setPage: (pageSize: number) => void

  pageSize: number
  setPageSize: (pageSize: number) => void

  criteria: iChip | undefined
  setCriteria: (criteria: iChip) => void
  isLoading: boolean
  searchResults: iSearchResults
}

interface iProps {
  children: ReactNode
}

export const CatalogSearchContext = createContext<undefined | iCatalogSearchContext>(undefined);

export const CatalogSearchProvider = ({ children }: iProps) => {
  const _params = useRef({});
  const [keywords, setKeywords] = useState<string>('');
  const [criteria, setCriteria] = useState<iChip>({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<iSearchResults>({});

  const [fromIndex, setFromIndex] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const _fromIndex = pageSize * page;
    (fromIndex !== _fromIndex) && setFromIndex(_fromIndex <= 0 ? 0 : _fromIndex);
  }, [page]);

  useEffect(() => {
    setPage(0);
  }, [pageSize]);

  useEffect(() => {
    (!keywords || keywords?.length > 3 || !isEmpty(criteria)) && debounce(() => search(), 100)();
  }, [keywords, criteria, pageSize, fromIndex]);

  useEffect(() => {
    if (searchResults?.hits?.length) {
      setIsLoading(false);
    }
  }, [searchResults]);

  const toggleCategory = useCallback((cat: string) => {
    let categories = criteria?.categories || [];
    setCriteria({
      ...criteria,
      categories: categories.includes(cat) ? without(categories, cat) : [cat]
    });
  }, [criteria]);

  const search = useCallback(async () => {
    const params: iSearchParams = { keywords, pageSize, fromIndex };
    if (criteria) {
      params.criteria = criteria;
    }

    if (isEqual(params, _params.current)) return;
    _params.current = params;
    setIsLoading(true);
    graphQL(params).then(setSearchResults).finally(() => setIsLoading(false));
  }, [keywords, criteria, pageSize, fromIndex]);

  return (
    <CatalogSearchContext.Provider value={{
      setKeywords,
      criteria,
      setCriteria,
      toggleCategory,
      searchResults,
      isLoading,
      page,
      setPage,
      pageSize,
      setPageSize
    }}>
      {children}
    </CatalogSearchContext.Provider>
  );
};
