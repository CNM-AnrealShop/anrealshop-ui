export type NoticeScope = 'USER' | 'SHOP' | 'ADMIN' | 'PUBLIC';
// export type NoticeTemplateType = "NEW_ORDER_FOR_SHOP"
export interface NoticeMessage {
  id: string;
  content: string;
  thumbnailUrl?: string;
  receiveBy: string;
  noticeScope: NoticeScope;
  redirectUrl?: string;
  createdAt: string; 
}
