//import { defaultFields } from '../sign-up-form/sign-up-form.components'
import FormInput from '../form-input/form-input.component';
import { useState } from 'react';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    auth, 
    signInWithGoogleRedirect
 } from '../../utils/firebase/firebase.utils'
 import './sign-in-form.styles.scss'


const SignInForm = () => {

    const defaultFormFields = {
        email: '',
        password: '',
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    

    const handleChange = (event) => {
        const {name, value} = event.target; // This will get the name and value from the <input> tag so that we know which 
                                            // field is being updated. They have the same names as the string names 
                                            // in the defaultFormFields object
        setFormFields({...formFields, [name]: value}); // the '...' gets all the properties of the object
    }


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };


    const handleSubmitSignIn = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }       
        }
    }


    return (

        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span> Sign in with your email and password</span>
            <form onSubmit={handleSubmitSignIn}>
                <FormInput 
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput 
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit">  
                        SIGN IN
                    </Button>

                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>  
                        GOOGLE SIGN IN
                    </Button>
                </div>
                
            </form>
        </div> 

    )

    
}

export default SignInForm;