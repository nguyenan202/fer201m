import { Button, Card, Col, Row, Typography } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const avgRates = (rates = []) => rates.length === 0 ? 0 : rates.reduce((prev, cur) => prev + cur.score, 0) / rates.length;

const Movies = ({ span, titleId }) => {

    const navigate = useNavigate();
    const searchValue = useSelector(state => state.searchValue);
    const titles = useSelector(state => state.titles).map(title => ({
        ...title,
        movies: title.movies.map(movie => ({
            ...movie,
            title: {
                id: title.id,
                name: title.name
            }
        }))
    }));

    const [saveData, setSaveData] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const moviesData = titleId !== '0' ?
            titles.find(title => title.id + '' === titleId).movies :
            titles.map(title => title.movies).flat();

        setMovies([...moviesData]);
        setSaveData([...moviesData]);
    }, [titleId]);

    useEffect(() => {
        if (searchValue.trim() === '') {
            setMovies([...saveData]);
        } else {
            const moviesFilter = saveData.filter(movie => movie.name.toLowerCase().includes(searchValue.trim().toLowerCase()));

            setMovies(moviesFilter);
        }
    }, [searchValue])

    return (
        <>
            <Col
                span={span}
                style={{
                    maxHeight: 'calc(100vh - 60px)',
                    padding: '1rem',
                    display: movies.length !== 0 && 'grid',
                    gridTemplateColumns: movies.length !== 0 && '240px 240px 240px 240px',
                    columnGap: movies.length !== 0 && '3rem',
                    rowGap: movies.length !== 0 && '1.5rem',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                }}
            >
                {
                    movies.map(movie => (
                        <Card
                            key={movie.id}
                            hoverable
                            style={{
                                width: 240,
                                height: 'fit-content'
                            }}
                            cover={<img
                                src={movie.picturePath}
                                alt='image'
                                style={{
                                    width: '240px',
                                    height: '240px',
                                    objectFit: 'cover'
                                }}
                            />}
                        >
                            <Card.Meta title={movie.name} description={`Loại: ${movie.title.name}`} />
                            <Card.Meta description={`Điểm: ${avgRates(movie.rates).toFixed(2)}`} />
                            <Row
                                style={{
                                    width: '100%',
                                    justifyContent: 'center'
                                }}
                            >
                                <Button
                                    type="primary"
                                    style={{
                                        marginTop: '1rem',
                                        width: '70%'
                                    }}
                                    onClick={() => navigate(`/movie/${movie.id}`)}
                                >
                                    Đánh giá
                                </Button>
                            </Row>
                        </Card>
                    ))
                }
                {
                    movies.length === 0 &&
                    <Row
                        style={{
                            width: '100%',
                            margin: '2rem 0',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography.Title style={{ fontSize: '2rem' }}>
                            Không có dữ liệu
                        </Typography.Title>
                    </Row>
                }
            </Col>
        </>
    )
}

export default Movies
export {
    avgRates
}