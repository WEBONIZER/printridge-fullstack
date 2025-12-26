import styles from './image-repair-laptops.module.css'
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer"

const ImageRapairBox = ({ laptop }) => {

    const { model, vendor } = useParams()

    const { ref } = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const img = laptop?.photo?.src || `https://storage.yandexcloud.net/printridge/laptops/${vendor}/${model}.png`;

    return (
        img && (
            <img
                className={styles.image}
                src={img}
                alt={laptop?.model || model}
                ref={ref}
            />
        )
    )
}

export default ImageRapairBox