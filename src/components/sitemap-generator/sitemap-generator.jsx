import styles from './sitemap-generator.module.css'
import { repairPrintersPrice } from '../../utils/repair-price'
import { refillData } from '../../utils/refill'
import { laptopRepairPrice } from '../../utils/laptops-price'

const SitemapGenerator = () => {

    const lastmod = new Date().toLocaleDateString().split('.').reverse().join('-');

    return (
        <div className={styles.box}>
            {refillData.map((i, key) =>
                <p>
                    {`<url>
                        <loc>https://printridge.ru/refill/${i.vendor}/${i.modelCart}</loc>
                        <lastmod>${lastmod}</lastmod>
                        <priority>1.0</priority>
                        <link rel="canonical">https://printridge.ru/refill/${i.vendor}/${i.modelCart}</link>
                    </url>
                    `}
                </p>
            )}
            {repairPrintersPrice.map((i, key) =>
                <p>
                    {`<url>
                        <loc>https://printridge.ru/repair/${i.vendor}/${i.model.replace(/\s/g, '')}</loc>
                        <lastmod>${lastmod}</lastmod>
                        <priority>1.0</priority>
                        <link rel="canonical">https://printridge.ru/repair/${i.vendor}/${i.model.replace(/\s/g, '')}</link>
                    </url>
                    `}
                </p>
            )}
            {laptopRepairPrice.map((i, key) =>
                <p>
                    {`<url>
                        <loc>https://printridge.ru/remont-noutbukov/${i.vendor}/${i.model.replace(/\s/g, '')}</loc>
                        <lastmod>${lastmod}</lastmod>
                        <priority>1.0</priority>
                        <link rel="canonical">https://printridge.ru/remont-noutbukov/${i.vendor}/${i.model.replace(/\s/g, '')}</link>
                    </url>
                    `}
                </p>
            )}
        </div>
    )
}

export default SitemapGenerator