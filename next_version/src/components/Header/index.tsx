import styles from './styles.module.scss';

export function Header() {
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/warning.svg" alt="Logo"/>
            </div>
        </header>
    );
}