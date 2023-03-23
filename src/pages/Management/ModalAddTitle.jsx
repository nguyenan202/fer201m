import { Modal } from "antd"
import MyFieldInput from "../../components/MyFieldInput"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTitle } from "../../redux/store"


const ModalAddTitle = ({ open, setOpen }) => {

    const [name, setName] = useState({
        value: '',
        error: false,
        message: ''
    })

    const dispatch = useDispatch();
    const openNotification = useSelector(state => state.notification);

    const handleAddTitle = () => {
        if (name.value.trim() === '') return setName({
            ...name,
            error: true,
            message: 'Tên không được để trống'
        })

        const title = {
            id: new Date().valueOf(),
            name: name.value,
            movies: []
        }

        dispatch(addTitle({
            title
        }));
        openNotification('success', 'Thêm thể loại thành công');
        setName({
            value: '',
            error: false,
            message: ''
        });
        setOpen(false);
    }

    return(
        <Modal
            title='Thêm Thể loại'
            open={open}
            onCancel={() => setOpen(false)}
            onOk={handleAddTitle}
        >
            <MyFieldInput
                placeholder='e.g Kinh dị ...'
                field='Tên thể loại'
                fieldSize='1rem'
                value={name.value}
                onChange={e => setName({
                    value: e.target.value,
                    error: false,
                    message: ''
                })}
                isInvalidMessage={name.error && name.message}
            />
        </Modal>
    )
}

export default ModalAddTitle