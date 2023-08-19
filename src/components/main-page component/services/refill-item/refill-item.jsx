import styles from './refill-item.module.css'

const RefillItem = ({title, description, sdf, style}) => {

const sty = `styles.${style}`
    console.log(sdf)
    return (
        <div className={style}>
            <p>{title}</p>
            <p>{description}</p>
        </div>
    )
}

export default RefillItem