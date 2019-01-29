import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { BASE_URL } from '../constansts';
import axios from 'axios';
import Styles from '../assets/FormStyles';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subNumbers: [],
      mainNumbers: []
    };
  }

  componentDidMount() {
    this.fetchSubNumbersRequest();
    this.fetchMainNumbersRequest();
  }

  fetchSubNumbersRequest = _ => {
    axios.get(`${BASE_URL}/api/sub_number/numbers.php`).then(res => {
      if (res.data.success) this.setState({ subNumbers: res.data.sub_numbers });
    });
  };

  fetchMainNumbersRequest = _ => {
    axios.get(`${BASE_URL}/api/main_number/numbers.php`).then(res => {
      if (res.data.success) this.setState({ mainNumbers: res.data.main_numbers });
    });
  };

  fetchInvoceAmountRequest = values => {
    const data = {
      representative_email: values.representative_email,
      representative_phone_number: values.representative_phone_number,
      commitment_performance_period: values.commitment_performance_period,
      main_number: values.main_number,
      sub_numbers: values.sub_numbers
    };

    axios.post(`${BASE_URL}/api/invoce/amount.php`, data).then(res => {
      if (res.data.success) {
        this.props.setInvoceAmount(res.data.amount);
        this.props.setIsFirstStep(false);
      } else {
        window.alert(JSON.stringify(res.data.message, 0, 2));
      }
    });
  };

  onSubmit = async values => {
    this.props.setFormValues(values);
    this.fetchInvoceAmountRequest(values);
  };

  render() {
    const { formValues } = this.props;
    const { mainNumbers, subNumbers } = this.state;

    if (mainNumbers.length === 0 || subNumbers.length === 0) {
      return <div>You cannot select any numbers because there are no numbers for selecting.</div>;
    } else {
      return (
        <div>
          <Styles>
            <Form
              initialValues={formValues}
              onSubmit={this.onSubmit}
              render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Name:</label>
                    <Field name="name" component="input" placeholder="Name" />
                  </div>
                  <div>
                    <label>Address:</label>
                    <Field name="address" component="input" placeholder="Address" />
                  </div>
                  <div>
                    <label>Sector:</label>
                    <Field name="sector" component="input" placeholder="Sector" />
                  </div>
                  <div>
                    <label>Tax Office:</label>
                    <Field name="tax_office" component="input" placeholder="Tax Office" />
                  </div>
                  <div>
                    <label>Tax Number:</label>
                    <Field name="tax_number" component="input" placeholder="Tax Number" />
                  </div>
                  <div>
                    <label>Representative Name:</label>
                    <Field name="representative_name" component="input" placeholder="Representative Name" />
                  </div>
                  <div>
                    <label>Representative Email:</label>
                    <Field name="representative_email" component="input" placeholder="Representative Email" />
                  </div>
                  <div>
                    <label>Representative Phone Number:</label>
                    <Field name="representative_phone_number" component="input" placeholder="Representative Phone Number" />
                  </div>
                  <div>
                    <label>Commitment Performance Period</label>
                    <Field name="commitment_performance_period" component="select">
                      <option value="no_commitment">No Commitment</option>
                      <option value="1_yearly">1 yearly</option>
                      <option value="2_yearly">2 yearly</option>
                      <option value="3_yearly">3 yearly</option>
                    </Field>
                  </div>
                  <div>
                    <label>Main Number</label>
                    <Field name="main_number" component="select">
                      <option />
                      {mainNumbers.map(mainNumber => (
                        <option value={mainNumber} key={mainNumber}>
                          {mainNumber}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <br />
                  <div>
                    <label>Sub Numbers(Use cmd for more sub number)</label>
                    <Field name="sub_numbers" type="select" component="select" multiple>
                      {subNumbers.map(subNumber => (
                        <option value={subNumber} key={subNumber}>
                          {subNumber}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="buttons">
                    <button type="submit" disabled={submitting}>
                      Submit
                    </button>
                    <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                      Reset
                    </button>
                  </div>
                </form>
              )}
            />
          </Styles>
        </div>
      );
    }
  }
}

export default RegisterForm;
