import styles from './image-repair-box.module.css'
import { useParams } from "react-router-dom";

const ImageRapairBox = () => {

    const { model, vendor } = useParams()

    const img = `https://storage.yandexcloud.net/printridge/repair/${vendor}/${model}.png`;

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