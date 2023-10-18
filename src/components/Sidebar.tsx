import { Avatar } from './Avatar';
import styles from './Sidebar.module.css'
import {PencilLine} from 'phosphor-react'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} 
            src="https://i.pinimg.com/550x/c8/67/3a/c8673ad4c46ade00cf3bd0049db62b16.jpg"/>

            <div className={styles.profile}>
                <Avatar src="https://github.com/LucasfNeves.png"/>
                <strong>Lucas Farias</strong>
                <span>Web Developer</span>
                <footer>
                    <a href="#">
                        <PencilLine size={20}/>
                        Editar seu perfil
                    </a>
                </footer>
            </div>
        </aside>
    );
}