import styles from './media-slider.module.css'
import { Link } from 'react-router-dom';
import { useDispatch_, useSelector_ } from '../../services/reducers/root-reducer';
import { setPhotoButton, setVideoButton } from '../../services/slices/buttons';
import { VideosComponent } from './videos-component/videos-component'
import { PhotosComponent } from './photos-component/photos-component'
import { useEffect, FC } from 'react';

interface MediaSliderProps {
    photos: Array<string | { src: string; alt?: string }>;
    videos: string[];
}

export const MediaSlider: FC<MediaSliderProps> = ({ photos, videos }) => {

    const dispatch = useDispatch_();

    const { photoButton, videoButton } = useSelector_((state) => state.buttons);

    useEffect(() => {
        dispatch(setPhotoButton('photo'));
    }, [photos, dispatch])

    const handleClickPhoto = () => {
        dispatch(setPhotoButton('photo'));
        dispatch(setVideoButton(''));
    }

    const handleClickVideo = () => {
        dispatch(setPhotoButton(''));
        dispatch(setVideoButton('video'));
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.buttons_box}>
                <Link
                    className={photoButton === 'photo' ? styles.button_active : styles.button}
                    onClick={handleClickPhoto}
                    to="#"
                >
                    Фото
                </Link>
                {videos.length > 0 && <Link
                    className={videoButton === 'video' ? styles.button_active : styles.button}
                    onClick={handleClickVideo}
                    to="#"
                >
                    Видео
                </Link>}
            </div>
            {photos.length > 0 && photoButton === 'photo' && <PhotosComponent imgagesNameArr={photos} />}
            {videos.length > 0 && videoButton === 'video' && <VideosComponent videosArr={videos} />}
        </div>
    );
};

