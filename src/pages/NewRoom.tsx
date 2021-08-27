import { Link, useHistory } from 'react-router-dom'
import { Button } from '../components/Button'
import { FormEvent, useState } from 'react'

import illustrationIMG from '../assets/illustration.svg'
import logoIMG from '../assets/logo.svg'

import '../styles/auth.scss'
import { database } from '../services/firebase'
import { useAuth } from '../Hooks/useAuth'

export function NewRoom(){
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');

    const history = useHistory()

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if( newRoom.trim() === '' ) return;

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/room/${firebaseRoom.key}`);
    };

    return (
        <div className="page-auth">
            <aside>
                <img src={illustrationIMG} 
                alt="Illustration simbolizyng ask and questions" />

                <strong> Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiências em tempo-real. </p>
            </aside>

            <main>
                <div className="main-content">

                    <img src={logoIMG} alt="letmeask" />
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />

                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>

                    <p>
                        Quer entrar em uma sala existente?
                        <Link to="/">clique aqui</Link>
                    </p>

                </div>
            </main>

        </div>
    )
};