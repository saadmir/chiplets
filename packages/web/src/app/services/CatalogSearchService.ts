import { GQL_URL } from '~web/common/urls';
import { iSearchParams, iSearchResults, iChip } from '@chiplets/types';

export const graphQL = async (searchParams: iSearchParams): Promise<iSearchResults> => {
  let results: iSearchResults = {};

  const query = `
    query($searchParams: SearchParams) {
      search(searchParams: $searchParams) {
        total
        fromIndex
        hits {
          id
          mpn
          company
          description
          url
          categories
        }
      }
    }
  `;

  try {
    const response = await fetch(GQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          searchParams
        }
      }),
    });

    const { data: { search = {} } = {} } = await response.json();
    results =  search;
  } catch (err) {
    console.log('ChipService.ts', 'ERROR', err);
  }

  return results;
};
