import styles from './main-page-description-box.module.css'

const MainPageDescriptionBox = ({ title, description, image }) => {

    return (
        <section className={styles.container}>
            <div className={styles.content_box}> 
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>
            <img className={styles.image} src={image} alt="ing" />
        </section>
    )
}

export default MainPageDescriptionBox