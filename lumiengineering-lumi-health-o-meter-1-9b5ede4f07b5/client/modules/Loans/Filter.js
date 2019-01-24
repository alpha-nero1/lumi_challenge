import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchIndustries } from './IndustryActions';
import { fetchData } from './LoansActions';

// Import Selectors
import { getIndustries } from './IndustryReducer';

export class Filter extends Component {

    constructor(props) {
        super(props)

         // DEFAULTS!
        this.state = {
            industry: "Hospitality",
            health: 2,
        }

        this.handle_submit = this.handle_submit.bind(this)
        this.handle_input_change = this.handle_input_change.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchIndustries())

        console.log("FILTER PROPS: " + this.props)
    }

    handle_input_change(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handle_submit(event) { 
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })

        this.props.dispatch(fetchData(this.state)) // perform POST with submission data
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
                <form onSubmit={this.handle_submit}>
                    <label>
                        Select loan industry:
                        <select value={this.state.industry} onChange={this.handle_input_change} type="text" name="industry">
                            {list}
                        </select>
                    </label>

                    <label>
                        Select loan health: 
                        <select value={this.state.health} onChange={this.handle_input_change} type="number" name="health">
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