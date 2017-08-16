import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EmployeeForm from './EmployeeForm';
import {PageHeader, Grid, Row} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EmployeeActions from '../../actions/EmployeeActionCreator';
import { withRouter } from 'react-router';

class EmployeesCreate extends Component {

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(employee){
    this.props.actions.createEmployee(employee).then(() => {
      this.props.history.push('/employees/all');
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <PageHeader>Employee Create</PageHeader>
        </Row>
        <Row>
          <EmployeeForm employees={this.props.employees} handleSave={this.handleSave}/>
        </Row>
      </Grid>
    );
  }
}

EmployeesCreate.defaultProps = {
  employee: {}
};

EmployeesCreate.propTypes = {

  employee: PropTypes.object.isRequired,
  history: PropTypes.object
};


function mapStateToProps(state) {
  return {
    employees: state.employees.employees
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(EmployeeActions, dispatch)
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesCreate));
