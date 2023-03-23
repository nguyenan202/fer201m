import { Modal, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import MyFieldInput from "../../components/MyFieldInput";
import { useEffect, useState } from "react";
import { updateTitle } from "../../redux/store";



const ModalUpdateTitle = ({ open, setOpen, titleId }) => {

    const title = useSelector(state => state.titles).find(title => title.id === titleId);
    const [data, setData] = useState({
        value: title.name,
        error: false,
        message: ''
    });

    useEffect(() => {
        setData({
            value: title.name,
            error: false,
            message: ''
        })
    }, [titleId])

    const dispatch = useDispatch();
    const openNotification = useSelector(state => state.notification);

    const handleChange = () => {
        if (data.value.trim() === '') return setData({
            ...data,
            error: true,
            message: 'Tên không được bỏ trống'
        });

        dispatch(updateTitle({
            titleId,
            value: data.value
        }));
        openNotification('success', 'Cập nhật thể loại thành công');
        setOpen(false);
    }

    return(
        <Modal
            title='Chỉnh sửa Thể loại'
            open={open}
            onCancel={() => setOpen(false)}
            onOk={handleChange}
        >
            <MyFieldInput
                field='Thể loại'
                fieldSize='1rem'
                isInvalidMessage={data.error && data.message}
                value={data.value}
                onChange={e => setData({
                    value: e.target.value,
                    error: false,
                    message: ''
                })}
            />
        </Modal>
    )
}

export default ModalUpdateTitle