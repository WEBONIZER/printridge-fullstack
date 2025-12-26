import styles from './photos-component.module.css'
import { useState } from "react";
import { useInView } from "react-intersection-observer"

const PhotosComponent = ({ imgagesNameArr }) => {

    const { ref } = useInView({
        threshold: 0.2,
        triggerOnce: true
      });

    const [currentImg, setCurrentImg] = useState(0);

    const imagesArr = Array.isArray(imgagesNameArr) 
        ? imgagesNameArr.map((item, key) => {
            const src = typeof item === 'string' ? item : (item.src || item.item || '');
            return {
                src: src,
                alt: typeof item === 'string' ? `Фото ${key + 1}` : (item.alt || `Фото ${key + 1}`),
            };
          })
        : [];

    if (imagesArr.length === 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrentImg(currentImg === imagesArr.length - 1 ? 0 : currentImg + 1);
    };

    const prevSlide = () => {
        setCurrentImg(currentImg === 0 ? imagesArr.length - 1 : currentImg - 1);
    };

    return (
        <>
            <div className={styles.container}>
                <button
                    className={styles.button_left}
                    onClick={prevSlide}
                >
                    {"<"}
                </button>
                <img
                    src={imagesArr[currentImg]?.src}
                    alt={imagesArr[currentImg]?.alt}
                    className={styles.img}
                    ref={ref}
                />
                <button
                    className={styles.button_right}
                    onClick={nextSlide}
                >
                    {">"}
                </button>
            </div>
            <div className={styles.container_mobile}>
                {
                    imagesArr.map((i, key) =>
                        <img
                            key={key}
                            ref={ref}
                            src={i.src}
                            alt={i.alt}
                            className={styles.img}
                        />
                    )
                }
            </div>
        </>
    )
}

export default PhotosComponent