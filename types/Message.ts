export interface Partner {
  id: number;
  name: string;
  company_name: string | null;
}

export interface PartnersResponse {
  partners: Partner[];
}

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at?: string;
  sender: {
    id: number;
  };
  receiver: {
    id: number;
  };
}

export interface MessagesResponse {
  messages: Message[];
}
