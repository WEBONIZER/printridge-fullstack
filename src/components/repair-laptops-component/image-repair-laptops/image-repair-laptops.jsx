import styles from './image-repair-laptops.module.css'
import { useParams } from "react-router-dom";

const ImageRapairBox = () => {

    const { model, vendor } = useParams()

    const img = `https://storage.yandexcloud.net/printridge/laptops/${vendor}/${model}.png`;

    return (
        img && (
            <img
                className={styles.image}
                src={img}
                alt={model}
            />
        )
    )
}

export default ImageRapairBox