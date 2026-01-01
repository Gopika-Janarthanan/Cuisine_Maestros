import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messageService, Message } from '@/services/messageService';
import { useAuth } from '@/context/AuthContext';
import { Send } from 'lucide-react';

interface ChatWindowProps {
    otherUserId: number; // The person we are talking to
    otherUserName?: string;
    bookingId?: number; // Optional context
    className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ otherUserId, otherUserName = "Chat", bookingId, className }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial load and polling
    useEffect(() => {
        if (!user) return;
        const currentId = Number(user.id);

        const fetchMessages = async () => {
            try {
                const data = await messageService.getConversation(currentId, otherUserId);
                setMessages(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load messages", error);
            }
        };

        fetchMessages();
        // Poll every 5 seconds for new messages
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [user, otherUserId]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        try {
            const sent = await messageService.sendMessage({
                senderId: Number(user.id),
                receiverId: otherUserId,
                content: newMessage,
                bookingId
            });
            setMessages([...messages, sent]); // Optimistic update / append
            setNewMessage("");
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    if (!user) return <div>Please login to chat</div>;

    return (
        <div className={`flex flex-col h-[400px] border rounded-lg bg-background shadow-sm ${className}`}>
            <div className="p-3 border-b border-border font-semibold bg-muted/30">
                {otherUserName}
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.length === 0 && !loading && (
                        <p className="text-center text-sm text-muted-foreground py-4">No messages yet. Say hello!</p>
                    )}
                    {messages.map((msg) => {
                        const isMe = msg.senderId === Number(user.id);
                        return (
                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                    }`}>
                                    <p>{msg.content}</p>
                                    <span className="text-[10px] opacity-70 block text-right mt-1">
                                        {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <form onSubmit={handleSend} className="p-3 border-t border-border flex gap-2">
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                />
                <Button type="submit" size="icon" variant="ghost">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </form>
        </div>
    );
};

export default ChatWindow;
