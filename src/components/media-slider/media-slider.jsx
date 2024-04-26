import styles from './media-slider.module.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { PHOTO_BUTTON, VIDEO_BUTTON } from '../../services/actions/buttons'
import VideosComponent from './videos-component/videos-component'
import PhotosComponent from './photos-component/photos-component'

const MediaSlider = ({ photos, videos }) => {

    const dispatch = useDispatch();

    const { photoButton, videoButton } = useSelector((state) => state.buttons);

    const handleClickPhoto = () => {
        dispatch({
            type: PHOTO_BUTTON,
            photoButton: 'photo'
        })
        dispatch({
            type: VIDEO_BUTTON,
            videoButton: ''
        })
    }

    const handleClickVideo = () => {
        dispatch({
            type: PHOTO_BUTTON,
            photoButton: ''
        })
        dispatch({
            type: VIDEO_BUTTON,
            videoButton: 'video'
        })
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.buttons_box}>
                <Link
                    className={photoButton === 'photo' ? styles.button_active : styles.button}
                    onClick={handleClickPhoto}
                >
                    Фото
                </Link>
                {videos.length > 0 && <Link
                    className={videoButton === 'video' ? styles.button_active : styles.button}
                    onClick={handleClickVideo}
                >
                    Видео
                </Link>}
            </div>
            {photoButton === 'photo' && <PhotosComponent imgagesNameArr={photos} />}
            {videos.length > 0 && videoButton === 'video' && <VideosComponent videosArr={videos} />}
        </div>
    );
};

export default MediaSlider;