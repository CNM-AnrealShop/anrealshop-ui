import showSuccessNotification from "../components/Toast/NotificationSuccess";
import type { NoticeMessage } from "../types/NoticeType";


const handleRedirect = (url: string) => {
  window.location.href = url;
}

const showPublicNotice = (message: NoticeMessage) => {
  showSuccessNotification('Thông báo mới', message.content);
};

const showPrivateNotice = (message: NoticeMessage) => {
  const shouldRedirect = message.redirectUrl && message.redirectUrl !== "/";
  if (shouldRedirect) {
    showSuccessNotification({
      title: 'Thông báo mới',
      message: message.content,
      onClick: () => handleRedirect(message.redirectUrl!)
    });
  } else {
    showSuccessNotification('Thông báo mới', message.content);
  }
}

export default {
  showPublicNotice,
  showPrivateNotice,
};