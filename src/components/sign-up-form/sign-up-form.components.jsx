import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'

import { UserContext } from '../../contexts/user.context'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match")
            return;
        } 

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Cannot create user, email already in use")
            } else {
                console.log('user creation encountered an error', error)
            }
            
        }



    }

    const handleChange = (event) => {
        const {name, value} = event.target; // This will get the name and value from the <input> tag so that we know which 
                                            // field is being updated. They have the same names as the string names 
                                            // in the defaultFormFields object
        setFormFields({...formFields, [name]: value}); // the '...' gets all the properties of the object
    }

    return (

        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span> Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Display Name" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

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

                <FormInput 
                    label="Confirm Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />

                <Button type="submit">
                    SIGN UP
                </Button>
                
            </form>
        </div>
    )

}

export default SignUpForm;