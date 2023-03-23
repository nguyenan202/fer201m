import { Button, Modal, Row } from "antd"
import MyFieldInput from "../../components/MyFieldInput"
import { useDispatch, useSelector } from "react-redux"
import MySelectInput from "../../components/MySelectInput"
import { Formik } from "formik";
import * as yup from 'yup';
import { useState } from "react";
import { addMovie } from "../../redux/store";

const initValue = {
    name: '',
    description: '',
    picturePath: ''
}

const movieSchema = yup.object().shape({
    name: yup.string().required('Tên là bắt buộc'),
    description: yup.string().required('Mô tả là bắt buộc'),
    picturePath: yup.string().required('Ảnh là bắt buộc')
})

const ModalAddMovie = ({ open, setOpen }) => {

    const titles = useSelector(state => state.titles).map(title => ({
        id: title.id,
        name: title.name
    }))
    const [titleId, setTitleId] = useState(titles[0]?.id);

    const dispatch = useDispatch();
    const openNotification = useSelector(state => state.notification);

    return (
        <Modal
            title='Thêm phim mới'
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Formik
                initialValues={initValue}
                validationSchema={movieSchema}
                onSubmit={(values, onSubmitProps) => {
                    const movie = {
                        id: new Date().valueOf(),
                        name: values.name,
                        description: values.description,
                        picturePath: values.picturePath,
                        rates: []
                    }

                    dispatch(addMovie({
                        titleId,
                        movie
                    }))
                    openNotification('success', 'Thêm phim mới thành công');
                    onSubmitProps.resetForm();
                    setOpen(false);
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
                    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <MyFieldInput
                            field='Tên phim'
                            fieldSize='1rem'
                            placeholder='Nhập tên phim...'
                            name='name'
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalidMessage={touched.name && errors.name}
                        />
                        <MyFieldInput
                            field='Mô tả phim'
                            fieldSize='1rem'
                            placeholder='Nhập mô tả phim...'
                            name='description'
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalidMessage={touched.description && errors.description}
                        />
                        <MyFieldInput
                            field='Ảnh'
                            fieldSize='1rem'
                            placeholder='Nhập url ảnh...'
                            name='picturePath'
                            value={values.picturePath}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalidMessage={touched.picturePath && errors.picturePath}
                        />
                        <MySelectInput
                            field='Thể loại'
                            fieldSize='1rem'
                            placeholder='Chọn 1 thể loại'
                            data={titles}
                            name='titleId'
                            value={titleId}
                            onChange={id => setTitleId(id)}
                        />
                        <Row
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                margin: '1rem 0'
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{ width: '200px' }}>
                                Thêm
                            </Button>
                        </Row>
                    </form>
                )}
            </Formik>
        </Modal>
    )
}

export default ModalAddMovie