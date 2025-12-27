import styles from './item.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FC, useEffect, useState } from "react";
import { getPrintersByCartridgeId, Printer, Cartridge } from '../../../utils/api';

interface ItemProps {
    cartridge: Cartridge;
}

const Item: FC<ItemProps> = ({ cartridge }) => {
    const location = useLocation();
    const locationPathname = location.pathname;
    const [printers, setPrinters] = useState<Printer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Преобразуем chip в boolean если это строка
    const chipValue = typeof cartridge.chip === 'string' 
        ? cartridge.chip.toLowerCase() === 'true' || cartridge.chip === '1'
        : Boolean(cartridge.chip);

    useEffect(() => {
        const loadPrinters = async () => {
            try {
                const response = await getPrintersByCartridgeId(cartridge._id);
                setPrinters(response.data || []);
            } catch (error) {
                console.error('Ошибка загрузки устройств:', error);
                setPrinters([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadPrinters();
    }, [cartridge._id]);

    return (
        <Link
            to={`${locationPathname}/${cartridge.modelCart}`}
            className={styles.link}
        >
            <div className={styles.price_row}>
                <p className={styles.model_cart}>{`${(cartridge.modelCart || '').toUpperCase()}`}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.vendor}>
                    {isLoading ? 'Загрузка...' : (
                        <>
                            <span>{`${(cartridge.vendor || '').toUpperCase()}`}</span>
                            <span>{'\u00A0'}</span>
                            {printers.length > 0 ? (
                                printers.map((printer, index) => {
                                    if (!printer.model) return null;
                                    const modelUrl = printer.model.replace(/\s/g, '');
                                    const vendorUrl = (printer.vendor || cartridge.vendor || '').toLowerCase();
                                    return (
                                        <span key={printer._id || index}>
                                            {index > 0 && ' / '}
                                            <Link
                                                to={`/repair/${vendorUrl}/${modelUrl}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ 
                                                    color: 'inherit', 
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {printer.model}
                                            </Link>
                                        </span>
                                    );
                                })
                            ) : (
                                <span>{cartridge.devices || 'Не указано'}</span>
                            )}
                        </>
                    )}
                </p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.chip}>{chipValue ? 'уточняйте' : 'не требуется'}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.refill_price}>{cartridge.refill_price}</p>
                <p className={styles.separator}>{'|'}</p>
                <p className={styles.recovery_price}>{cartridge.recovery_price}</p>
            </div>
        </Link>
    );
}
 
export default Item;