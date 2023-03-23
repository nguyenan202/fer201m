import { Col, Menu, Row } from "antd";

import styles from './styles.module.css';
import { useState } from "react";
import Movie from "./Movie";
import User from "./User";

const getItem = (label, key, icon, children, type) => ({
    key,
    icon,
    children,
    label,
    type,
})

const renders = [<Movie/>, <User/>]

const Managment = () => {

    const [selectedOption, setSelectedOption] = useState('0');

    const items = [
        getItem('Quản lý Phim & Thể loại', '0'),
        getItem('Quản lý người dùng', '1'),
    ]

    return (
        <Row
            className={styles.container}
        >
            <Col
                span={6}
                className={styles.container_left}
            >
                <Menu
                    items={items}
                    mode="inline"
                    defaultSelectedKeys={[selectedOption]}
                    onSelect={obj => setSelectedOption(obj.key)}
                />
            </Col>
            <Col
                span={18}
                className={styles.container_right}
            >
                {
                    renders[parseInt(selectedOption)]
                }
            </Col>
        </Row>
    )
}

export default Managment;