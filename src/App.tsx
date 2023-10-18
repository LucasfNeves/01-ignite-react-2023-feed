import {Post, PostType} from './components/Post';
import { Header } from './components/Header';

import './styles/global.css'
import styles from './styles/App.module.css'
import { Sidebar } from './components/Sidebar';

// ? Simulando um banco de dados
const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/LucasfNeves.png',
      name: 'Lucas Farias',
      role: 'Desenvolvedor Web'
    },
    content: [
      { type: 'paragraph', content: "Fala galeraa 👋" },
      { type: 'paragraph', content: "Acabei de subir um projeto no meu portifólio.  É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
      { type: 'link', content: 'jane.desingner/doctocare' },
    ],
    publishedAt : new Date("2023-09-27 21:14:30"),

    },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/oMAtheus-Farias.png',
      name: 'Matheus',
      role: 'Desenvolvedor Web'
    },
    content: [
      { type: 'paragraph', content: "Fala galeraa 👋" },
      { type: 'paragraph', content: "Acabei de subir um projeto no meu portifólio.  É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
      { type: 'link', content: 'jane.desingner/doctocare' },
    ],
    publishedAt: new Date('2023-10-07T06:00:00'),
  },
];

export function App() {
  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>

          {posts.map(post => {
            return (
              <Post
                key={post.id} 
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}


