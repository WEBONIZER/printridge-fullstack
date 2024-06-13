import styles from './image-box.module.css'
import { useParams } from "react-router-dom";

const ImageBox = () => {

    const { model, vendor } = useParams()

    const img = `https://storage.yandexcloud.net/printridge/refill/${vendor}/${model}.png`;

    return (
        img && (
            <img
                className={styles.image}
                src={img}
                alt={`Заправка ${model}`}
            />
        )
    )
}

export default ImageBox