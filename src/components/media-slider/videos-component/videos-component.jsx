import styles from './videos-component.module.css'
import { useState } from "react";

const VideosComponent = ({ videosArr }) => {

    const [currentVideo, setCurrentVideo] = useState(0);

    const nextSlide = () => {
        setCurrentVideo(currentVideo === videosArr.length - 1 ? 0 : currentVideo + 1);
    };

    const prevSlide = () => {
        setCurrentVideo(currentVideo === 0 ? videosArr.length - 1 : currentVideo - 1);
    };
    //console.log(videosArr)
    return (videosArr.length > 0 &&
        <div
            className={styles.container}
        >
            <button
                className={styles.button_left}
                onClick={prevSlide}
            >
                {"<"}
            </button>
            <iframe
                id="ytplayer"
                type="text/html"
                width="100%"
                height="400"
                src={videosArr[currentVideo] + '?vq=hd1080&autoplay=1'}
                frameborder="0"
                allowFullScreen
            ></iframe>
            <button
                className={styles.button_right}
                onClick={nextSlide}
            >
                {">"}
            </button>
        </div>
    )
}

export default VideosComponent