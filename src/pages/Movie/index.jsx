import { Button, Col, Divider, Image, Row, Typography } from "antd"
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import styles from './styles.module.css';
import { avgRates } from "../Home/Movies";
import MyFieldInput from "../../components/MyFieldInput";
import ReviewForm from "./ReviewForm";

const Movie = () => {

    const { id } = useParams();
    const user = useSelector(state => state.user);
    const users = useSelector(state => state.users);
    const titles = useSelector(state => state.titles).map(title => ({
        ...title,
        movies: title.movies.map(movie => ({
            ...movie,
            title: {
                id: title.id,
                name: title.name
            },
            rates: movie.rates.map(rate => ({
                ...rate,
                user: users.find(user => user.id === rate.userId)
            }))
        }))
    }));

    const navigate = useNavigate('/login');

    const movie = titles.map(title => title.movies).flat().find(movie => movie.id === parseInt(id));
    const rated = user && movie.rates.find(rate => rate.userId === user.id);

    return (movie ?
        <Row
            className={styles.container}
        >
            <Col
                span={8}
                style={{
                    padding: '1rem'
                }}
            >
                <Image
                    src={movie.picturePath}
                    style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                    }}
                />
            </Col>
            <Col
                span={16}
                style={{
                    padding: '1rem 0 5rem 1rem',
                    maxHeight: 'calc(100vh - 60px)',
                    overflowY: 'scroll'
                }}
            >
                <Typography.Title>
                    {movie.name}
                </Typography.Title>
                <Typography.Paragraph style={{ fontSize: '1rem' }}>
                    <strong>Thể loại: </strong>
                    {movie.title.name}
                </Typography.Paragraph>
                <Typography.Paragraph style={{ fontSize: '1rem' }}>
                    <strong>Điểm đánh giá: </strong>
                    {avgRates(movie.rates).toFixed(2)}
                </Typography.Paragraph>
                <Typography.Paragraph style={{ fontSize: '1rem' }}>
                    <strong>Mô tả: </strong>
                    {movie.description}
                </Typography.Paragraph>
                {
                    !user &&
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => navigate('/login')}
                    >
                        Đánh giá
                    </Button>
                }
                {
                    user &&
                    <>
                        <Divider />
                        <ReviewForm
                            movie={movie}
                            rated={rated}                      
                        />
                    </>
                }
                <Divider />
                {
                    <>
                        <Typography.Title style={{ fontSize: '1.75rem', width: '100%' }}>
                            Bình luận
                        </Typography.Title>
                        {movie.rates.map(rate => (
                            <Row key={rate.id} style={{ margin: '0.75rem 0' }}>
                                <strong>{`${rate.user.name}:`} </strong>
                                <Typography.Text style={{ marginLeft: '0.5rem' }}>
                                    {rate.comment}
                                </Typography.Text>
                            </Row>
                        ))}
                    </>
                }
            </Col>
        </Row>
        :
        <Row>
            Not found
        </Row>
    )
}

export default Movie;