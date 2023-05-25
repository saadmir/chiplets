import { Document, Model, ObjectId } from 'mongoose';
import { JSONObjectResolver } from "graphql-scalars"

export interface iChip {
  _id?: ObjectId
  id?: number
  cid?: string
  description?: string
  mpn?: string
  company?: string
  url?: string
  categories?: string[]
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
  [key: string]: {
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

export interface iSearchParams {
  keywords: string,
  criteria?: iChip,
  fromIndex?: number,
  pageSize?: number,
}

export interface iSearchResults {
  fromIndex?: number
  total?: number
  hits?: iChip[]
}
