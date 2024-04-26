import styles from './tab-contenet.module.css'
import MediaSlider from '../../media-slider/media-slider'

function TabContent({ title, photo, text, video }) {

    return (
        <div className={styles.tabcontent}>
            <h3 className={styles.title}>{title}</h3>
            <section className={styles.text}>{text}</section>
            <div className={styles.images_box}>
            </div>
            <MediaSlider photos={photo} videos={video} />
        </div>
    );
}

export default TabContent