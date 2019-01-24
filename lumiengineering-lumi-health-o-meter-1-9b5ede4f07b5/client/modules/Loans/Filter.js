import React, { Component, PropTypes } from 'react';
import  { fetchIndustries } from './IndustryActions';
import { connect } from 'react-redux';

import { getIndustries } from './IndustryReducer';

export class Filter extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchIndustries())
    }

    render() {
        const { industries } = this.props; // this props = industries
        console.log('INFO: props in render method, data: ' + this.props)
        let list
        if (industries && industries.length) {
            list = industries.map((industry, i) => {
                return(
                    <option value={industry}>{industry}</option>
                )
            })
        }

        return(
            <div>
                <form onSubmit={this.props.action}>
                    <label>
                        Select loan industry:
                        <select name="industry">
                            {list}
                        </select>
                    </label>

                    <label>
                        Select loan health: 
                        <select name="health">
                            <option value="2">High</option>
                            <option value="1">Medium</option>
                            <option value="0">Low</option>
                        </select>
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

Filter.need = [() => { return fetchIndustries(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
      industries: getIndustries(state),
    }
}
  
  Filter.propTypes = {
    industries: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  
  Filter.contextTypes = {
    router: React.PropTypes.object,
  };
  
  export default connect(mapStateToProps)(Filter);