"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "next/navigation";

interface ChatFormData {
  message: string;
}

export default function ChatRoomContainer() {
  const { id } = useParams();
  const [messages, setMessages] = useState<string[]>([]);
  const [client, setClient] = useState<Client | null>(null);
  const { control, handleSubmit, reset } = useForm<ChatFormData>();

  useEffect(() => {
    // 이전 메세지 받아오기
    // 이거 없으면 채팅방 나갓다 다시 들어와도 메세지 날라감
    // const loadPrevMessages = async () => {
    //   try {
    //     const response = await axios.get(`${id}`);
    //     const messages = setMessages(messages);
    //   } catch (error) {
    //     console.error("채팅 내역 로드 실패", error);
    //   }
    // };

    const client = new Client({
      // 웹소켓 연결 대신 SockJS사용
      webSocketFactory: () => new SockJS("http://43.202.152.217:8080/chat"), // SockJS 사용
      reconnectDelay: 5000,
      connectHeaders: {},
    });

    // 연결시 할 일
    client.onConnect = () => {
      // 채팅방 구독 (헤더에 엑세스 토큰 필요한가?)
      // URL 정확히 어떻게 하는지...
      client.subscribe(`/sub/chat/room/${id}`, (message) => {
        setMessages((prevMessages) => [...prevMessages, message.body]);
      });
    };

    // 연결 끝겼을때 할 일
    client.onDisconnect = () => {
      console.log("Disconnected");
    };

    // 연결 시작
    client.activate();
    setClient(client);
    // 채팅방 벗어나면 연결 종료
    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [id]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 메세지 보내기 (헤더에 엑세스 토큰 필요한가?)
  const onSubmit = (data: ChatFormData) => {
    if (data.message.trim() === "") {
      return;
    }

    if (client) {
      const messagePayload = {
        chatRoomId: id,
        senderId: "",
        message: data.message,
      };

      client.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify(messagePayload),
      });
    }

    reset();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-[80vh] flex flex-col">
      {/* 채팅 메시지 영역 */}
      <div className="flex-grow mb-4 space-y-2 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="chat chat-start">
            <div className="chat-bubble bg-green-500 text-white rounded-lg p-2 max-w-[80%] break-words">
              {message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 메시지 입력 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full p-2">
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full focus:outline-none"
            />
          )}
        />
      </form>
    </div>
  );
}
