import { Schema, model } from 'mongoose';
import { iChip } from '@chiplets/types';


const collectionName = 'chips';

const schema = new Schema<iChip>({
  id: Number,
  mpn: String,
  cid: String,
  description: String,
  company: String,
  url: String,
  categories: [String],
}, { collection: collectionName});

export const ChipsModel = model<iChip>('Chips', schema, collectionName);



