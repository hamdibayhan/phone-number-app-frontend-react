import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import InvoceList from './InvoceList';

class App extends Component {
  state = {
    formValues: { commitment_performance_period: 'no_commitment' },
    isFirstStep: true,
    invoceAmount: 0
  };

  setFormValues = formValues => this.setState({ formValues });

  setInvoceAmount = invoceAmount => this.setState({ invoceAmount });

  setIsFirstStep = isFirstStep => this.setState({ isFirstStep });

  render() {
    const { formValues, isFirstStep, invoceAmount } = this.state;

    if (isFirstStep) {
      return (
        <div>
          <RegisterForm
            formValues={formValues}
            setFormValues={this.setFormValues}
            setInvoceAmount={this.setInvoceAmount}
            setIsFirstStep={this.setIsFirstStep}
          />
        </div>
      );
    } else {
      return (
        <div>
          <InvoceList
            formValues={formValues}
            invoceAmount={invoceAmount}
            setIsFirstStep={this.setIsFirstStep}
            setFormValues={this.setFormValues}
          />
        </div>
      );
    }
  }
}

export default App;
