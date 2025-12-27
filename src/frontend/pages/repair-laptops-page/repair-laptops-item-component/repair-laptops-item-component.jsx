import styles from './repair-laptops-item-component.module.css'
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import Tabs from '../../../components/tabs/tabs';
import ImageRapairBox from '../image-repair-laptops/image-repair-laptops'
import DescriptionRepairBox from '../description-repair-laptops/description-repair-laptops'
import RepairPriceComponent from '../repair-laptops-price-component/repair-laptops-price-component'
import { getPaginatedLaptops, getPaginatedExamples, getLaptopPriceTemplateById } from '../../../utils/api';
import Spinner from '../../../components/spinner/spinner';

function RepairLaptopsItemComponent() {

    const { vendor, model } = useParams()
    const [laptop, setLaptop] = useState(null);
    const [examples, setExamples] = useState([]);
    const [priceTemplate, setPriceTemplate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const searchModel = model || '';
                const laptopsResponse = await getPaginatedLaptops({
                    page: 1,
                    limit: 10,
                    vendor: vendor || undefined,
                    model: searchModel || undefined,
                    public: 'true'
                });

                const foundLaptop = laptopsResponse.data.find(l =>
                    l.model.replace(/\s/g, '') === searchModel ||
                    l.model === searchModel ||
                    l.model.toLowerCase().replace(/\s/g, '') === searchModel.toLowerCase()
                ) || laptopsResponse.data[0];

                if (foundLaptop) {
                    if (foundLaptop.public === false) {
                        setLaptop(null);
                        return;
                    }
                    setLaptop(foundLaptop);

                    const [examplesResponse] = await Promise.all([
                        getPaginatedExamples({
                            page: 1,
                            limit: 100,
                            laptopId: foundLaptop._id,
                            public: 'true'
                        })
                    ]);

                    const filteredExamples = (examplesResponse.data || []).filter(example => example.public !== false);
                    setExamples(filteredExamples);

                    if (foundLaptop.price) {
                        try {
                            const priceResponse = await getLaptopPriceTemplateById(foundLaptop.price);
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

    if (!laptop) return null;

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;
    const seriesText = laptop.series ? `${laptop.series} ` : '';
    const processorText = laptop.processorVendor
        ? (laptop.processorName ? `${laptop.processorVendor} ${laptop.processorName}` : laptop.processorVendor)
        : '';
    const displayText = laptop.display ? `${laptop.display} "` : '';
    const ramText = laptop.ram ? `${laptop.ram} Гб` : '';
    const img = laptop.photo?.src || `https://storage.yandexcloud.net/printridge/laptops/${vendor}/${model}.png`;

    return (
        <>
            <Helmet>
                <title>{`Ремонт ноутбука ${laptop.vendor.toUpperCase()} ${laptop.model.toUpperCase()}`}</title>
                <meta name="title" content={`Ремонт ноутбука ${laptop.vendor.toUpperCase()} ${laptop.model.toUpperCase()}`} />
                <meta
                    name="keywords"
                    content={`ремонт ноутбука ${laptop.model.toUpperCase()}, чистка ноутбука ${laptop.vendor.toUpperCase()} ${laptop.model.toUpperCase()}, удаление вирусов, установка windows, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`Ремонт ноутбука ${laptop.model.toUpperCase()}, стоимость ремонта ноутбука ${laptop.vendor.toUpperCase()} ${laptop.model}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`Ремонт ноутбука ${laptop.model.toUpperCase()}`} />
                <meta property="og:description" content={`Стоимость ремонта ноутбука ${laptop.vendor.toUpperCase()} ${laptop.model}`} />
                <meta property="og:image" content={img} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div>
                <div className={styles.container}>
                    <h1 className={styles.header}>Ремонт ноутбука {`${laptop.vendor.toUpperCase()} ${seriesText}${laptop.model}`}</h1>
                    <div className={styles.img_desc_box}>
                        <div className={styles.price_container}>
                            <div className={styles.specifications}>
                                {displayText && (
                                    <div className={styles.text_box}>
                                        <p className={styles.blue_text}>Диагональ экрана:</p>
                                        <p className={styles.black_text}>{displayText}</p>
                                    </div>
                                )}
                                {processorText && (
                                    <div className={styles.text_box}>
                                        <p className={styles.blue_text}>Процессор:</p>
                                        <p className={styles.black_text}>{processorText}</p>
                                    </div>
                                )}
                                {laptop.video && (
                                    <div className={styles.text_box}>
                                        <p className={styles.blue_text}>Видео:</p>
                                        <p className={styles.black_text}>{laptop.video}</p>
                                    </div>
                                )}
                                {ramText && (
                                    <div className={styles.text_box}>
                                        <p className={styles.blue_text}>Оперативная память:</p>
                                        <p className={styles.black_text}>{ramText}</p>
                                    </div>
                                )}
                                {laptop.ramType && (
                                    <div className={styles.text_box}>
                                        <p className={styles.blue_text}>Тип оперативной памяти:</p>
                                        <p className={styles.black_text}>{laptop.ramType}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <ImageRapairBox laptop={laptop} />
                        <h2 className={styles.header_mobile}>Ремонт ноутбука {`${laptop.vendor.toUpperCase()} ${seriesText}${laptop.model}`}</h2>
                    </div>
                </div>
                {priceTemplate && <RepairPriceComponent priceTemplate={priceTemplate} laptop={laptop} />}
                <DescriptionRepairBox laptop={laptop} />
                {examples.length > 0 && <Tabs items={examples} />}
            </div>
        </>
    );
}

export default RepairLaptopsItemComponent;

