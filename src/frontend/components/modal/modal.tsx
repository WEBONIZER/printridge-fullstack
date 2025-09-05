import { useDispatch_ } from "../../services/reducers/root-reducer";
import styles from "./modal.module.css";

export const Modal = ({ children, action }: any) => {
  const dispatch = useDispatch_();

  const handleClick = () => {
    dispatch(action(false));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClick();
    }
  };

  return (
    <div>
      <dialog
        open
        className={styles.component_box}
        onClick={handleBackdropClick}
      >
        <div className={styles.window_box}>
          <div className={styles.close_icon} onClick={handleClick} />
          {children}
        </div>
      </dialog>
    </div>
  );
};
