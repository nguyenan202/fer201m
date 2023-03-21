import { Button, Input, Row, Typography } from "antd"
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setSearch } from "../../redux/store";

const Header = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSearch = (value) => {
        dispatch(setSearch({
            value
        }))
    }

    return (
        <Row className={styles.container}>
            <Row className={styles.header_columnn}>
                <Typography.Title style={{ fontSize: '2rem', margin: 0 }}>
                    PHIM HAY
                </Typography.Title>
                <Link to='/' className={styles.link}>
                    Trang chủ
                </Link>
            </Row>
            <Row className={styles.header_columnn}>
                <Input.Search
                    placeholder="Nhập tên phim cần tìm"
                    enterButton='Tìm'
                    style={{
                        width: '400px'
                    }}
                    onSearch={handleSearch}
                />
            </Row>
            {user ?
                <Row
                    style={{
                        alignItems: 'center',
                        fontSize: '1rem'
                    }}
                >
                    <Typography.Paragraph style={{ margin: 0 }}>
                        Hello
                    </Typography.Paragraph>
                    <strong style={{ margin: '0 0.5rem' }}>
                        {user.name}
                    </strong>
                    <Button
                        onClick={() => dispatch(setLogout())}
                    >
                        Đăng xuất
                    </Button>
                </Row>
                :
                <Row className={styles.header_columnn}>
                    <Link
                        className={styles.link}
                        to='/login'
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        className={styles.link}
                        to='/register'
                    >
                        Đăng ký
                    </Link>
                </Row>
            }
        </Row>
    )
}

export default Header