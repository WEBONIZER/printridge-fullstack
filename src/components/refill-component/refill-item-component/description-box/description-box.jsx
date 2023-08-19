import styles from './description-box.module.css'
import { refillData } from '../../../../utils/refill';
import { useParams } from "react-router-dom";

const DescriptionBox = () => {

    const { model } = useParams()
    const data = refillData.find((i) => i.modelCart === model)

    return (
        <div className={styles.text_container}>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!
                Для заправки картриджей {`${data.vendor} ${data.modelCart}`} используется самый лучший в мире тонер!</p>
        </div>
    )
}

export default DescriptionBox