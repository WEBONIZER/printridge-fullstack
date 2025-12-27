import { Link } from 'react-router-dom'
import styles from './main-page-description-box.module.css'
import { FC } from 'react';

interface MainPageDescriptionBoxProps {
    title: string;
    description: string;
    name: string;
}

export const MainPageDescriptionBox: FC<MainPageDescriptionBoxProps> = ({ title, description, name }) => {

    const getLinkTo = () => {
        if (name === 'blog') return '/blog';
        if (name === 'refill') return '/refill/hp';
        if (name === 'repair') return '/repair/hp';
        if (name === 'remont-noutbukov') return '/remont-noutbukov/hp';
        return '/';
    };

    const getLinkClassName = (isMobile: boolean = false) => {
        const base = isMobile ? 'link_image_to_' : 'link_image_to_';
        if (name === 'blog') return styles[`${base}refill${isMobile ? '_mobile' : ''}`];
        if (name === 'refill') return styles[`${base}refill${isMobile ? '_mobile' : ''}`];
        if (name === 'repair') return styles[`${base}repair${isMobile ? '_mobile' : ''}`];
        if (name === 'remont-noutbukov') return styles[`${base}refill${isMobile ? '_mobile' : ''}`];
        return '';
    };

    return (
        <section className={styles.container}>
            <Link
                className={getLinkClassName(true)}
                to={getLinkTo()}
            >
            </Link>
            <div className={styles.content_box}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>
            <Link
                className={getLinkClassName(false)}
                to={getLinkTo()}
            >
            </Link>
            <Link
                className={styles.mobile_button}
                to={getLinkTo()}
            >
               <p className={styles.button_name}>Подробнее</p> 
            </Link>
        </section>
    )
}

