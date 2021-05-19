import styles from './styles.module.scss';
import InputMask from 'react-input-mask';

interface InputProps {
    mask?: string;
    maskChar?: string;
    type?: string;
    placeholder?: string;
    pattern?: string;
    value?: string;
    required?: boolean;
    onChange?: (event) => void;
}

export function Input({mask, ...rest}: InputProps) {
    return(
        <>
            { 
                mask ? (
                    <InputMask  
                        mask={mask}
                        className={styles.input}
                        {...rest}
                    />
                ) : (
                    <input 
                        className={styles.input}
                        {...rest}
                    />
                )
            }
        </>
    );
}