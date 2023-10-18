import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css';


interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;
}

export function Avatar ({hasBorder = true, ...props}: AvatarProps) { 

    return (
        <img 
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}

            // ? Todos os atributos inserido na propriedade irão aparecer automaticamente por conta do Rest Operator
            {...props} 
           
        />
    )
}