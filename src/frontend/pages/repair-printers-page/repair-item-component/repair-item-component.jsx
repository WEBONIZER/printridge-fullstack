import styles from './repair-item-component.module.css'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Tabs from '../../../components/tabs/tabs';
import ImageRepairBox from '../image-repair-box/image-repair-box'
import DescriptionRepairBox from '../description-repair-box/description-repair-box'
import UseCartridges from '../use-cartridges/use-cartridges'
import RepairPriceComponent from '../repair-price-component/repair-price-component'
import { getPaginatedPrinters, getCartridgesByPrinterId, getPaginatedExamples, getPrinterPriceTemplateById } from '../../../utils/api';
import Spinner from '../../../components/spinner/spinner';

function RepairItemComponent() {

    const { vendor, model } = useParams()
    const [printer, setPrinter] = useState(null);
    const [cartridges, setCartridges] = useState([]);
    const [examples, setExamples] = useState([]);
    const [priceTemplate, setPriceTemplate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Получаем принтер по vendor и model
                // model в URL уже без пробелов, но в базе может быть с пробелами
                // Ищем по точному совпадению или по частичному совпадению
                const searchModel = model || '';
                const printersResponse = await getPaginatedPrinters({
                    page: 1,
                    limit: 10, // Берем больше, чтобы найти нужный
                    vendor: vendor || undefined,
                    model: searchModel || undefined,
                    public: 'true'
                });

                // Ищем принтер, у которого model совпадает (с учетом пробелов)
                const foundPrinter = printersResponse.data.find(p =>
                    p.model.replace(/\s/g, '') === searchModel ||
                    p.model === searchModel ||
                    p.model.toLowerCase().replace(/\s/g, '') === searchModel.toLowerCase()
                ) || printersResponse.data[0];

                if (foundPrinter) {
                    if (foundPrinter.public === false) {
                        setPrinter(null);
                        return;
                    }
                    setPrinter(foundPrinter);

                    // Получаем связанные данные
                    const [cartridgesResponse, examplesResponse] = await Promise.all([
                        getCartridgesByPrinterId(foundPrinter._id),
                        getPaginatedExamples({
                            page: 1,
                            limit: 100,
                            printerId: foundPrinter._id,
                            public: 'true'
                        })
                    ]);

                    setCartridges(cartridgesResponse.data || []);
                    const filteredExamples = (examplesResponse.data || []).filter(example => example.public !== false);
                    setExamples(filteredExamples);

                    // Получаем прайс, если он есть
                    if (foundPrinter.price) {
                        try {
                            const priceResponse = await getPrinterPriceTemplateById(foundPrinter.price);
                            setPriceTemplate(priceResponse.data);
                        } catch (error) {
                            console.error('Ошибка загрузки прайса:', error);
                        }
                    }
                }
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [vendor, model]);

    if (isLoading) {
        return <Spinner />;
    }

    if (!printer) return null;

    const typeText = printer.type === 'mono' ? 'Монохромный' : printer.type === 'color' ? 'Цветной' : '';
    const deviceText = printer.device === 'printer' ? 'Принтер' : printer.device === 'MFU' ? 'МФУ' : '';
    const speedText = printer.speed ? `${printer.speed} стр./мин.` : '';
    const capacityText = printer.capacity ? `${printer.capacity} в месяц` : '';

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.header}>Ремонт {`${printer.vendor.toUpperCase()} ${printer.model}`}</h1>
                <div className={styles.img_desc_box}>
                    <div className={styles.price_container}>
                        <div className={styles.specifications}>
                            {typeText && (
                                <div className={styles.text_box}>
                                    <p className={styles.blue_text}>Способ печати</p>
                                    <p className={styles.black_text}>{typeText}</p>
                                </div>
                            )}
                            {deviceText && (
                                <div className={styles.text_box}>
                                    <p className={styles.blue_text}>Тип устройства</p>
                                    <p className={styles.black_text}>{deviceText}</p>
                                </div>
                            )}
                            {printer.format && (
                                <div className={styles.text_box}>
                                    <p className={styles.blue_text}>Формат печати</p>
                                    <p className={styles.black_text}>{printer.format}</p>
                                </div>
                            )}
                            {speedText && (
                                <div className={styles.text_box}>
                                    <p className={styles.blue_text}>Скорость</p>
                                    <p className={styles.black_text}>{speedText}</p>
                                </div>
                            )}
                            {capacityText && (
                                <div className={styles.text_box}>
                                    <p className={styles.blue_text}>Максимальная нагрузка (стр.)</p>
                                    <p className={styles.black_text}>{capacityText}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <ImageRepairBox printer={printer} />
                    <h2 className={styles.header_mobile}>Ремонт {`${printer.model}`}</h2>
                </div>
            </div>
            {priceTemplate && <RepairPriceComponent priceTemplate={priceTemplate} printer={printer} />}
            <DescriptionRepairBox printer={printer} />
            {cartridges.length > 0 && <UseCartridges cartridgesArray={cartridges} />}
            {examples.length > 0 && <Tabs items={examples} />}
        </div>
    );
}

export default RepairItemComponent;

