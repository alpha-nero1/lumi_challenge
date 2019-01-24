import { GOT_LOANS } from './LoansActions';

const initialState = { data: [] };

const LoansReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_LOANS :
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export const getLoans = state => state.loans.data

export default LoansReducer;
