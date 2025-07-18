// 前后端共享的类型定义
export interface ChatMessage {
  id: string;
  content: string;
  createdAt: Date;
  role: 'user' | 'assistant';
}

export interface User {
  id: string;
  email: string;
  name: string;
}