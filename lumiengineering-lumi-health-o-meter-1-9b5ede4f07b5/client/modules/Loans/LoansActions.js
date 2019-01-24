import callApi from '../../util/apiCaller';

// Export Constants
export const GOT_LOANS = 'GOT_LOANS';

// Export Actions
export function gotData(data) { 
  return {
    type: GOT_LOANS,
    data,
  };
}

// fetch data according to filter
export function fetchData(data) { 
  return (dispatch) => {
    const res = callApi('/loans', 'post', data).then((res) => dispatch(gotData(res)))
    return res
  };
}
