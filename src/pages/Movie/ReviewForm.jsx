import { Button, Rate, Row, Typography } from "antd"
import MyFieldInput from "../../components/MyFieldInput"

import styles from './styles.module.css';
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { addRates, saveRate } from "../../redux/store";


const ReviewForm = ({ movie, rated }) => {

    const [star, setStar] = useState(rated ? rated.score : 0);
    const [value, setValue] = useState(rated ? rated.comment : '');

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const openNotification = useSelector(state => state.notification);

    const handleRate = () => {
        if (value.trim() === '') return openNotification('error', 'Hãy nhập đánh giá')

        const rate = {
            id: new Date().valueOf(),
            score: star,
            comment: value,
            userId: user.id
        }

        dispatch(addRates({
            movieId: movie.id,
            titleId: movie.title.id,
            rate
        }));
        openNotification('success', 'Đánh giá thành công');
    }

    const handleSave = () => {
        const rate = {
            id: rated.id,
            score: star,
            comment: value,
            userId: user.id
        }

        dispatch(saveRate({
            movieId: movie.id,
            titleId: movie.title.id,
            rate
        }));
        openNotification('success', 'Cập nhật đánh giá thành công');
    }

    return (
        <Row
            className={styles.review_form}
        >
            <Typography.Title style={{ fontSize: '1.75rem', width: '100%' }}>
                Chi tiết đánh giá
            </Typography.Title>
            <Row style={{ width: '100%', marginBottom: '1rem' }}>
                <Rate
                    count={10}
                    defaultValue={star}
                    onChange={s => setStar(s)}
                />
            </Row>
            <Row style={{ width: '100%' }}>
                <Typography.Paragraph
                    style={{
                        width: '100%'
                    }}
                >
                    Bình luận:
                    <TextArea
                        rows={5}
                        placeholder="Viết đánh giá của bạn"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    >

                    </TextArea>
                </Typography.Paragraph>
            </Row>
            <Row style={{ width: '100%' }}>
                {rated ?
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleSave}
                    >
                        Cập nhật đánh giá
                    </Button>
                    :
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleRate}
                    >
                        Đánh giá
                    </Button>
                }
            </Row>
        </Row>
    )
}

export default ReviewForm