import styles from './photos-component.module.css'
import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";

const PhotosComponent = ({ imgagesNameArr }) => {

    const location = useLocation();
    const { model, vendor } = useParams();

    const [currentImg, setCurrentImg] = useState(0);

    const imagesArr = [];

    const pullImagesToArr = () => {

        location.pathname.includes('refill') &&
            imgagesNameArr.map((i, key) => {
                const img = {
                    src: `https://storage.yandexcloud.net/printridge/examples/refill/${vendor}/${model}/${i.item}`,
                    alt: `Заправка ${model}`,
                };
                imagesArr.push(img);

            }) ||
            location.pathname.includes('repair') &&
            imgagesNameArr.map((i, key) => {
                const img = {
                    src: `https://storage.yandexcloud.net/printridge/examples/repair/${vendor}/${model}/${i.item}`,
                    alt: `Ремонт ${model}`,
                };
                imagesArr.push(img);
            }) ||
            location.pathname.includes('remont-noutbukov') &&
            imgagesNameArr.map((i, key) => {
                const img = {
                    src: `https://storage.yandexcloud.net/printridge/examples/remont-noutbukov/${vendor}/${model}/${i.item}`,
                    alt: `Ремонт ${model}`,
                };
                imagesArr.push(img);
            })
        return imagesArr;
    }
    pullImagesToArr()

    const nextSlide = () => {
        setCurrentImg(currentImg === imagesArr.length - 1 ? 0 : currentImg + 1);
    };

    const prevSlide = () => {
        setCurrentImg(currentImg === 0 ? imagesArr.length - 1 : currentImg - 1);
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.button_left}
                onClick={prevSlide}
            >
                {"<"}
            </button>
            <img
                src={imagesArr[currentImg].src}
                alt={imagesArr[currentImg].alt}
                className={styles.img}
            />
            <button
                className={styles.button_right}
                onClick={nextSlide}
            >
                {">"}
            </button>
        </div>
    )
}

export default PhotosComponent