import styles from './image-repair-box.module.css'
import { useInView } from "react-intersection-observer"

const ImageRepairBox = ({ printer }) => {

    const { ref } = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const img = printer?.photo?.src || (printer ? `https://storage.yandexcloud.net/printridge/repair/${printer.vendor}/${printer.model}.png` : null);

    if (!img) return null;

    return (
        <img
            className={styles.image}
            src={img}
            alt={`Ремонт ${printer?.model || ''}`}
            ref={ref}
        />
    )
}

export default ImageRepairBox