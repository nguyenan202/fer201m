import { Modal } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import MyFieldInput from "../../components/MyFieldInput";
import MyTextArea from "../../components/MyTextArea";
import { updateMovie } from "../../redux/store";



const ModalUpdateMovie = ({ open, setOpen, movieId, titleId }) => {

    const movie = useSelector(state => state.titles)
        .map(title => title.movies)
        .flat()
        .find(movie => movie.id === movieId);
    const [data, setData] = useState({
        name: movie?.name,
        description: movie?.description,
        picturePath: movie?.picturePath
    });

    useEffect(() => {
        setData({
            name: movie?.name,
            description: movie?.description,
            picturePath: movie?.picturePath
        })
    }, [movieId, titleId]);

    const dispatch = useDispatch();
    const openNotification = useSelector(state => state.notification);

    const handleChange = () => {
        if (data.name.trim() === '' || data.description.trim() === '' || data.picturePath.trim() === '') return openNotification('error', 'Không được bỏ trống trường nào')

        dispatch(updateMovie({
            movieId,
            titleId,
            movie: data
        }));
        openNotification('success', 'Update phim thành công');
        setOpen(false);
    }

    return (
        <Modal
            title='Chỉnh sửa Phim'
            open={open}
            onCancel={() => setOpen(false)}
            onOk={handleChange}
        >
            <MyFieldInput
                field='Tên phim'
                fieldSize='1rem'
                value={data.name}
                onChange={e => setData({
                    ...data,
                    name: e.target.value
                })}
            />
            <MyFieldInput
                field='Tên phim'
                fieldSize='1rem'
                value={data.picturePath}
                onChange={e => setData({
                    ...data,
                    picturePath: e.target.value
                })}
            />
            <MyTextArea
                field='Mô tả'
                fieldSize='1rem'
                value={data.description}
                rows={5}
                spellCheck={false}
                onChange={e => setData({
                    ...data,
                    description: e.target.value
                })}
            />
        </Modal>
    )
}

export default ModalUpdateMovie;