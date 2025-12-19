import { Client, type IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BASE_API_URL } from '../constant';
import showErrorNotification from '../components/Toast/NotificationError';
import NoticeService from './NoticeService';

const WS_URL = `${BASE_API_URL}/ws_drew`;
const DESTINATION_NOTICE = '/user/queue/notifications';
const DESTINATION_CHAT = '/user/queue/chat';

let stompClient: Client | null = null;

function ensureClient(): Client {
  if (stompClient) return stompClient;
  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(
        WS_URL,
        undefined,
        { transports: ['websocket', 'xhr-streaming', 'xhr-polling'], withCredentials: true } as any
      ),
    reconnectDelay: 0,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
  });

  stompClient.onConnect = () => {
    stompClient!.subscribe('/topic/public', (response) => {
      console.log('Received message:', response.body);
    });

    stompClient!.subscribe(DESTINATION_NOTICE, (msg: IMessage) => {
      NoticeService.showPrivateNotice(JSON.parse(msg.body));
    });

    stompClient!.subscribe(DESTINATION_CHAT, (msg: IMessage) => {
      console.log('Chat message:', msg.body);
    });


  };

  stompClient.onStompError = (frame) => {
    showErrorNotification('Thông báo lỗi hệ thống', frame.headers['message'] || 'An error occurred with the WebSocket connection.');
  };

  stompClient.onWebSocketError = (event) => {
    showErrorNotification('Thông báo lỗi hệ thống', event.headers['message'] || 'An error occurred with the WebSocket connection.');
  };

  return stompClient;
}

export function connectWs(): void {
  if (stompClient?.active) {
    return;
  }

  if (stompClient && !stompClient.active) {
    stompClient = null;
  }

  const client = ensureClient();
  client.activate();
}

export function disconnectWs(): void {
  if (stompClient?.active) {
    stompClient.deactivate();
    stompClient = null;
  }
}


export function sendMessage(destination: string, body: any) {
  if (!stompClient || !stompClient.active) {
    return;
  }

  stompClient.publish({
    destination: '/app_message' + destination,
    body: JSON.stringify(body),
  });
}