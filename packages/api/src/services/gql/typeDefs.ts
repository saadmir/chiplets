import { ObjectIDTypeDefinition, JSONObjectDefinition } from 'graphql-scalars';

export const typeDefs = [`
  ${ObjectIDTypeDefinition}
  ${JSONObjectDefinition}

  type Chip {
    _id: ObjectID
    id: Int
    cid: String
    mpn: String
    description: String
    company: String
    url: String
    categories: [String]
  }

  input ChipInput {
    _id: ObjectID
    id: Int
    cid: String
    mpn: String
    description: String
    company: String
    categories: [String]
  }

  type SearchResults {
    fromIndex: Int
    total: Int
    hits: [Chip]
  }

  input SearchParams {
    keywords: String
    criteria: ChipInput
    fromIndex: Int
    pageSize: Int
  }

  type Counts {
    counts: JSONObject
  }

  type Query {
    search(searchParams: SearchParams): SearchResults
    find(criteria: ChipInput): [Chip]
    uniqueCounts(field: String): Counts
  }
`];
