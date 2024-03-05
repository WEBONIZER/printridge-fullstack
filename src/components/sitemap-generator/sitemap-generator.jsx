import styles from './sitemap-generator.module.css'
import { repairPrintersPrice } from '../../utils/repair-price'
import { refillData } from '../../utils/refill'

const SitemapGenerator = () => {

    const lastmod = new Date().toLocaleDateString().split('.').reverse().join('-');

    return (
        <div className={styles.box}>
            {refillData.map((i, key) =>
                <p>
                    {`<url>
                        <loc>https://printridge.ru/${i.vendor}/${i.modelCart}</loc>
                        <lastmod>${lastmod}</lastmod>
                    </url>
                    `}
                </p>
            )}
            {repairPrintersPrice.map((i, key) =>
                <p>
                    {`<url>
                        <loc>https://printridge.ru/${i.vendor}/${i.model.replace(/\s/g, '')}</loc>
                        <lastmod>${lastmod}</lastmod>
                    </url>
                    `}
                </p>
            )}
        </div>
    )
}

export default SitemapGenerator