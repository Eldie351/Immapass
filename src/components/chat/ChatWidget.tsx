import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "bot" | "user";
    text: string;
    options?: string[];
}

interface UserResponses {
    [key: string]: string;
}

const QUESTIONS = [
    {
        id: "start",
        text: "Hello! 👋 I'm the Immipass AI assistant. I can help assess your eligibility for Canadian immigration. Would you like to start a quick assessment?",
        type: "option",
        options: ["Yes, let's start", "No, just browsing"],
        next: (answer: string) => (answer.startsWith("Yes") ? "age" : "end_browsing"),
    },
    {
        id: "age",
        text: "Great! Let's get to know you. How old are you?",
        type: "text",
        next: () => "education",
    },
    {
        id: "education",
        text: "What is your highest level of education?",
        type: "option",
        options: ["High School", "Diploma / Certificate", "Bachelor's Degree", "Master's / PhD"],
        next: () => "eca",
    },
    {
        id: "eca",
        text: "Do you have an Educational Credential Assessment (ECA) for your foreign education?",
        type: "option",
        options: ["Yes", "No", "Not applicable (Canadian Education)"],
        next: () => "language",
    },
    {
        id: "language",
        text: "Have you taken a language test (IELTS / CELPIP / TEF)? If so, what is your approximate CLB level?",
        type: "option",
        options: ["CLB 9 or higher", "CLB 7-8", "Below CLB 7", "Not tested yet"],
        next: () => "work_experience",
    },
    {
        id: "work_experience",
        text: "How many years of skilled work experience do you have?",
        type: "option",
        options: ["None", "Less than 1 year", "1-3 years", "3+ years"],
        next: () => "job_offer",
    },
    {
        id: "job_offer",
        text: "Do you have a valid job offer in Canada?",
        type: "option",
        options: ["Yes", "No"],
        next: () => "family",
    },
    {
        id: "family",
        text: "Do you have immediate family members (spouse, parents, siblings) living in Canada?",
        type: "option",
        options: ["Yes", "No"],
        next: () => "funds",
    },
    {
        id: "funds",
        text: "Do you have proof of settlement funds to support your stay?",
        type: "option",
        options: ["Yes", "No"],
        next: () => "complex",
    },
    {
        id: "complex",
        text: "Do you have any refugee claims, humanitarian applications, or removal orders in your history?",
        type: "option",
        options: ["Yes", "No"],
        next: (answer: string) => (answer === "Yes" ? "end_complex" : "end_eligible"),
    },
    {
        id: "end_eligible",
        text: "Thank you! Based on your answers, you may be eligible for one of Canada's immigration programs. We recommend a full Paid Assessment to get a detailed action plan and ranked program list.",
        type: "final",
    },
    {
        id: "end_complex",
        text: "Thank you for sharing. Given the complexity of your situation (refugee/humanitarian factors), we strongly recommend booking a private consultation with our legal experts for specialized advice.",
        type: "final",
    },
    {
        id: "end_browsing",
        text: "No problem! Feel free to browse our site. If you change your mind, we're here to help.",
        type: "final",
    },
];

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentStepId, setCurrentStepId] = useState("start");
    const [responses, setResponses] = useState<UserResponses>({});
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length === 0) {
            const startStep = QUESTIONS.find((q) => q.id === "start");
            if (startStep) {
                setMessages([{ role: "bot", text: startStep.text, options: startStep.options }]);
            }
        }
    }, [messages.length]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleResponse = (answer: string) => {
        // Add user answer
        setMessages((prev) => [...prev, { role: "user", text: answer }]);
        setResponses((prev) => ({ ...prev, [currentStepId]: answer }));

        const currentQuestion = QUESTIONS.find((q) => q.id === currentStepId);
        if (!currentQuestion || !currentQuestion.next) return;

        // Determine next step
        const nextStepId = currentQuestion.next(answer);
        const nextQuestion = QUESTIONS.find((q) => q.id === nextStepId);

        if (nextQuestion) {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { role: "bot", text: nextQuestion.text, options: nextQuestion.options },
                ]);
                setCurrentStepId(nextStepId);
            }, 600);
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Only proceed if current step expects text input
        const currentQuestion = QUESTIONS.find(q => q.id === currentStepId);
        if (currentQuestion?.type === 'text') {
            handleResponse(inputValue);
            setInputValue("");
        }
    };

    const currentQuestion = QUESTIONS.find((q) => q.id === currentStepId);
    const isTextInput = currentQuestion?.type === 'text';

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[350px] max-w-[calc(100vw-3rem)] bg-background border border-border rounded-xl shadow-xl overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-teal p-4 flex justify-between items-center text-primary-foreground shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="font-semibold">Immipass Assistant</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-primary-foreground hover:bg-white/20"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === "user"
                                                ? "bg-teal text-primary-foreground rounded-br-none"
                                                : "bg-white border border-border rounded-bl-none shadow-sm"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                    {msg.role === "bot" && msg.options && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {msg.options.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => handleResponse(option)}
                                                    className="px-3 py-1.5 bg-white border border-teal/20 text-teal text-xs rounded-full hover:bg-teal hover:text-white transition-colors shadow-sm"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input - Only show if text input is expected */}
                        {isTextInput && (
                            <div className="p-3 bg-background border-t border-border shrink-0">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-muted/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal"
                                    />
                                    <Button type="submit" size="icon" className="bg-teal hover:bg-teal-dark">
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full w-14 h-14 bg-teal hover:bg-teal-dark shadow-lg flex items-center justify-center transition-transform hover:scale-105"
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-6 h-6 text-white" />
                )}
            </Button>
        </div>
    );
}
