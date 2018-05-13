import { Action } from '@ngrx/store';

export enum quoteDataTypes {
  STORE = '[quote] STORE',
  RESET = '[quote] RESET'
}

export class Store implements Action {
  readonly type = quoteDataTypes.STORE;
  constructor(public payload: any) {}
}

export class Reset implements Action {
  readonly type = quoteDataTypes.RESET;
}

export type quoteActionUnion = Store | Reset;

export function quoteDataReducer(state: any = null, action: quoteActionUnion) {
  switch (action.type) {
    case quoteDataTypes.STORE:
      return action.payload;
    case quoteDataTypes.RESET:
      return null;
    default:
      return state;
  }
}