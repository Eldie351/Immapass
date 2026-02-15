import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
    role: "bot" | "user";
    text: string;
    options?: { label: string; value: string }[];
}

interface UserResponses {
    [key: string]: string;
}

export function ChatWidget() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentStepId, setCurrentStepId] = useState("start");
    const [responses, setResponses] = useState<UserResponses>({});
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const QUESTIONS = [
        {
            id: "start",
            text: t("chat.welcome"),
            type: "option",
            options: [
                { label: t("chat.start_option_yes"), value: "yes" },
                { label: t("chat.start_option_no"), value: "no" }
            ],
            next: (value: string) => (value === "yes" ? "name" : "end_browsing"),
        },
        {
            id: "name",
            text: t("chat.ask_name"),
            type: "text",
            next: () => "age",
        },
        {
            id: "age",
            text: t("chat.ask_age"),
            type: "text",
            next: () => "education",
        },
        {
            id: "education",
            text: t("chat.ask_edu"),
            type: "option",
            options: [
                { label: t("chat.edu_high_school"), value: "high_school" },
                { label: t("chat.edu_diploma"), value: "diploma" },
                { label: t("chat.edu_bachelors"), value: "bachelors" },
                { label: t("chat.edu_masters"), value: "masters" }
            ],
            next: () => "eca",
        },
        {
            id: "eca",
            text: t("chat.ask_eca"),
            type: "option",
            options: [
                { label: t("chat.eca_yes"), value: "yes" },
                { label: t("chat.eca_no"), value: "no" },
                { label: t("chat.eca_ca"), value: "ca_edu" }
            ],
            next: () => "language",
        },
        {
            id: "language",
            text: t("chat.ask_lang"),
            type: "option",
            options: [
                { label: t("chat.lang_clb9"), value: "clb9" },
                { label: t("chat.lang_clb7"), value: "clb7_8" },
                { label: t("chat.lang_clbBelow7"), value: "clb_below7" },
                { label: t("chat.lang_none"), value: "none" }
            ],
            next: () => "work_experience",
        },
        {
            id: "work_experience",
            text: t("chat.ask_work"),
            type: "option",
            options: [
                { label: t("chat.work_none"), value: "none" },
                { label: t("chat.work_less1"), value: "less_than_1" },
                { label: t("chat.work_1_3"), value: "1_3_years" },
                { label: t("chat.work_3plus"), value: "3_plus_years" }
            ],
            next: () => "job_offer",
        },
        {
            id: "job_offer",
            text: t("chat.ask_job"),
            type: "option",
            options: [
                { label: t("chat.eca_yes"), value: "yes" },
                { label: t("chat.eca_no"), value: "no" }
            ],
            next: () => "family",
        },
        {
            id: "family",
            text: t("chat.ask_family"),
            type: "option",
            options: [
                { label: t("chat.eca_yes"), value: "yes" },
                { label: t("chat.eca_no"), value: "no" }
            ],
            next: () => "funds",
        },
        {
            id: "funds",
            text: t("chat.ask_funds"),
            type: "option",
            options: [
                { label: t("chat.eca_yes"), value: "yes" },
                { label: t("chat.eca_no"), value: "no" }
            ],
            next: () => "complex",
        },
        {
            id: "complex",
            text: t("chat.ask_complex"),
            type: "option",
            options: [
                { label: t("chat.eca_yes"), value: "yes" },
                { label: t("chat.eca_no"), value: "no" }
            ],
            next: (value: string) => (value === "yes" ? "end_complex" : "contact_info"),
        },
        {
            id: "contact_info",
            text: t("chat.ask_contact"),
            type: "text",
            next: () => "end_uncertain",
        },
        {
            id: "end_uncertain",
            text: t("chat.end_uncertain"),
            type: "final",
        },
        {
            id: "end_complex",
            text: t("chat.end_complex"),
            type: "final",
        },
        {
            id: "end_browsing",
            text: t("chat.end_browsing"),
            type: "final",
        },
    ];

    useEffect(() => {
        if (messages.length === 0) {
            const startStep = QUESTIONS.find((q) => q.id === "start");
            if (startStep) {
                setMessages([{ role: "bot", text: startStep.text, options: startStep.options }]);
            }
        }
    }, [messages.length, t]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const saveConsultationRequest = async (finalResponses: UserResponses) => {
        try {
            const contactInfo = finalResponses.contact_info || "";
            const isEmail = contactInfo.includes("@");
            const isPhone = /\d{10,}/.test(contactInfo.replace(/[\s-()]/g, ""));

            const { error } = await supabase
                .from("consultation_requests")
                .insert({
                    user_name: finalResponses.name || "Anonymous",
                    user_email: isEmail ? contactInfo : null,
                    user_phone: isPhone ? contactInfo : null,
                    responses: finalResponses,
                    status: "pending",
                });

            if (error) {
                console.error("Error saving consultation request:", error);
                toast({
                    title: t("chat.notice.title"),
                    description: t("chat.notice.description"),
                    variant: "destructive",
                });
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    const handleResponse = (answerLabel: string, answerValue?: string) => {
        const val = answerValue || answerLabel;
        setMessages((prev) => [...prev, { role: "user", text: answerLabel }]);
        const updatedResponses = { ...responses, [currentStepId]: val };
        setResponses(updatedResponses);

        const currentQuestion = QUESTIONS.find((q) => q.id === currentStepId);
        if (!currentQuestion || !currentQuestion.next) return;

        const nextStepId = currentQuestion.next(val);
        const nextQuestion = QUESTIONS.find((q) => q.id === nextStepId);

        if (nextQuestion) {
            if (nextQuestion.type === "final" && (nextStepId === "end_uncertain" || nextStepId === "end_complex")) {
                saveConsultationRequest(updatedResponses);
            }

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
                                <span className="font-semibold">{t("chat.header")}</span>
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
                                                    key={option.value}
                                                    onClick={() => handleResponse(option.label, option.value)}
                                                    className="px-3 py-1.5 bg-white border border-teal/20 text-teal text-xs rounded-full hover:bg-teal hover:text-white transition-colors shadow-sm"
                                                >
                                                    {option.label}
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
                                        placeholder={t("chat.placeholder")}
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
