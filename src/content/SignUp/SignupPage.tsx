/**
 * React JS APP
 *
 */
import { Form, TextInput, Button } from 'carbon-components-react';
import { UserController } from 'controllers';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
// import { AppUtil } from 'utils';
import { openToast } from 'toast-ts';
import { AppConst } from 'constants/app.constant';
// import { AjaxError } from 'rxjs/ajax';
import './_signup-page.scss';


export const SignupPage = (): React.ReactElement => {
  const history = useHistory();  
  const [firstName, setFirstName] = useState<any>('');
  const [lastName, setLastName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const [dob, setDob] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [picture, setPicture] = useState<any>('');
  console.log(history, picture)  

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newUserData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      password,
      picture
    }

    UserController.signupUser(newUserData).then((data) => {
      if(data) {
        history.push('/login');
      } else {
        openToast(AppConst.SIGN_UP_ERROR)
      }
    });
  };

  const handleChange = (e:any) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'firstName') setFirstName(value);
    if (name === 'lastName') setLastName(value);
    if (name === 'email') setEmail(value);
    if (name === 'phoneNumber') setPhoneNumber(value);
    if (name === 'dob') setDob(value);
    if (name === 'password') setPassword(value);
    if (name === 'picture') setPicture(value);
  };

  const pictureUpload = (picture:any) => {
    setPicture(picture[0]);
  }

  const renderMainUI = () => {
    return (
      <div className="bx--grid bx--grid--full-width login-page__wrapper">        
          <Form onSubmit={handleSubmit}>
            <div style={{marginBottom: '0.5rem'}}>
              <TextInput
                id="firstName"
                invalidText="Invalid username."
                labelText="First Name"
                placeholder=""
                name="firstName" 
                value={firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{marginBottom: '0.5rem'}}>
              <TextInput
                id="lastName"
                invalidText="Invalid username."
                labelText="Last Name"
                placeholder=""
                name="lastName" 
                value={lastName}
                onChange={handleChange}
                required 
              />
            </div>

            <div style={{marginBottom: '1rem'}}>
              <TextInput
                id="email"
                type="email"
                invalidText="Invalid email."
                labelText="Email"
                placeholder="abc@xyz.com"
                name="email" 
                value={email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{marginBottom: '1rem'}}>
              <TextInput
                id="phoneNumber"
                type="tel"
                maxLength={12}
                minLength={10}  
                invalidText="Invalid phoneNumber."
                labelText="Phone Number"
                placeholder=""
                name="phoneNumber" 
                value={phoneNumber}
                onChange={handleChange}
                required 
              />
            </div>

            <div style={{marginBottom: '1rem'}}>
              <TextInput
                id="dob"
                invalidText="Invalid dob."
                labelText="Date of Birth"
                placeholder="MM-DD-YYYY"
                name="dob" 
                value={dob}
                onChange={handleChange}
                required 
              />
            </div>

            <div style={{marginBottom: '1rem'}}>
              <TextInput
                id="password"
                type="password"
                invalidText="Invalid password."
                labelText="Password"
                placeholder=""
                name="password" 
                value={password}
                onChange={handleChange}
                required 
              />
            </div>

            <div style={{marginBottom: '2rem'}}>
              <ImageUploader
                  withIcon={true}
                  fileContainerStyle={{width: "200px"}}
                  buttonText='Profile Picture'
                  onChange={pictureUpload}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  withPreview={true}
                  singleImage={true}
              />
            </div>

            <Button
              kind="primary"
              tabIndex={0}
              type="submit"
            >
              SignUp
            </Button>
          </Form>      
      </div>
    );
  };

  return renderMainUI();
};
