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
        var res = callApi('/loan_industries').then(res => dispatch(gotIndustries(res)));
        console.log(res)
        return res
    }
}