// Imports.
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter/Filter'
import Gauge from 'react-svg-gauge';
import styles from './Loans.css';

// Reducers
import { getLoans } from './LoansReducer';

class LoansPage extends Component {

  constructor(props) {
    super(props)
  }

  get_color(val) {
    if (val > 80) return 'green'
    if (val > 50) return 'gold'
    return 'red'
  }

  render() {
    const { loans } = this.props;
    let list;

    if (loans && loans.length) {
      list = loans.map((loan, i) => {
        return (
          <div key={i} className={styles.loan}>
            <div className={styles.info}>
              <h2>{loan.name}</h2>
              <p>
                <b>Current Health:</b>
                <b style={{ color: this.get_color(loan.health) }}>
                  &nbsp; {loan.health}
                </b>
              </p>
              <p>
                <b>Industry:</b>
                &nbsp; {loan.industry}
              </p>
            </div>
            <div className={styles.graph}>
              <Gauge
                value={loan.health}
                color={this.get_color(loan.health)}
                width={150}
                height={150}
                label=""
              />
            </div>
          </div>
        
        );
      });
    }
    return (
      <div>
        <div>
          <Filter /> 
        </div>
        <div>
          {list}
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loans: getLoans(state),
  };
}

LoansPage.propTypes = {
  loans: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

LoansPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(LoansPage);
