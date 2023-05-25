import { useContext } from 'react';

import { Box, CircularProgress } from '@mui/material';

import { SearchInput } from '~web/components/SearchInput';
import { SearchResults } from '~web/components/SearchResults';
import { iCatalogSearchContext, CatalogSearchContext } from '~web/contexts/CatalogSearchContext';

export const Catalog = () => {
  const { isLoading } = useContext(CatalogSearchContext) as iCatalogSearchContext;

  const renderIsLoading = () => (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, alignItems: 'center' }}>
      <CircularProgress color="success" />
    </Box>
  );

  return (
    <Box sx={{ width: '70%', p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
      <SearchInput />
      {isLoading ? renderIsLoading() : (<SearchResults />)}
    </Box>
  );
};
