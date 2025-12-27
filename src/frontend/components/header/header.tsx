import styles from './header.module.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { MainMenu } from '../main-menu/main-menu'
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { modalSlice } from "../../services/slices/modal";
import { Modal } from "../modal/modal";

export const HeaderComponent = () => {

    const { mobileMenuButton } = useSelector_((state: any) => state.modalSlice);
    const dispatch = useDispatch_();

    const location = useLocation();
    const { vendor } = useParams()

    const handleClick = () => {
        if (!mobileMenuButton) {
            dispatch(modalSlice.actions.mobileMenuButtonState(true));
        } else {
            dispatch(modalSlice.actions.mobileMenuButtonState(false));
        }
    }
    //console.log(mobileMenuButton)
    return (
        <>
            {mobileMenuButton && (
                <Modal action={modalSlice.actions.mobileMenuButtonState}>
                    <MainMenu position={"footer"} />
                </Modal>
            )}
            <div className={styles.container}>
                <div className={styles.logo_container}>
                    <div className={styles.info_box}>
                        <div className={styles.logo_and_menu}>
                            <Link
                                className={styles.link}
                                to="/" />
                            <MainMenu position={'header'} />
                        </div>
                        <div className={styles.logo_and_menu_mobile}>
                            <div className={styles.logo_and_menu_mobile_button}>
                                <Link
                                    className={styles.link}
                                    to="/" />
                                <Link
                                    className={styles.mobile_menu_button}
                                    onClick={handleClick}
                                    to='#'
                                />

                            </div>
                        </div>
                        <div className={styles.slogan_box}>
                            <p className={styles.slogan_big}>{
                                location.pathname.includes('refill') && `Заправка картриджей ${vendor === undefined ? '' : vendor.toUpperCase()}` ||
                                location.pathname.includes('repair') && 'Ремонт принтеров и МФУ' ||
                                location.pathname.includes('remont-noutbukov') && 'Ремонт ноутбуков' ||
                                location.pathname.includes('blog') && 'Блог Printridge' ||
                                'Printridge — решение проблем с компьютерной техникой'
                            }</p>
                            <p className={styles.slogan_small}>{
                                location.pathname.includes('refill') && 'Заправка картриджей помогает существенно экономить на печати' ||
                                location.pathname.includes('repair') && 'Ремонт принтеров и МФУ осуществляется на выезде и в нашем офисе' ||
                                location.pathname.includes('remont-noutbukov') && 'Ремонт ноутбуков осуществляется на выезде и в нашем офисе' ||
                                location.pathname.includes('blog') && 'Блог о ремонте техники и заправке картриджей' ||
                                'Заправка картриджей всех видов и ремонт принтеров любой модели и любой сложности'
                            }</p>
                        </div>
                    </div>
                </div>
                <div className={styles.images_box}>
                    <div className={styles.mail_box}>
                        <div className={styles.phone_box}>
                            <img
                                className={styles.phone_box_image}
                                src='https://s3.ru1.storage.beget.cloud/3aaacc647142-brontosaur/printridge/call.svg'
                                alt="Трубка"
                            />
                            <Link
                                className={styles.phone_text}
                                to={`tel:+79944390149`}
                            >
                                +7 994 439-01-49
                            </Link>
                        </div>
                        <div className={styles.phone_box}>
                            <img
                                className={styles.phone_box_image}
                                src='https://s3.ru1.storage.beget.cloud/3aaacc647142-brontosaur/printridge/language.svg'
                                alt="Трубка"
                            />
                            <Link
                                className={styles.phone_text}
                                to={`mailto:sales@printridge.ru`}
                            >
                                sales@printridge.ru
                            </Link>
                        </div>
                    </div>
                    <div className={styles.image}> </div>
                </div>
            </div>
        </>
    );
}