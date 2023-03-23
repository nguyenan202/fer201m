import { Button, Row, Table, Tag } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { updateStatusUser } from "../../redux/store";

const User = () => {

    const user = useSelector(state => state.user);
    const users = useSelector(state => state.users).filter(u => u.id !== user.id);

    const dispatch = useDispatch();
    const openNotification = useSelector(state => state.notification);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag
                    color={role === 1 ? 'blue' : 'green'}
                >
                    {role === 1 ? 'Admin' : 'member'}
                </Tag>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag
                    color={status === 1 ? 'green' : 'red'}
                >
                    {status === 1 ? 'Hoạt động' : 'Bị khóa'}
                </Tag>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (user) => (
                <Button
                    style={{
                        color: 'red',
                        border: '1px solid red'
                    }}
                    onClick={() => {
                        const isConfirm = window.confirm(`Xác nhận ${user.status === 1 ? 'khóa' : 'bỏ khóa'} người dùng ID: ${user.id}`);

                        if (isConfirm) {
                            dispatch(updateStatusUser({
                                userId: user.id,
                                status: user.status === 1 ? 0 : 1
                            }));
                            openNotification('success', 'Cập nhật thành công');
                        }
                    }}
                >
                    {
                        user.status === 1 ?
                        <LockOutlined />
                        :
                        <UnlockOutlined />
                    }
                </Button>
            )
        }
    ]

    const data = users.map(user => ({
        key: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        actions: user
    }))

    return(
        <Row
            style={{
                width: '100%',
                padding: '2rem 1rem'
            }}
        >
            <Table
                style={{
                    width: '100%'
                }}
                columns={columns}
                dataSource={data}
            />
        </Row>
    )
}

export default User;