import { Route, Routes } from 'react-router-dom';
import { Link, Typography, Container, Box } from '@mui/material';
import { CatalogSearchProvider } from '~web/contexts/CatalogSearchContext';
import { Catalog } from '~web/components/Catalog';

export function App() {
  return(
    <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, color: '', fontStyle: 'italic' }}>
        chiplet catalog by
        <Link href="https://chiplet.us" variant="subtitle1" underline='always' sx={{ ml: 1, fontStyle: 'normal' }} target="_blank" rel="noopener">Chiplet.US</Link>
      </Typography>
      <CatalogSearchProvider>
        <Routes>
          <Route path="/" element={<Catalog />}>
            {/* <Route index element={<Catalog />} />
            <Route path="*" element={<Catalog />} /> */}
          </Route>
        </Routes>
      </CatalogSearchProvider>
    </Container>
  );
}

export default App;
