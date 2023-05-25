import { pick, chunk } from 'lodash';

import { Client } from '@opensearch-project/opensearch';

import { config } from '~api/config';
import { iChip, iSearchParams, iSearchResults, iIndexedFields } from '@chiplets/types';

const openSearchIndexName = 'chips';
const indexedFields: iIndexedFields = {
  id: {
    type: 'keyword',
  },
  cid: {
    type: 'keyword',
  },
  mpn: {
    type: 'keyword',
  },
  url: {
    type: 'keyword',
  },
  company: {
    type: 'text',
  },
  description: {
    type: 'text',
  },
  categories: {
    type: 'text'
  }
};

export default class OpenSearch {
  private static _client: any;

  static client() {
    // TODO: check if connection is alive and useable ?
    if (!this._client) {
      this._client = new Client({
        node: `${config.openSearch.protocol}://${config.openSearch.auth}@${config.openSearch.host}:${config.openSearch.port}`,
      });
    }
    
    return this._client;
  }

  static async createIndex() {
    const mappings = {
      properties: indexedFields
    };

    if (!(await this.client().indices.exists({ index: openSearchIndexName })).body) {
      await this.client().indices.create({
        index: openSearchIndexName,
        body: { mappings }
      });
    }
  }

  // index 100 documents at a time by splitting the input array into chunks of 100
  static async updateIndex(chips: iChip[]) {
    this.createIndex();
    const results = [];
    const chunks = chunk(chips, 100);
    for (const chunk of chunks) {
      const promises = chunk.map(chip => {
        const params = {
          id: chip.id,
          index: openSearchIndexName,
          body: pick(chip, Object.keys(indexedFields)),
        };
        return this.client().index(params);
      });
      const responses = await Promise.all(promises);
      results.push(...responses.map(({ body: { _id, result } }) => `${_id}/${result}`));
    }
    return results;
  }

  static async search({ keywords, criteria, fromIndex = 0, pageSize}: iSearchParams): Promise<iSearchResults> {
    const keywordQuery = {
      multi_match: {
        query: keywords,
        fields: Object.keys(indexedFields)
      }
    };

    interface iFieldQuery {
      match: {
        [index: string]: string
      }
    }

    const fieldQueries: Array<iFieldQuery> = [];
    for (const key in criteria) {
      [criteria[key as keyof iChip]].flat().forEach(value => {
        fieldQueries.push({
          match: {
            [key]: value as string
          }
        });
      });
    }

    interface iSearchQuery {
      from?: number
      size?: number
      highlight?: {}
      query: {}
    }

    const params: { index: string, body: iSearchQuery } = {
      index: openSearchIndexName,
      body: {
        highlight: {
          fields: {
            description: {}
          }
        },
        query: {
          bool: {
            must: [...(keywords ? [keywordQuery] : []), ...fieldQueries]
          }
        },
      }
    };

    if (pageSize) {
      params.body.from = fromIndex;
      params.body.size = pageSize;
    }

    const response = await this.client().search(params);
    const { body: { hits: { total: { value: total = 0 } = {}, hits = [] } = {} } } = response;
    console.log('search', keywords, fromIndex, total, hits.length);
    return { fromIndex, total, hits: hits.map(({ _source }: { _source: iChip }) => _source)};
  }
}
