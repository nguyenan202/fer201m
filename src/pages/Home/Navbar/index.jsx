import { Col, Menu } from "antd"
import { useSelector } from "react-redux";


const getItem = (label, key, icon, children, type) => ({
    key,
    icon,
    children,
    label,
    type,
})

const Navbar = ({ span, selected, setSelected }) => {

    const titles = useSelector(state => state.titles);
    const items = titles.map(title => getItem(title.name, title.id));


    return (
        <Col
            span={span}
            style={{
                padding: '1rem 0.5rem'
            }}
        >
            <Menu
                style={{
                    height: '100%'
                }}
                defaultSelectedKeys={[`${selected}`]}
                mode="inline"
                items={[getItem('Tất cả', '0'), ...items]}
                onSelect={obj => setSelected(obj.key)}
            />
        </Col>
    )
}

export default Navbar;