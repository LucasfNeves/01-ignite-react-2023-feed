import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentPorps {
    content: string;
    onDeleteComment: (comment: string) => void
}

export function Comment({content, onDeleteComment}: CommentPorps) {

    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment() {
        console.log("deletar")

        onDeleteComment(content) 
    }

    function handleLikeComment () {
        setLikeCount(likeCount + 1); 
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/lucasfNeves.png" alt="" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header> 
                        <div className={styles.authorAndTime}>
                            <strong> Lucas Farias</strong>
                            <time title='09 de setembro as 09:16 PM' dateTime='9-27-2023 9:14:30PM'>Publicado a 1 hr atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24}/>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                   <button onClick={handleLikeComment}>
                        <ThumbsUp/>
                        Aplaudir <span>{likeCount}</span>
                   </button>
                </footer>
            </div>
        </div>
    )
}