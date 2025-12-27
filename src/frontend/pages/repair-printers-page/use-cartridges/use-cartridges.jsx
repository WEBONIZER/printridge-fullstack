import styles from './use-cartridges.module.css'
import { Link } from 'react-router-dom'

const UseCartridges = ({ cartridgesArray = [] }) => {
    if (!cartridgesArray || cartridgesArray.length === 0) {
        return null;
    }

    return (
        <>
            {cartridgesArray
                .filter(cartridge => cartridge && cartridge.public !== false)
                .map((cartridge, key) => {
                    // Используем фото из базы или fallback
                    const imageSrc = cartridge.photo?.src || 
                        `https://storage.yandexcloud.net/printridge/refill/${cartridge.vendor}/${cartridge.modelCart}.png`;
                    
                    // Формируем URL для ссылки (убираем пробелы из modelCart)
                    const modelCartUrl = (cartridge.modelCart || '').replace(/\s/g, '');
                    const vendorUrl = (cartridge.vendor || '').toLowerCase();
                    
                    return (
                        <div className={styles.container} key={cartridge._id || key}>
                            <img 
                                className={styles.image} 
                                src={imageSrc} 
                                alt={`Заправка картриджа ${cartridge.vendor?.toUpperCase()} ${cartridge.modelCart}`} 
                            />
                            <div className={styles.info_box}>
                                <p className={styles.title}>
                                    {`Заправка картриджа ${cartridge.vendor?.toUpperCase()} ${cartridge.modelCart}`}
                                </p>
                                {cartridge.refill_price && (
                                    <p className={styles.price}>
                                        {`Стоимость заправки ${cartridge.refill_price}`}
                                    </p>
                                )}
                                {cartridge.recovery_price && (
                                    <p className={styles.price}>
                                        {`Стоимость восстановления ${cartridge.recovery_price}`}
                                    </p>
                                )}
                            </div>
                            <Link
                                className={styles.button}
                                to={`/refill/${vendorUrl}/${modelCartUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Подробнее
                            </Link>
                        </div>
                    );
                })
            }
        </>
    )
}

export default UseCartridges

