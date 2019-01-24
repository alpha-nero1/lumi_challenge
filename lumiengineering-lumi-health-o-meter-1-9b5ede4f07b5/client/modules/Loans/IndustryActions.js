import callApi from '../../util/apiCaller';

export const GOT_INDUSTRIES = 'GOT_INDUSTRIES';

export function gotIndustries(data) {
    return {
      type: GOT_INDUSTRIES,
      data,
    };
}

export function fetchIndustries() {
    return (dispatch) => {
        const res = callApi('/loan_industries', 'post').then(res => dispatch(gotIndustries(res)));
        console.log("FETCH INDUSTRIES DATA: " + res)
        return res
    }
}