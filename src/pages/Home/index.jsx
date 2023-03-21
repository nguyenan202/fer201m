import { Row } from "antd"

import styles from './styles.module.css';
import Navbar from "./Navbar";
import Movies from "./Movies";
import { useState } from "react";

const Home = () => {

    const [titleIdSelected, setTitleIdSelected] = useState('0');

    return (
        <Row className={styles.container}>
            <Navbar
                span={6}
                selected={titleIdSelected}
                setSelected={setTitleIdSelected}
            />
            <Movies
                span={18}
                titleId={titleIdSelected}
            />
        </Row>
    )
}

export default Home;