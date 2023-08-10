import styles from './item.module.css';
import { useParams, Link, useLocation } from 'react-router-dom';
import { FC, useState, useEffect } from "react";

const Item: FC = ({ modelCart, vend, chip, devices, recovery_price, refill_price, examples }: any) => {
    const [img, setImg] = useState<string | null>(null);
    const { vendor } = useParams();
    const location = useLocation();
    const locationPathname = location.pathname;

    useEffect(() => {
        const loadImage = async () => {
            try {
                const imgModule = await import(`../../../images/refill/${vendor}/${modelCart}.png`);
                setImg(imgModule.default);
            } catch (error) {
                // Image does not exist
                setImg(null);
            }
        };
        loadImage();
    }, [modelCart, vendor]);

    return (
        <Link
            key={modelCart}
            to={`${locationPathname}/${modelCart}`}
            state={{ background: location }}
            className={styles.link}
        >
            <div className={styles.price_row}>
                {img && (
                    <img
                        className={styles.image}
                        src={img}
                        alt={modelCart}
                    />
                )}
                <p className={styles.model_cart}>{modelCart}</p>
                <p className={styles.vendor}>{vend}</p>
                <p className={styles.chip}>{chip ? 'уточняйте' : 'не требуется'}</p>
                <p className={styles.devices}>{`${vend} ${devices}`}</p>
                <p className={styles.refill_price}>{refill_price}</p>
                <p className={styles.recovery_price}>{recovery_price}</p>
            </div>
        </Link>
    );
}

export default Item;