import { useHistory, useParams } from 'react-router-dom'

import logoIMG from '../assets/logo.svg'
import DeleteIMG from '../assets/delete.svg'
import checkIMG from '../assets/check.svg'
import answerIMG from '../assets/answer.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../Hooks/useRoom'

import '../styles/Room.scss'
import { database } from '../services/firebase'

// Usa record para pegar itens de um array<o que tem no array>

type RoomParams = {
    id: string,
}

export function AdminRoom(){
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  
  const { title, question } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string){
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`)
        .remove();
    }
  };

  async function handleEndRoom(){
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/')
  };

  async function handleCheckQuestionAsAnswered(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`)
      .update({
        isAnswered: true,
      });
  };

  async function handleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`)
      .update({
        isHighlighted: true,
      });
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoIMG} alt="letmeask" />

          <div>
            <RoomCode code={roomId}/>
            <Button 
            isOutlined
            onClick={handleEndRoom}
            >Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          <span>{question.length > 0 && <span>{question.length} pergunta(s)</span>}</span>
        </div>

        <div className="question-list">
          {question.map( question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >

                {!question.isAnswered && (
                  <>
                    <button 
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkIMG} alt="Marcar pergunta como respondida" />
                    </button>

                    <button 
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                      >
                      <img src={answerIMG} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}
                
                <button 
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={DeleteIMG} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
        </main>
      </div>
  );
}
