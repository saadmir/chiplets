import mongoose from 'mongoose';
import { isArray, unionBy, set } from 'lodash';

import { iChip } from '@chiplets/types';
import { ChipsModel } from './models/ChipModel';

const find = async (filter = {}, sort = {}) => {
  const arr = [];
  try {
    const cursor = ChipsModel.find(filter, sort).lean().cursor();
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      arr.push(doc);
    }
  } catch (err) {
    console.error('ERROR', (new Date()).toLocaleString(), err);
  }

  return arr;
}

const distinct = async (field: string) => {
  try {
    const aggregate = await ChipsModel.aggregate([
      {
        $project: {
          categories: 1
        }
      },
      {
        $unwind:
          {
            path: '$categories',
            preserveNullAndEmptyArrays: false
          }
      },
      {
        $project: {
          emit: {
            key: "$categories",
            value: { $literal: 1 }
          }
        }
      },
      {
        $group: {
          _id: "$emit.key",
          value: {
            $accumulator: {
              init: function() { return {}; },
              initArgs: [],
              accumulate: function(state: any, value: any) {
                if (!state[value]) {
                 state[value] = 0;
                }
                state[value] = state[value] + 1;
                return state;
              },
              accumulateArgs: [ "$emit.key" ],
              merge: function() {
              },
              lang: "js"
            }
          }
        }
      }
    ])
    .exec();

    const counts = aggregate.reduce((acc, { value }) => Object.assign(acc, value), {});
    return { counts };
  } catch(err) {
    console.log('mongodb/index.ts', 'ERROR', 'aggregation error');
  }
}

export default class MongoDB {

  static async connect(dbConnectionUri: string) {
    await mongoose.connect(dbConnectionUri)
  }

  static async all({ searchable } = { searchable: false }) {
    const searchableOnlyFilter = {
      mpn: { $regex: /^.{1,}$/ },
      description: { $regex: /^.{1,}$/ },
      company: { $regex: /^.{1,}$/ },
    };
    return find(searchable ? searchableOnlyFilter : {});
  }

  static async unique(field: string) {
    return distinct(field);
  }

  static async select(criteria: iChip) {
    return find(criteria);
  }

  static async search(keywords: string, filter?: iChip) {
    let results: iChip[] = [];
    const regex = new RegExp(keywords, 'i');
    let query = { status: 'enabled' };
    if (keywords) {
      set(query, '$or', ['description', 'categories', 'name', 'company'].map(field => ({ [field]: { $regex: regex } })))
    }

    for (const key in filter) {
      const prop = filter[key as keyof iChip];
      if (isArray(prop)) {
        set(query, key, { $all: prop });
      }
    }

    results = await find(query);

    if (keywords) {
      const sort = {};
      query = { status: 'enabled' };
      set(query, '$text', { '$search': keywords });
      set(sort,  'score', { $meta: "textScore" });

      for (const key in filter) {
        const prop = filter[key as keyof iChip];
        if (isArray(prop)) {
          set(query, key, { $all: prop });
        }
      }

      const search: iChip[] = await find(query);
      results = unionBy(results, search, 'id');
    }

    return results;
  }
}
