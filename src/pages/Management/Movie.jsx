import { Button, Col, Row } from "antd"
import MySelectInput from "../../components/MySelectInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ModalAddTitle from "./ModalAddTitle";
import ModalAddMovie from "./ModalAddMovie";
import { deleteMovie, deleteTitle } from "../../redux/store";
import ModalUpdateTitle from "./ModalUpdateTitle";
import ModalUpdateMovie from "./ModalUpdateMovie";


const Movie = () => {

    const titles = useSelector(state => state.titles);
    const [titleId, setTitleId] = useState(titles.map(title => ({
        id: title.id,
        name: title.name
    }))[0]?.id);
    const [movieId, setMovieId] = useState(null);
    const [movies, setMovies] = useState(titles.find(title => title.id === titleId)?.movies);
    const [modalAddTitle, setModalAddTitle] = useState(false);
    const [modalUpdateTitle, setModalUpdateTitle] = useState(false);
    const [modalAddMovie, setModalAddMovie] = useState(false);
    const [modalUpdateMovie, setModalUpdateMovie] = useState(false);

    const dispatch = useDispatch();
    const openNotification = useSelector(state => state.notification);

    useEffect(() => {
        setMovies(
            titles.find(title => title.id === titleId)?.movies
        )
    }, [titleId]);

    const handleDeleteMovie = () => {

        const title = titles.find(title => title.movies.find(movie => movie.id === movieId));

        const isConfirm = window.confirm(`Xác nhận xóa phim ID: ${movieId}`);

        if (isConfirm) {
            dispatch(deleteMovie({
                titleId: title.id,
                movieId
            }));
            openNotification('success', 'Xóa phim thành công');
            setTitleId(null);
            setMovies([]);
            setMovieId(null);
        }
    }


    const handleDeleteTitle = () => {

        const isConfirm = window.confirm(`Xác nhận xóa thể loại ID: ${titleId}`);

        if (isConfirm) {

            dispatch(deleteTitle({
                titleId
            }));
            openNotification('success', 'Xóa thể loại thành công');
            setTitleId(null);
            setMovies([]);
            setMovieId(null);
        }
    }

    
    return (
        <Row
            style={{
                width: '100%'
            }}
        >
            <Row style={{ width: '100%' }}>
                <MySelectInput
                    field='Thể loại'
                    fieldSize='1rem'
                    data={titles}
                    span={12}
                    value={titleId}
                    onChange={id => setTitleId(id)}
                />
                <Row style={{ width: '100%' }}>
                    <Button
                        type="primary"
                        onClick={() => setModalAddTitle(true)}
                    >
                        Thêm thể loại
                    </Button>
                    {titleId &&
                        <>
                            <Button
                                type="ghost"
                                style={{
                                    backgroundColor: 'red',
                                    color: '#fff',
                                    margin: '0 1rem'
                                }}
                                onClick={handleDeleteTitle}
                            >
                                Xóa thể loại
                            </Button>
                            <Button
                                onClick={() => setModalUpdateTitle(true)}
                            >
                                Update
                            </Button>
                        </>
                    }
                </Row>
            </Row>
            <Row style={{ width: '100%' }}>
                <MySelectInput
                    field='Phim'
                    fieldSize='1rem'
                    data={movies}
                    span={12}
                    onSelect={id => setMovieId(id)}
                />
                <Row style={{ width: '100%' }}>
                    <Button
                        type="primary"
                        onClick={() => setModalAddMovie(true)}
                    >
                        Thêm phim
                    </Button>
                    {movieId &&
                        <>
                            <Button
                                type="ghost"
                                style={{
                                    backgroundColor: 'red',
                                    color: '#fff',
                                    margin: '0 1rem'
                                }}
                                onClick={handleDeleteMovie}
                            >
                                Xóa phim
                            </Button>
                            <Button
                                onClick={() => setModalUpdateMovie(true)}
                            >
                                Update
                            </Button>
                        </>
                    }
                </Row>
            </Row>

            <ModalAddTitle
                open={modalAddTitle}
                setOpen={setModalAddTitle}
            />
            {titleId && <ModalUpdateTitle
                open={modalUpdateTitle}
                setOpen={setModalUpdateTitle}
                titleId={titleId}
            />}
            <ModalAddMovie
                open={modalAddMovie}
                setOpen={setModalAddMovie}
            />
            {(titleId && movieId) &&
                <ModalUpdateMovie
                    open={modalUpdateMovie}
                    setOpen={setModalUpdateMovie}
                    titleId={titleId}
                    movieId={movieId}
                />
            }
        </Row>
    )
}

export default Movie;