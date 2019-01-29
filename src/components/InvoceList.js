import React, { Component } from 'react';
import { BASE_URL } from '../constansts';
import axios from 'axios';
import '../assets/invoceList.css';

class InvoceList extends Component {
  goBackToForm = _ => this.props.setIsFirstStep(true);

  onSubmitConfirm = _ => {
    const amount = { amount: this.props.invoceAmount };
    const data = { ...this.props.formValues, ...amount };
    this.confirmRequest(data);
  };

  confirmRequest = data => {
    axios.post(`${BASE_URL}/api/company/companies.php`, data).then(res => {
      window.alert(res.data.message);
      if (res.data.success) {
        this.props.setIsFirstStep(true);
        this.props.setFormValues({ commitment_performance_period: 'no_commitment' });
      }
    });
  };

  render() {
    const { formValues, invoceAmount } = this.props;

    return (
      <div className="invoce-list">
        <div className="card">
          <div className="container">
            <h4>
              <b>Did you confirm?</b>
            </h4>
            <ul>
              {Object.keys(formValues).map(formValueKey => (
                <li key={formValueKey}>
                  {formValueKey}:
                  {formValueKey === 'sub_numbers' ? formValues[formValueKey].join() : formValues[formValueKey]}
                </li>
              ))}
              <li key="amount">
                <strong>Invoce Amount: {invoceAmount}</strong>
              </li>
            </ul>
            <p>
              <button type="button" onClick={this.goBackToForm}>
                Back
              </button>
              <button type="button" onClick={this.onSubmitConfirm}>
                Confirm
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default InvoceList;
