export type ListeningModes = "off" | "anc" | "transparency" | "adaptive";

export type ConversationAwarenessState = "on" | "off";

export interface StatusSnapshot {
  listeningMode: ListeningModes | null;
  conversationAwareness: ConversationAwarenessState | null;
}
