import { Fragment, useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';

import {
  IconButton,
  Paper,
  InputBase,
  Box,
  Button,
  ButtonProps,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { Categories } from '~web/components/Categories';
import { iCatalogSearchContext, CatalogSearchContext } from '~web/contexts/CatalogSearchContext';

const SearchButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[100]),
  backgroundColor: grey[100],
  '&:hover': {
    backgroundColor: grey[200],
  },
}));

const AdvancedSearchButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[100]),
}));

export const SearchInput = () => {
  const { setKeywords, isLoading, criteria } = useContext(CatalogSearchContext) as iCatalogSearchContext;
  const [showCategoriesFilter, setShowCategoriesFilter] = useState(true);

  const renderCategoriesFilter = () => (
    <Box
      sx={{
        display: showCategoriesFilter ? 'flex' : 'none',
        width: '100%',
        flexFlow: 'wrap',
        justifyContent: 'space-between',
        gap: `10px 10px`,
        mb: 4,
      }}
    >
        <Categories categories={undefined} />
    </Box>
  );

  useEffect(() => {
    if (criteria?.categories?.length) {
      setShowCategoriesFilter(true);
    }
  }, [criteria]);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', flex: 1 }}>
      <Box sx={{ m: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
        <Paper
          component="form"
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}
        >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="search the chiplets catalog..."
            inputProps={{ 'aria-label': 'search the chiplets catalog' }}
            onChange={e => setKeywords(e.target.value)}
          />
          <SearchButton sx={{ m: '10px' }} aria-label="search">Search</SearchButton>
        </Paper>
        <IconButton disableRipple sx={{ ml: 10 }} size="small" aria-label="show categories filter" onClick={e => setShowCategoriesFilter(!showCategoriesFilter)}>
          <Typography variant="caption" display="block">Search By Categories</Typography>
          {showCategoriesFilter ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
        </IconButton>
      </Box>
      {renderCategoriesFilter()}
    </Box>
  );
};
