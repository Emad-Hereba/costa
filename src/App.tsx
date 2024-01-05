import { createRoot } from 'react-dom/client';
import { Form, Field, FormElement } from '@progress/kendo-react-form';

import {
      FormInput,
      
} from './form-components';

import {
    emailValidator, nameValidator,
     
    
} from './validators'

const App = () => {
    const handleSubmit = (dataItem: {[name: string]: any}) => alert(JSON.stringify(dataItem, null, 2));
    return (
      <Form
        onSubmit={handleSubmit}
        render={() => (
          <FormElement style={{width: 400}}>
            <fieldset className={'k-form-fieldset'}>
              <legend className={'k-form-legend'}>BOOK YOUR DREAM VACATION TODAY</legend>
              <Field
                id={'fullName'}
                name={'fullName'}
                label={'Full Name'}
                component={FormInput}
                validator={nameValidator}
                        />
              <Field
                id={'email'}
                name={'email'}
                label={'Email'}
                hint={'Hint: Enter your personal email address.'}
                type={'email'}
                component={FormInput}
                validator={emailValidator}
                        />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
              </div>
            </fieldset>
          </FormElement>
            )}
        />
    );
    

  };
  const domNode=document.getElementById('root');
  const root=createRoot(domNode);
  root.render(<App />);

export default App;