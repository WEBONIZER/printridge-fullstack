import styles from './tabs.module.css'
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useParams } from "react-router-dom";


function TabContent({ title, photo, text }) {
    const { model, vendor } = useParams()


    return (
        <div className={styles.tabcontent}>
            <h3 className={styles.title}>
                {title}
            </h3>
            <div className={styles.images_box}>
                {
                    photo.map(i => {
                        const images = require.context('../../images/examples/refill', true);
                        const img = images.keys().includes(`./${vendor}/${model}/${i.item}`) ? images(`./${vendor}/${model}/${i.item}`) : null

                        return (
                            <img
                                className={styles.image}
                                src={img}
                                alt={'фото'}
                            />)
                    })
                }
            </div>
            <p>
                {text}
            </p>
        </div>
    );
};

function Tabs({ items }) {

    const activeLink = ({ isActive }) => ({ color: isActive ? '#F2F2F3' : '#000' });

    const [active, setActive] = React.useState(null);

    const openTab = e => setActive(e.target.dataset.index);

    return (
        <div className={styles.box}>
            <div className={styles.tab}>
                {items.map((n, i) => (
                    <NavLink
                        style={activeLink}
                        className={styles.link}
                        onClick={openTab}
                        data-index={i}
                    >{n.title}</NavLink>
                ))}
            </div>
            {items[active] && <TabContent {...items[active]} />}
        </div>
    );
}

export default Tabs;