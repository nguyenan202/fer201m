import { Button, Col, Row, Typography } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from 'yup';

import styles from './styles.module.css';
import MyFieldInput from "../../components/MyFieldInput";
import { useDispatch, useSelector } from "react-redux";
import { addUserRegister } from "../../redux/store";


const initValue = {
    email: '',
    password: '',
    rePassword: '',
    name: ''
}

const registerSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string()
        .required('Mật khẩu là bắt buộc')
        .min(8, 'Mật khẩu phải có tối thiểu 8 kí tự'),
    rePassword: yup.string().required('Hãy nhập lại mật khẩu').oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
    name: yup.string().required('Tên là bắt buộc'),
})

const Register = () => {

    const users = useSelector(state => state.users);
    const openNotification = useSelector(state => state.notification);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Row
            className={styles.container}
        >
            <Row
                className={styles.form}
            >
                <Formik
                    initialValues={initValue}
                    validationSchema={registerSchema}
                    onSubmit={(values, onSubmitProps) => {
                        const objArr = Object.entries(values);

                        let isError = false;
                        objArr.forEach(([key,value]) => {
                            if (value.trim() === '') {
                                onSubmitProps.setFieldError(key, `${key} là bắt buộc`);
                                isError = true;
                            }
                        })

                        const isExistEmail = users.find(user => user.email === values.email.trim());
                        if (isExistEmail) onSubmitProps.setFieldError('email', 'Email đã tồn tại trên hệ thống');

                        if (!isError && !isExistEmail) {
                            const user = {
                                email: values.email.trim(),
                                password: values.password.trim(),
                                name: values.name.trim(),
                                role: 2,
                                status: 1
                            }

                            dispatch(addUserRegister({ user }));
                            openNotification('success', 'Đăng ký thành công, vui lòng đăng nhập');
                            navigate('/login');
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
                            <MyFieldInput
                                placeholder='Nhập lại mật khẩu'
                                field='Xác nhận lại mật khẩu'
                                fieldSize='1.2rem'
                                size='large'
                                span={24}
                                type="password"
                                name="rePassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.rePassword}
                                isInvalidMessage={touched.rePassword && errors.rePassword}
                            />
                            <MyFieldInput
                                placeholder='Full name'
                                field='Nhập tên đầy đủ của bạn'
                                fieldSize='1.2rem'
                                size='large'
                                span={24}
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                isInvalidMessage={touched.name && errors.name}
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
                                    Đăng ký
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
                        Đã có tài khoản?
                        <Link
                            to='/login'
                            style={{
                                marginLeft: '0.5rem'
                            }}
                        >
                            Đăng nhập ngay
                        </Link>
                    </Typography.Text>
                </Row>
            </Row>
        </Row>
    )
}

export default Register;