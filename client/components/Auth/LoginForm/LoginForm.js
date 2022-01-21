import React, { useState } from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik, yupToFormErrors } from 'formik';
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from '../../../hooks/useAuth';
import { loginApi, resetPasswordApi } from "../../../api/user";
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';


export default function LoginForm(props){
     const { showRegisterForm, onCloseModal}  = props;
     const [loading, setLoading]= useState(false);
     const { login } = useAuth();
     
      

        const formik= useFormik({
            initialValues: initialValues(),
            validationSchema: Yup.object(validationSchema()),

            onSubmit: async (formData) =>{
                    setLoading(true);
                const response = await loginApi(formData);
                if(response?.jwt){
                    login(response.jwt);
                    console.log("Login OK");
                    onCloseModal();
                }else{
                    toast.error("El email o la constraseña son incorrectos");
                }
            setLoading(false);
            },

        });


        const resetPassword = () => {
            formik.setErrors({});
            const validateEmail = Yup.string().email().required();


            if(!validateEmail.isValidSync(formik.values.identifier)){
                formik.setErrors({ identifier: true });
            }else{
              resetPasswordApi(formik.values.identifier);  
            }
        } ;

    return(
       <Form className="login-form" onSubmit={formik.handleSubmit}>
           <Form.Input 
           name = "identifier" 
           type="text" 
           placeholder = "Correo electronico" 
           onChange={formik.handleChange}
           error= {formik.errors.identifier}
           /> 
            <Form.Input 
           name = "password" 
           type="password" 
           placeholder = "Contraseña" 
           onChange={formik.handleChange}
           error= {formik.errors.password}
           /> 

    <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
            Unete!
        </Button>
        <div>
            <Button className="submit" type="submit" loading={loading}>
                Ingresar
            </Button>
            <Button type="button" onClick={resetPassword}>
                ¿Olvidaste tu contraseña?
            </Button>
        </div>
    </div> 
       </Form>
    )
}


function initialValues (){
    return {
        identifier: "",
        password:"", 
    };
}


function validationSchema(){
  return {
      identifier: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
  }
}