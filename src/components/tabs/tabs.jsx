import styles from './tabs.module.css';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";

function TabContent({ title, photo, text }) {

    const location = useLocation();
    const { model, vendor } = useParams();

    return (
        <div className={styles.tabcontent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
            <div className={styles.images_box}>
                {location.pathname.includes('refill') ? photo.map((i, key) => {
                    const images = require.context('../../images/examples/refill', true);
                    const img = images.keys().includes(`./${vendor}/${model}/${i.item}`)
                        ?
                        images(`./${vendor}/${model}/${i.item}`) : null;

                    return (
                        <img
                            className={styles.image}
                            src={img}
                            alt={'фото'}
                            key={key}
                        />
                    );
                })
                    :
                    photo.map((i, key) => {
                        const images = require.context('../../images/examples/repair', true);
                        const img = images.keys().includes(`./${vendor}/${model}/${i.item}`) ? images(`./${vendor}/${model}/${i.item}`) : null;

                        return (
                            <img
                                className={styles.image}
                                src={img}
                                alt={'фото'}
                                key={key}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

function Tabs({ items }) {
    const [active, setActive] = useState(0);

    const openTab = e => setActive(e.target.dataset.index);

    return (
        <div className={styles.box}>
            <h2 className={styles.title}>Примеры нашей работы</h2>
            <div className={styles.tab}>
                {items.map((n, i) => (
                    <NavLink
                        key={i}
                        className={`${styles.link} ${active.toString() === i.toString() ? styles.active : ''}`}
                        onClick={openTab}
                        data-index={i}
                    >
                        {n.title}
                    </NavLink>
                ))}
            </div>
            {items[active] && <TabContent {...items[active]} />}
        </div>
    );
}

export default Tabs;
