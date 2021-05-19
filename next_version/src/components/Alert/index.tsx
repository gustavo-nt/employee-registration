import styles from './styles.module.scss';

type AlertProps = {
    isVisible: boolean;
}

export function Alert({ isVisible }: AlertProps) {
    return(
        <div className={`${styles.alertSucess} ${isVisible ? styles.op1 : styles.op0}`} id="alert">
            <div className={styles.img}>
                <img src="outline-check_circle-24px.svg"/>
            </div>
            <p>Candidatura enviada com sucesso!</p>
        </div>
    );
}
