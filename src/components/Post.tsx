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

    const [comments, setComments] = useState([  // comments são os comentários já existentes, e setComments será a função para captar novos comentários
        'Exemplo de comentário !'
    ])

    const [newCommentText, setNewCommentText] = useState('') 

    function handleCreateNewComment (event: FormEvent) {
        event.preventDefault();

        // imutabilidade
        setComments([...comments, newCommentText]) // ... pega os comentários já existentes, e new comment é o novo comentário
        setNewCommentText('');
    }

    function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement>) { // definimos o Generics do Typescript que são os parametros da tipagem
        event.target.setCustomValidity(""); // tira o bug de ao tentar preencher o campo ampos a mensagem de erro aparece  aviso do campo obrigatório
        setNewCommentText(event.target.value) // captura o valor de forma declarativa
    }

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL HH:mm 'h'", {
        locale: ptBR,
    })

    const publishdDateRealitveToNow = formatDistanceToNow(post.publishedAt, { // é uma função da blibioteca fns que recebe uma data e compara a data com o agora
        locale: ptBR,
        addSuffix: true, // isso mostra o "há" na frente da hora
    })

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("Esse campo é obrigatório"); // muda o texto do aviso do campo obrigatório
    }

    function deleteComment(commentToDelete: String) { // aqui estamos filtrando a lsita de comentário para deixarmos apenas os comentários estritamentes diferntes visíveis 
        const commentsWithoutDeletedOne = comments.filter(comment => {
        return comment !== commentToDelete //filter filtra a lista de comentários e só ira retornar os comentários diferentes de commentToDelete
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

                {post.content.map(line => {  // essa função percorre cada linha objeto do array e aplica a condicional nele se o tipo for paragrafo coloca dentro de uma tah apor exemplo
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
                    value={newCommentText} // o valor dessa área é o estado de newCommentText, toda vez que o valor do estado mudar a textarea reflete a alteração
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
                    onDeleteComment={deleteComment} // boas práticas para ações do usuário começar p nome da função com on
                />)
              })}
            </div>
        </article>
    )
    
}