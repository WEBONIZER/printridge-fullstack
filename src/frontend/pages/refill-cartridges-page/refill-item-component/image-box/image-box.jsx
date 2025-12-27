import styles from './image-box.module.css'
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer"

const ImageBox = ({ cartridge }) => {

    const { model, vendor } = useParams()

    const { ref } = useInView({
        threshold: 0.2,
        triggerOnce: true
      });

    const img = cartridge?.photo?.src || `https://storage.yandexcloud.net/printridge/refill/${vendor}/${model}.png`;

    return (
        img && (
            <img
                className={styles.image}
                src={img}
                alt={`Заправка ${model}`}
                ref={ref}
            />
        )
    )
}

export default ImageBox

