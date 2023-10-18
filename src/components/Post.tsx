import { format, formatDistanceToNow } from 'date-fns' 
import ptBR from 'date-fns/locale/pt-BR' 

import styles from './Post.module.css'
import { Comment } from './Comment.tsx'
import { Avatar } from './Avatar.tsx'
import { FormEvent, ChangeEvent, useState, InvalidEvent } from 'react'

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' |  'link';
    content: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post : PostType;
}

export function Post ({post}: PostProps) {

    const [comments, setComments] = useState([  
        'Exemplo de comentário !'
    ])

    const [newCommentText, setNewCommentText] = useState('') 

    function handleCreateNewComment (event: FormEvent) {
        event.preventDefault();

        // imutabilidade
        setComments([...comments, newCommentText]) 
        setNewCommentText('');
    }

    function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement>) { 
        event.target.setCustomValidity(""); 
        setNewCommentText(event.target.value) 
    }

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL HH:mm 'h'", {
        locale: ptBR,
    })

    // Compara a data da publicação com adaata atual
    const publishdDateRealitveToNow = formatDistanceToNow(post.publishedAt, { 
        locale: ptBR,
        addSuffix: true, // isso mostra o "há" na frente da hora
    })

     // muda o texto do aviso do campo obrigatório
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("Esse campo é obrigatório");
    }

    function deleteComment(commentToDelete: String) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
        return comment !== commentToDelete 
    })

       setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEnpty = newCommentText.length === 0 ;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar
                     src={post.author.avatarUrl}
                     title={"alguma"}
                     /> 
                    <div className={styles.authorInfo}> 
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishdDateRealitveToNow}
                </time>
            </header>

            <div className={styles.content}>

                {post.content.map(line => {  
                    if (line.type === 'paragraph'){ 
                        return <p key={line.content}>{line.content}</p>
                    }else if (line.type === 'link') {
                        return <p key={line.content}><a href="">{line.content}</a></p>
                    }
                })}

            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu Feedback</strong>

                <textarea
                    value={newCommentText} 
                    name='comment'
                    placeholder='Deixe um comentário...'
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button disabled={isNewCommentEnpty} type='submit'> Publicar </button>
                </footer>
            </form>
            <div className={styles.commentList}>
              {comments.map(comment => {
                return (
                < Comment 
                    key={comment} 
                    content={comment} 
                    onDeleteComment={deleteComment} 
                />)
              })}
            </div>
        </article>
    )
    
}