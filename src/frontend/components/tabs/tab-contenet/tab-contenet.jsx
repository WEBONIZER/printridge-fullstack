import styles from './tab-contenet.module.css'
import MediaSlider from '../../media-slider/media-slider'
import { sanitizeHtml } from '../../../utils/html-sanitizer'

function TabContent({ title, photo, text, video }) {
    // Санитизируем title и text перед отображением
    const sanitizedTitle = sanitizeHtml(title || '');
    const sanitizedText = sanitizeHtml(text || '');

    return (
        <div className={styles.tabcontent}>
            <h3 
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
            />
            <section 
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: sanitizedText }}
            />
            <div className={styles.images_box}>
            </div>
            <MediaSlider photos={photo} videos={video} />
        </div>
    );
}

export default TabContent