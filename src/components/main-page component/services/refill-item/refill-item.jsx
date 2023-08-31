import styles from './refill-item.module.css'

const RefillItem = ({ title, description, text, style, image }) => {

    return (
        <div className={style}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.img_box}>
                <img className={styles.img} src={image} alt="" />
                <p className={styles.description}>{description}</p>
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    )
}

export default RefillItem