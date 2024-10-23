import Header from '@/components/Header';
import { ChatRoom, Participant } from '@/types/ChatRoom';
import { FaUser, FaUsers, FaTransgender, FaClock, FaMapMarkerAlt, FaRoad, FaRunning } from 'react-icons/fa';
import axios from 'axios';
import EditButton from './EditButton';
import ChatButton from './CommentButton';

const getChatList = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ChatRoom`);
  return response.data;
};

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  const chats = await getChatList();
  const chatRoom = chats.find((chat: ChatRoom) => chat.chatRoomId === parseInt(id));

  return {
    title: chatRoom.title
  };
}

export default async function PostInfoPage({ params: { id } }: { params: { id: string } }) {
  const chats = await getChatList();
  const chatRoom = chats.find((chat: ChatRoom) => chat.chatRoomId === parseInt(id));

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <header className="flex justify-center relative p-10 shadow-md">
        <Header />
        <h1 className="text-4xl text-white font-bold text-center">{chatRoom.title}</h1>
      </header>
      <main className="flex-1 p-6 bg-white shadow-2xl rounded-t-3xl">
        <section className="mb-6 bg-white p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">채팅방 정보</h2>
            <div className="flex space-x-2">
              <EditButton id={id} />
              <ChatButton id={id} />
            </div>
          </div>
          <p className="text-lg flex items-center mb-4">
            <FaUser className="mr-2 text-primary" />
            방장: <span className="font-bold">{chatRoom.adminNickname}</span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaUsers className="mr-2 text-primary" />
            제한인원:{' '}
            <span className="font-bold">
              {chatRoom.memberCnt}/{chatRoom.limitMemberCnt}
            </span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaTransgender className="mr-2 text-primary" />
            제한성별:{' '}
            <span className="font-bold">
              {chatRoom.gender === 'All' ? '제한없음' : chatRoom.gender === 'M' ? '남자' : '여자'}
            </span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaClock className="mr-2 text-primary" />
            출발시간:{' '}
            <span className="font-bold">
              {chatRoom.startTime.split('T')[0]} {chatRoom.startTime.split('T')[1]}
            </span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2 text-primary" />
            출발위치: <span className="font-bold">{chatRoom.startPosition}</span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaRoad className="mr-2 text-primary" />
            거리: <span className="font-bold">{chatRoom.distance}km</span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaRunning className="mr-2 text-primary" />
            페이스:{' '}
            <span className="font-bold">
              {chatRoom.paceSec ? `${chatRoom.paceMin}분 ${chatRoom.paceSec}초` : `${chatRoom.paceMin}분`}
            </span>
          </p>
          <p className="mt-4 text-lg text-gray-800 leading-relaxed bg-gray-100 p-4 rounded-md border-2 border-primary border-dotted shadow-md">
            {chatRoom.content}
          </p>
        </section>
        <section className="border-t-2 border-gray-200 pt-4">
          <h2 className="text-2xl font-semibold mb-4">참가 예정 멤버</h2>
          <ul className="space-y-3">
            {chatRoom.participants.map((participant: Participant) => (
              <li key={participant.userId} className="bg-white border-l-4 border-primary rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-gray-800">{participant.nickname}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
