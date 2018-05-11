import { Action } from '@ngrx/store';

export const STORE = 'STORE';
export const RESET = 'RESET';

export function quoteDataReducer(state: any = null, action: Action) {
  switch (action.type) {
    case STORE:
      return state     
    case RESET:
      return null;
    default:
      return state;
  }
}