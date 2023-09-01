import styles from './description-box.module.css'
import { useParams } from "react-router-dom";

const DescriptionBox = () => {

    const { model, vendor } = useParams()

    return (
        <div className={styles.text_container}>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${vendor.toUpperCase()} ${model}`} используется самый лучший в мире тонер!</p>
        </div>
    )
}

export default DescriptionBox