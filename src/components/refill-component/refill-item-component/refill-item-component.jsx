import styles from './refill-item-component.module.css'
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { refillData } from '../../../utils/refill';
import Tabs from '../../tabs/tabs';
import ImageBox from '../refill-item-component/image-box/image-box'
import DescriptionBox from './description-box/description-box'
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

function RefillItemComponent() {

    const location = useLocation();
    const canonicalUrl = `https://printridge.ru${location.pathname}`;

    const { vendor, model } = useParams()
    const data = refillData.find((i) => i.modelCart === model)

    return (data ?
        <>
            <Helmet>
                <title>{`Заправка картриджа ${vendor.toUpperCase()} ${model.toUpperCase()} в Санкт-Петербурге`}</title>
                <meta name="title" content={`Заправка картриджей ${vendor.toUpperCase()} ${model.toUpperCase()} для ${data.devices} в Санкт-Петербурге`} />
                <meta
                    name="keywords"
                    content={`заправка картриджа ${vendor.toUpperCase()} ${model.toUpperCase()}, заправить картридж ${vendor.toUpperCase()} ${model.toUpperCase()}, для ${data.devices}, восстановление картриджа ${vendor.toUpperCase()} ${model.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta
                    name="description"
                    content={`Заправка картриджа ${data.modelCart} - ${data.refill_price} Восстановление ${data.modelCart} ${data.recovery_price}`}
                />
            </Helmet>
            <div>
                <div className={styles.container}>
                    <h2 className={styles.name}>Заправка картриджа {`${data.vendor.toUpperCase()} ${data.modelCart}`}</h2>
                    <div className={styles.img_desc_box}>
                        <div className={styles.left_box}>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Совместимые модели</p>
                                <p className={styles.black_text}>{data.devices}</p>
                            </div>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Ресурс картриджа:</p>
                                <p className={styles.black_text}>{`${data.resource} стр., при заполнении страницы 5%`}</p>
                            </div>

                            <p className={styles.boxes_title}>Цены</p>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>{`Заправка ${data.modelCart}`}</p>
                                <p className={styles.black_text}>{data.refill_price}</p>
                            </div>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>{`Восстановление ${data.modelCart}`}</p>
                                <p className={styles.black_text}>{data.recovery_price}</p>
                            </div>
                            <div className={styles.text_box}>
                                <p className={styles.blue_text}>Замена чипа</p>
                                <p className={styles.black_text}>{data.chip ? 'уточняйте' : 'не требуется'}</p>
                            </div>
                        </div>
                        <ImageBox />
                        <h2 className={styles.name_mobile}>Заправка картриджа {`${data.vendor.toUpperCase()} ${data.modelCart}`}</h2>
                    </div>
                    <DescriptionBox />
                </div>
                {data.examples.length !== 0 && <Tabs items={data.examples} />}
            </div>
        </> :
        <Navigate to="/404" replace />
    );
}

export default RefillItemComponent;