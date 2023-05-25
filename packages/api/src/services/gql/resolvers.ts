import { iChip, iSearchParams, iSearchResults, iCounts } from '@chiplets/types';
import MongoDB from '~api/services/mongodb';
import OpenSearch from '~api/services/opensearch/';

export const resolvers = {
  Query: {
    // mongodb results where given criteria properties are exact match (this is equivalent of database SELECT with exact property matches)
    find: async (parent: unknown, { criteria }: { criteria: iChip }): Promise<iChip[]> => MongoDB.select(criteria),

    uniqueCounts: async(parent: unknown, { field }: { field: string }): Promise<iCounts | undefined> => MongoDB.unique(field),

    // full-text search results from opensearch index
    search: async (parent: unknown, { searchParams }: { searchParams: iSearchParams }): Promise<iSearchResults> => OpenSearch.search(searchParams),
  }
};
