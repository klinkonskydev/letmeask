import { database } from '../services/firebase'
import { useHistory } from 'react-router-dom'
import { Button } from '../components/Button'
import { FormEvent, useState } from 'react'
import { useAuth } from '../Hooks/useAuth'

import illustrationIMG from '../assets/illustration.svg'
import googleIconIMG from '../assets/google-icon.svg'
import logoIMG from '../assets/logo.svg'
import '../styles/auth.scss'

export function Home(){
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()

    const [ roomCode, setRoomCode ] = useState('')

    async function handleCreateRoom(){
        if( !user ){
            await signInWithGoogle();
        };

        history.push('/rooms/new/');
    };

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if ( roomCode.trim() === '' ) return;

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if ( !roomRef.exists() ) {
            alert('Está sala não existe!!')
            return;
        }

        if ( roomRef.val().endedAt ){
            alert('Está sala foi encerrada ou não existe mais!');
            return;
        }

        history.push(`/room/${roomCode}`)
    };

    return (
        <div className="page-auth">
            <aside>
                <img src={illustrationIMG} alt="Illustration simbolizyng ask and questions" />
                <strong> Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiências em tempo-real. </p>
            </aside>

            <main>

                <div className="main-content">

                    <img src={logoIMG} alt="letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconIMG} alt="Google logo" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separetor">
                        Ou entre em uma sala
                    </div>

                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />

                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>

                </div>
            </main>

        </div>
    )
};