import { Fragment, useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Link,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { iChip } from '@chiplets/types';
import { iCatalogSearchContext, CatalogSearchContext } from '~web/contexts/CatalogSearchContext';

import { Categories } from './Categories';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Description = ({ description }: { description: string }) => {
  const [expand, setExpand] = useState(false);
  return (
    <Fragment>
      <Typography variant="body2" onClick={() => setExpand(!expand)}>
        {description}
      </Typography>
    </Fragment>
  );
};

const DatasheetLink = ({ url }: { url: string }) => (
  <Link sx={{ fontStyle: 'italic' }} href={url} variant="body2" underline='always' target="_blank" rel="noopener">
    Datasheet
  </Link>
);

function Row(props: { row: iChip }) {
  const { toggleCategory } = useContext(CatalogSearchContext) as iCatalogSearchContext;
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell>
          <IconButton
            disabled
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="left" >
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'flex-start',
              gap: `4px`,
            }}
          >
            <Categories categories={row.categories} />
          </Box>
        </StyledTableCell>
        <StyledTableCell align="left">{row.company}</StyledTableCell>
        <StyledTableCell align="left">{row.mpn}</StyledTableCell>
        <StyledTableCell align="left">
          <Description description={row.description || ''} />
        </StyledTableCell>
        <StyledTableCell align="left">{row.url?.length ? <DatasheetLink url={row.url} /> : ''}</StyledTableCell>
      </StyledTableRow>
    </Fragment>
  );
}


export const SearchResults = () => {
  const {
    searchResults: { hits = [], total = 0 } = {},
    pageSize,
    setPageSize,
    page,
    setPage,
  } = useContext(CatalogSearchContext) as iCatalogSearchContext;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Fragment>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell />
                    <StyledTableCell align="left">Categories</StyledTableCell>
                    <StyledTableCell align="left">Manufacturer</StyledTableCell>
                    <StyledTableCell align="left">Manufacturer Part Number</StyledTableCell>
                    <StyledTableCell align="center">Description</StyledTableCell>
                    <StyledTableCell align="center">Datasheet</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hits.map((result: iChip) => (<Row key={result.id} row={result} />))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={total}
              rowsPerPage={pageSize}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Fragment>
      </Paper>
    </Box>
  );
}
