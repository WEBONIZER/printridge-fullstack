import styles from './image-repair-laptops.module.css'
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer"

const ImageRapairBox = () => {

    const { model, vendor } = useParams()

    const { ref } = useInView({
        threshold: 0.2, // Элемент грузится только тогда, когда он на 20% видим
        triggerOnce: true // Если элемент уже был загружен ранее, он не размонтируется и не грузится снова
    });

    const img = `https://storage.yandexcloud.net/printridge/laptops/${vendor}/${model}.png`;

    return (
        img && (
            <img
                className={styles.image}
                src={img}
                alt={model}
                ref={ref}
            />
        )
    )
}

export default ImageRapairBox