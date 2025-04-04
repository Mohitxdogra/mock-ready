import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import Groq from "groq-sdk";

const Chatbot = () => {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const chatboxRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
    });

    const formatText = (text: string): string => {
        const boldRegex = /\*\*(.*?)\*\*/g;
        text = text.replace(boldRegex, "<strong>$1</strong>");

        const italicRegex = /\*(.*?)\*/g;
        text = text.replace(italicRegex, "<em>$1</em>");

        text = text.replace(/\n/g, "<br />");

        const bulletPointRegex = /^([*-])\s+(.*)$/gm;
        text = text.replace(bulletPointRegex, "<ul class='list-disc list-inside'><li>$2</li></ul>");

        const headerRegex = /^(#{1,6})\s*(.*?)$/gm;
        text = text.replace(headerRegex, (match, hashes, headerText) => {
            const level = hashes.length;
            return `<h${level} class="font-bold text-gray-800">${headerText}</h${level}>`;
        });

        const blockquoteRegex = /^>\s+(.*)$/gm;
        text = text.replace(blockquoteRegex, "<blockquote class='border-l-4 pl-4 italic text-gray-600'>$1</blockquote>");

        return text;
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatboxRef.current && !chatboxRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        const systemMessage = {
            role: "system",
            content: `You are a Chat bot specializing in competitive exam preparation. 
            Provide brief explanations, and answer to given Question , and approach to solve that Question in minimum word as possible. Ensure your responses are 
            clear and helpful for learners.`
        };

        const formattedMessages = newMessages.map(msg => ({
            role: msg.role,
            content: String(msg.content)
        }));

        try {
            const completion = await groq.chat.completions.create({
                messages: [systemMessage, ...formattedMessages],
                model: "llama3-70b-8192",
                temperature: 0.7,
                max_tokens: 300,
                top_p: 1,
                stream: false
            });

            const reply = completion.choices[0].message;
            setMessages([...newMessages, reply]);
        } catch (error) {
            console.error("Groq error:", error);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
            >
                💬
            </button>

            {isOpen && (
                <div ref={chatboxRef} className="fixed bottom-20 right-4 md:right-6 w-80 md:w-96 bg-gray-100 border border-gray-300 rounded-xl shadow-lg flex flex-col overflow-hidden">
                    <div className="bg-gray-200 text-gray-800 px-4 py-3 font-semibold flex justify-between items-center">
                        <span>AI Assistant</span>
                        <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-red-500">✖</button>
                    </div>

                    <div className="h-80 max-h-[60vh] overflow-y-auto p-3 space-y-3 text-sm">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-xs px-4 py-2 rounded-lg ${
                                        msg.role === "user"
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-gray-900 border"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
                                />
                            </div>
                        ))}
                        {isTyping && (
                            <div className="text-gray-500 italic text-sm px-2">Bot is typing...</div>
                        )}
                        <div ref={scrollRef}></div>
                    </div>

                    <div className="p-3 border-t border-gray-300 flex items-center gap-2 bg-gray-100">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
