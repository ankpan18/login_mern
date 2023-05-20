import toast from 'react-hot-toast';
import { authenticate } from './helper';

/* Validate login page username */
export async function usernameValidate(values){
    const errors=usernameVerify({},values);

    if(values.username){
        //Check user exist or not
        const {status}=await authenticate(values.username);

        if(status!==200)
        {
            errors.exist=toast.error("User does not exist")
        }
    }
    return errors;
}




/*Validate Username*/ 
function usernameVerify(error={},values){
    if(!values.username){
        error.username=toast.error("Username required...!");
    }
    else if(values.username.includes(" ")){
        error.username=toast.error("Invalid Username...!");
    }
    return error;
}

/** Validate Password*/
export async function passwordValidate(values){
    const errors=passwordVerify({},values);
    return errors;
}

/*Verify password*/ 
function passwordVerify(errors={},values)
{
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.password)
    {
        errors.password=toast.error("Password Required...!");
    }
    else if(values.password.includes(" ")){
        errors.password=toast.error("Wrong Password...!");
    }else if(values.password.length<4){
        errors.password=toast.error("Password must be more than 4 characters.");
    }
    else if(!specialChars.test(values.password)){
        errors.password=toast.error("Password must have special characters.");
    }
    return errors;
}

/**Validate Reset Password */

export async function resetPasswordValidation(values){
    const errors=passwordVerify({},values);

    if(values.password!==values.confirm_pwd)
    {
        errors.exist=toast.error("Password not match...!");
    }
    return errors;
}

/**Validate Register Form */

export async function registerValidation(values){
    const errors=usernameVerify({},values);
    passwordVerify(errors,values);
    emailVerify(errors,values);

    return errors;
}

/*Validate Email*/

function emailVerify(error={},values)
{
    if(!values.email){
        error.email=toast.error("Email Required");
    }
    if(values.email.includes(" ")){
        error.email=toast.error("Wrong Email");
    }
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)){
        error.email=toast.error("Invalid Email Address...!")
    }
    return error;
}

/*Validate Profile Page*/

export async function profileValidation(values){
    const errors=emailVerify({},values);
    return errors;
}