// Imports.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions.
import { fetchIndustries } from './FilterActions';
import { fetchData } from '../LoansActions';

// Reducers.
import { getIndustries } from './FilterReducer';


export class Filter extends Component {

    constructor(props) {
        super(props)

        this.state = { // state defaults
            industry: "Hospitality",
            health: 2,
        }

        this.handle_submit = this.handle_submit.bind(this)
        this.handle_input_change = this.handle_input_change.bind(this)
    }

    // get all unique industries options
    componentDidMount() {
        this.props.dispatch(fetchIndustries())
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
        this.props.dispatch(fetchData(this.state))
    }

    render() {
        const { industries } = this.props
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
                <h1>Select Filters</h1>
                <form onSubmit={this.handle_submit}>
                <p>
                    <b>Select loan industry: </b>
                    <select value={this.state.industry} onChange={this.handle_input_change} type="text" name="industry">
                        {list}
                    </select>
                </p>
                <p>
                    <b>Select loan health: </b>
                    <select value={this.state.health} onChange={this.handle_input_change} type="number" name="health">
                        <option value="2">High</option>
                        <option value="1">Medium</option>
                        <option value="0">Low</option>
                    </select>
                </p>
                <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

Filter.need = [() => { return fetchIndustries() }]

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