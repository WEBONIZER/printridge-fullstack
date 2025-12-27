import styles from './repair-laptops-price-component.module.css'

const RepairPriceComponent = ({ priceTemplate, laptop }) => {
    if (!priceTemplate) return null;

    return (
        <div className={styles.container}>
            <p className={styles.boxes_title}>Цены</p>
            <div className={styles.price_wrap_box}>
                {priceTemplate.diagnostics !== undefined && (
                    <div className={styles.text_box}>
                        <p className={styles.text}>Диагностика</p>
                        <p className={styles.price}>{priceTemplate.diagnostics}</p>
                    </div>
                )}
                {priceTemplate.TO !== undefined && (
                    <div className={styles.text_box}>
                        <p className={styles.text}>Чистка ноутбука</p>
                        <p className={styles.price}>{priceTemplate.TO}</p>
                    </div>
                )}
                {priceTemplate.thermalPaste !== undefined && (
                    <div className={styles.text_box}>
                        <p className={styles.text}>Замена термопасты</p>
                        <p className={styles.price}>{priceTemplate.thermalPaste}</p>
                    </div>
                )}
                {priceTemplate.installOS !== undefined && (
                    <div className={styles.text_box}>
                        <p className={styles.text}>Установка ОС (Windows)</p>
                        <p className={styles.price}>{priceTemplate.installOS}</p>
                    </div>
                )}
                {priceTemplate.installPO !== undefined && (
                    <div className={styles.text_box}>
                        <p className={styles.text}>Установка программ</p>
                        <p className={styles.price}>{priceTemplate.installPO}</p>
                    </div>
                )}
                {priceTemplate.antivirus !== undefined && (
                    <div className={styles.text_box}>
                        <p className={styles.text}>Удаление вирусов</p>
                        <p className={styles.price}>{priceTemplate.antivirus}</p>
                    </div>
                )}
                {priceTemplate.matrixReplacement !== undefined && (
                    <div className={styles.text_box}>
                        <p className={styles.text}>Замена матрицы</p>
                        <p className={styles.price}>{priceTemplate.matrixReplacement}</p>
                    </div>
                )}
                {priceTemplate.batteryReplacement !== undefined && (
                    <div className={styles.text_box}>
                        <p className={styles.text}>Замена батареи</p>
                        <p className={styles.price}>{priceTemplate.batteryReplacement}</p>
                    </div>
                )}
                {priceTemplate.ramReplacement !== undefined && (
                    <div className={styles.text_box}>
                        <p className={styles.text}>Замена оперативки</p>
                        <p className={styles.price}>{priceTemplate.ramReplacement}</p>
                    </div>
                )}
                {priceTemplate.electronics !== undefined && (
                    <div className={styles.text_box}>
                        <p className={styles.text}>Ремонт электроники</p>
                        <p className={styles.price}>{priceTemplate.electronics}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RepairPriceComponent

