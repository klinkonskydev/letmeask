import copyIMG from '../assets/copy.svg';
import '../styles/RoomCode.scss';

type RoomCodeProp = {
  code: string;
}

export function RoomCode(props: RoomCodeProp) {

  function copyRoomCode(){
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="room-code" onClick={copyRoomCode}>
      <div>
        <img src={copyIMG} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
};