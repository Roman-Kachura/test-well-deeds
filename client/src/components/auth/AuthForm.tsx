import React from 'react';
import {Formik} from 'formik';
import style from './Auth.module.scss';
import {LoginValuesType, RegistrationValuesType} from '../../store/reducers/authReducer';

export const AuthForm: React.FC<AuthFormValuesType> = (props) => {
    return (
        <Formik
            initialValues={{email: '', password: '', name: props.name ? '' : null, nick: props.nick ? '' : null}}
            validate={values => {
                const errors = {email: '', password: '', name: props.name ? '' : null, nick: props.nick ? '' : null};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if (values.nick && values.nick.charAt(0) !== '@') {
                    errors.nick = 'Nick must start with @'
                }
                if(values.nick === ''){
                    errors.nick = 'Required';
                }
                if(values.name === ''){
                    errors.name = 'Required';
                }
                if (!values.password) {
                    errors.password = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {}}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isSubmitting,
              }) => (
                <form className={style.authForm} onSubmit={(e) => {
                    e.preventDefault();
                    if (props.loginCallBack) {
                        props.loginCallBack({email: values.email, password: values.password});
                    }
                    if (props.registrationCallBack && values.name && values.nick) {
                        props.registrationCallBack({
                            email: values.email,
                            password: values.password,
                            name: values.name,
                            nick: values.nick
                        });
                    }
                }}>
                    <div className={style.authField}>
                        <label htmlFor="email">Почта:</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className={!!errors.email ? style.inputError : ''}
                        />
                        <div className={style.authError}>{errors.email && touched.email && errors.email}</div>
                    </div>
                    <div className={style.authField}>
                        <label htmlFor="password">Пароль:</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className={!!errors.password ? style.inputError : ''}
                        />
                        <div className={style.authError}>{errors.password && touched.password && errors.password}</div>
                    </div>
                    {
                        values.name !== null &&
                        <div className={style.authField}>
                            <label htmlFor="name">Имя:</label>
                            <input
                                id="name"
                                type="name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className={!!errors.name ? style.inputError : ''}
                            />
                            <div
                                className={style.authError}>{errors.name && touched.name && errors.name}</div>
                        </div>
                    }
                    {
                        values.nick !== null &&
                        <div className={style.authField}>
                            <label htmlFor="nick">@Ник:</label>
                            <input
                                id="nick"
                                type="nick"
                                name="nick"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nick}
                                className={!!errors.nick ? style.inputError : ''}
                            />
                            <div
                                className={style.authError}>{errors.nick && touched.nick && errors.nick}</div>
                        </div>
                    }
                    <button className={style.authBtn} type="submit" disabled={isSubmitting}>{props.buttonText}</button>

                </form>
            )}
        </Formik>
    )
}

interface AuthFormValuesType {
    name?: boolean
    nick?: boolean
    buttonText: string
    loginCallBack?: (values: LoginValuesType) => void
    registrationCallBack?: (values: RegistrationValuesType) => void
}