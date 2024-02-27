import styles from './tabs.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MediaSlider from '../media-slider/media-slider'

function TabContent({ title, photo, text, video }) {

    return (
        <div className={styles.tabcontent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
            <div className={styles.images_box}>
            </div>
            <MediaSlider photos={photo} videos={video} />
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
