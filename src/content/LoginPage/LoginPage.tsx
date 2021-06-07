/**
 * React JS APP
 *
 */
import { Form, TextInput, Button } from 'carbon-components-react';
import { AuthController, UserController } from 'controllers';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppUtil } from 'utils';
import { openToast } from 'toast-ts';
import { AppConst } from 'constants/app.constant';
// import { AjaxError } from 'rxjs/ajax';
import './_login-page.scss';


export const LoginPage = (): React.ReactElement => {
  const history = useHistory();
  const [username, setUsername] = useState<any>('');
  const [password, setPassword] = useState<any>('');

  const authenticateUser = () => {
    AuthController.authenticateUser().then(() => {
      history.push('/');
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username && password) {
      UserController.loginUser(username, password).then((data) => {
        if(data) {
          history.push('/');
        } else {
          openToast(AppConst.LOG_IN_ERROR)
        }
      });
    }
  };

  const handleChange = (e:any) => {
    e.preventDefault();
    const { name, value } = e.target;
    (name === 'username') ? setUsername(value) : setPassword(value)
  };

  const renderMainUI = () => {
    const authSSOCookie = AppUtil.getAuthCookie();

    if (authSSOCookie) {
      authenticateUser();
    }

    return (
      <div className="bx--grid bx--grid--full-width login-page__wrapper">        
          <Form onSubmit={handleSubmit}>
            <div style={{marginBottom: '2rem'}}>
              <TextInput
                id="username"
                invalidText="Invalid username."
                labelText="Username"
                placeholder=""
                name="username" 
                value={username}
                onChange={handleChange}
              />
            </div>

            <div style={{marginBottom: '2rem'}}>
              <TextInput
                id="password"
                type="password"
                invalidText="Invalid password."
                labelText="password"
                placeholder=""
                name="password" 
                value={password}
                onChange={handleChange}
              />
            </div>

            <Button
              kind="primary"
              tabIndex={0}
              type="submit"
            >
              Login
            </Button>
          </Form>

          <div className="signup-link">
           <Link to="/signup">Signup</Link>
          </div>       
      </div>
    );
  };

  return renderMainUI();
};
