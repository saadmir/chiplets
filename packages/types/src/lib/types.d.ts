import { Document, Model, ObjectId } from 'mongoose';
import { JSONObjectResolver } from "graphql-scalars"

export interface iChip {
  _id: ObjectId
  id: number
  mpn: string
  cid: string
  description: string
  company: string
  url: string
  categories: [string]
}

export interface iSearchResults {
  fromIndex?: number
  total?: number
  hits?: iChip[]
}

export interface iSearchParams {
  keywords: string,
  criteria?: iChip,
  fromIndex?: number,
  pageSize?: number,
}

export interface iIndexedFields {
  [key as keyof iChip]: {
    type: string
  }
}

export interface iCounts {
  counts: typeof JSONObjectResolver;
}

declare global {
  namespace Models {
    export type ChipModel = Model<iChip & Document>;
  }
}
