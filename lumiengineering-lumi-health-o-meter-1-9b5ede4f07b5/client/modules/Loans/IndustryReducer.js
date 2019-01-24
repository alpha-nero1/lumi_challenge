import { GOT_INDUSTRIES } from './LoansActions';

// Initial State
const initialState = { data: [] };

const IndustriesReducer = (state = initialState, action) => {
  console.log('INFO: IndustriesReducer method, data (action): ' + action.data)

  switch (action.type) {
    case GOT_INDUSTRIES :
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export const getIndustries = state => state.industries.data

export default IndustriesReducer