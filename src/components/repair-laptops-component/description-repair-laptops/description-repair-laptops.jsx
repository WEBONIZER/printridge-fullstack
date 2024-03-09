import styles from './description-repair-laptops.module.css'
import { useParams } from "react-router-dom";
import { repairLaptops } from '../../../utils/laptops';

const DescriptionRepairBox = () => {

    const { model } = useParams()
    const data = repairLaptops.find((i) => i.model.replace(/\s/g, '') === model)

    return (
        <div className={styles.container}>
            <p className={styles.text_container}>
                Выше указаны цены за работы по ремонту некоторых узлов вашего ноутбука или установку программ! Стоимость запчастей, которые, возможно, потребуется заменить, считается отдельно
                и согласовывается с клиентом. Конкретную стоимость ремонта именно в вашем случае, мы сможем озвучить после проведения диагностики.<br /><br />
                Для ускорения процесса диагностики неисправностей, постарайтесь, пожалуйста, как можно подробнее рассказать нам о всех неисправностях вашего ноутбука. Это значительно ускорит процесс ремонта и,
                в большинстве случаев, сделает диагностику <strong>БЕСПЛАТНОЙ!</strong><br /><br />
                Большую часть неисправностей вашего ноутбука возможно решить <strong>на выезде</strong>, не забирая устройство.
                Потому, <strong>ремонт ноутбука {`${data.vendor.toUpperCase()} ${data.model}`}</strong> может быть осуществлён прямо у вас.<br /><br />
                О всех возможных нюансах и последствиях мы вас непременно предупредим.
            </p>
        </div>
    )
}

export default DescriptionRepairBox