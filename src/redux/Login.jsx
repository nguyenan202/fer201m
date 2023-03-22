import { Button, Col, Row, Typography } from "antd"
import MyFieldInput from "../../components/MyFieldInput";
import * as yup from 'yup';
import { Formik } from "formik";

import styles from './styles.module.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/store";

const initValue = {
    email: '',
    password: ''
}

const loginSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string()
        .required('Mật khẩu là bắt buộc')
        .min(8, 'Mật khẩu phải có tối thiểu 8 kí tự')
})

const Login = () => {

    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    console.log(users);

    return (
        <Row
            className={styles.container}
        >
            <Row
                className={styles.form}
            >
                <Formik
                    initialValues={initValue}
                    validationSchema={loginSchema}
                    onSubmit={(values, onSubmitProps) => {
                        const objArr = Object.entries(values);

                        let isError = false;
                        objArr.forEach(([key,value]) => {
                            if (value.trim() === '') {
                                onSubmitProps.setFieldError(key, `${key} là bắt buộc`);
                                isError = true;
                            }
                        })

                        const user = users.find(user => user.email === values.email.trim());
                        if (!user) onSubmitProps.setFieldError('email', 'Email không tồn tại');
                        else {
                            const isPassword = user.password === values.password.trim();
                            
                            if (!isPassword) {
                                onSubmitProps.setFieldError('password', 'Mật khẩu không chính xác')
                                isError = !isPassword;
                            }
                        }

                        if (!isError && user) {
                            const userLogin = {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role
                            }
                            dispatch(setLogin({ user: userLogin }));
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <MyFieldInput
                                placeholder='Nhập email'
                                field='Email'
                                fieldSize='1.2rem'
                                size='large'
                                span={24}
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                isInvalidMessage={touched.email && errors.email}
                            />
                            <MyFieldInput
                                placeholder='Nhập mật khẩu'
                                field='Mật khẩu'
                                fieldSize='1.2rem'
                                size='large'
                                span={24}
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                isInvalidMessage={touched.password && errors.password}
                            />
                            <Col
                                span={24}
                                style={{
                                    margin: '0.5rem 0',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{ width: '160px' }}
                                    htmlType="submit"
                                >
                                    Đăng nhập
                                </Button>
                            </Col>
                        </form>
                    )}
                </Formik>

                <Row
                    style={{
                        width: '100%',
                        margin: '1rem 0',
                        justifyContent: 'center'
                    }}
                >
                    <Typography.Text>
                        Bạn chưa có tài khoản?
                        <Link
                            to='/register'
                            style={{
                                marginLeft: '0.5rem'
                            }}
                        >
                            Đăng ký
                        </Link>
                    </Typography.Text>
                </Row>
            </Row>
        </Row>
    )
}

export default Login;