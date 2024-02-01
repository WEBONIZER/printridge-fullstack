import styles from './description-box.module.css'
import { useParams } from "react-router-dom";

const DescriptionBox = () => {

    const { model, vendor } = useParams()

    return (
        <p className={styles.text_container}>&nbsp;&nbsp;&nbsp;&nbsp;Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
            Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
            Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
            Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
            Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
            Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
            Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
            Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
            Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
            Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!</p>
    )
}

export default DescriptionBox