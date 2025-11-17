import { useState, useRef, useEffect } from 'react';
import { BotIcon, X, Send, Bot, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// FAQ Database with keywords and answers
const FAQ_DATABASE: Record<string, string> = {
    'hello': 'Hello! 👋 Welcome to Dubai Excursions. How can I help you today?',
    'hi': 'Hi there! 👋 I can help you with information about our Dubai tours and excursions.',
    'price': '💰 **Tour Pricing**\n\n• Burj Khalifa: from **AED 150**\n• Desert Safari: from **AED 280**\n• Marina Cruise: from **AED 250**\n• Abu Dhabi Tour: from **AED 350**\n\n[View All Tours](/excursions)',
    'cost': '💰 Our excursions range from **AED 150 to AED 900** depending on the tour.\n\n[View All Tours](/excursions)',
    'booking': '📱 **Easy Booking Process**\n\n1️⃣ Browse our excursions\n2️⃣ Select your tour\n3️⃣ Choose date & guests\n4️⃣ Add to cart & checkout\n\n✅ Secure payment\n✅ Instant confirmation\n\n[Start Booking](/excursions)',
    'book': '📝 You can book directly on our website!\n\n[Browse Excursions](/excursions)\n\nOr contact us on WhatsApp for assistance! 💬',
    'burj khalifa': '🏢 **Burj Khalifa At The Top**\n\n✨ World\'s tallest building!\n\n**Includes:**\n• Skip-the-line access\n• Floors 124 & 125\n• Panoramic views\n• Audio guide\n\n💵 From **AED 150** per person\n\n[Book Now](/excursions)',
    'burj': '🏢 **Burj Khalifa** - Skip-the-line access to floors 124 & 125 with stunning Dubai views.\n\n💵 From **AED 150**\n\n[View Details](/excursions)',
    'desert safari': '🏜️ **Desert Safari Adventure**\n\n🌟 Most popular tour!\n\n**Includes:**\n• Thrilling dune bashing\n• Camel riding 🐪\n• Sandboarding\n• BBQ dinner under stars\n• Live entertainment\n• Henna painting\n\n💵 From **AED 280** per person\n\n[Book Now](/excursions)',
    'desert': '🏜️ **Desert Safari** - Our most popular tour!\n\nIncludes dune bashing, camel riding, BBQ dinner & entertainment.\n\n💵 From **AED 280**\n\n[View Details](/excursions)',
    'safari': '🏜️ Desert Safari includes dune bashing, camel rides, BBQ dinner & traditional shows.\n\n💵 From **AED 280**!\n\n[Book Now](/excursions)',
    'marina': '🚢 **Dubai Marina Cruise**\n\n⛵ Luxury dinner experience!\n\n**Includes:**\n• 2-hour cruise\n• International buffet\n• Live entertainment\n• Stunning views\n• Hotel pickup\n\n💵 From **AED 250** per person\n\n[Book Now](/excursions)',
    'cruise': '⛵ **Dubai Marina Cruise** - 2-hour luxury experience with buffet dinner & entertainment.\n\n💵 From **AED 250**\n\n[View Details](/excursions)',
    'abu dhabi': '🕌 **Abu Dhabi City Tour**\n\n🎯 Full day experience!\n\n**Highlights:**\n• Sheikh Zayed Grand Mosque\n• Emirates Palace\n• Heritage Village\n• Corniche\n• Professional guide\n• Lunch included\n\n💵 From **AED 350** per person\n\n[Book Now](/excursions)',
    'pickup': '🚗 **Free Hotel Pickup**\n\n✅ Yes! We provide complimentary hotel pickup & drop-off for most tours within Dubai.\n\n⏰ Exact pickup time confirmed after booking.',
    'transport': '🚗 We provide **free hotel pickup & drop-off** in Dubai for most tours.\n\n✅ Professional drivers\n✅ Comfortable AC vehicles',
    'cancel': '📋 **Cancellation Policy**\n\n✅ Free cancellation up to **24 hours** before tour\n✅ Full refund if cancelled 24+ hours\n✅ 50% refund if cancelled 12-24 hours\n❌ No refund if cancelled less than 12 hours\n\nContact us for special circumstances!',
    'refund': '💵 We offer **full refunds** for cancellations made 24+ hours before your tour.\n\nSee our cancellation policy for details.',
    'contact': '📞 **Contact Us**\n\n• **WhatsApp:** +971 50 123 4567\n• **Email:** info@excursionsdubai.ae\n• **Phone:** +971 54561 3397\n\n🕐 Available **24/7** to assist you!\n\n[Contact us Now](/contact)',
    'whatsapp': '💬 Chat with us on **WhatsApp** at **+971 50 123 4567** for instant assistance!\n\nClick the green WhatsApp button below! 👇',
    'email': '📧 Email us at **info@excursionsdubai.ae**\n\nWe\'ll respond within 24 hours!',
    'phone': '📞 Call us at **+971 54561 3397** for immediate assistance!',
    'group': '👥 **Group Discounts**\n\n💰 Special rates for groups!\n\n• 10+ people: **10% off**\n• 20+ people: **15% off**\n• 50+ people: **20% off**\n\nContact us via WhatsApp for custom packages! 💬',
    'discount': '🎉 We offer **group discounts** and special promotions!\n\nContact us via WhatsApp for the best deals! 💬',
    'duration': '⏰ **Tour Durations**\n\n• Burj Khalifa: **1-2 hours**\n• Desert Safari: **6 hours**\n• Marina Cruise: **2 hours**\n• Abu Dhabi Tour: **8-9 hours**\n• Dubai City Tour: **4-5 hours**',
    'time': '⏰ Tour times vary by excursion. Most tours include flexible pickup times.\n\nCheck individual tour pages for specific timings!',
    'what included': '📦 **What\'s Included**\n\nGenerally includes:\n\n✅ Hotel pickup/dropoff\n✅ Professional guide\n✅ Entry tickets\n✅ Meals (where applicable)\n✅ Activities as listed\n\n[Browse Excursions](/excursions)',
    'children': '👶 **Children Policy**\n\n✅ Most tours welcome children\n💵 Discounted rates (2-12 years)\n🆓 Free for infants (under 2)\n⚠️ Some tours have age restrictions\n\nCheck specific tour requirements!',
    'kids': '👶 We welcome families! Most tours offer **discounted rates** for children aged 2-12.\n\n🆓 Infants under 2 are usually free!',
    'payment': '💳 **Payment Methods**\n\n✅ Credit/Debit Cards\n✅ Visa & Mastercard\n✅ Online Banking\n✅ Digital Wallets\n✅ Secure checkout\n\n🔒 All payments are **100% secure**!',
    'hours': '🕐 We\'re available to help you **24/7**!\n\nBrowse our excursions anytime or contact us via WhatsApp for instant assistance! 💬',
    'weather': '☀️ **Dubai Weather**\n\n🌡️ Best time: **Oct-April** (cooler)\n🔥 Summer (May-Sep): Very hot\n✅ Tours run year-round\n❄️ Indoor activities available\n\nDesert safaris are best in cooler months!',
    'best time': '📅 Best time to visit Dubai is **October to April** when weather is pleasant.\n\nHowever, our tours operate year-round with AC vehicles! ❄️',
    'thank': 'You\'re welcome! 😊\n\nIs there anything else I can help you with?\n\n[Browse Excursions](/excursions)',
    'thanks': 'Happy to help! 🌟\n\nEnjoy planning your Dubai adventure! 🎉',
};

// Parse message content with markdown-like formatting
function parseMessage(content: string) {
    const parts: Array<{ type: 'text' | 'bold' | 'link'; content: string; href?: string }> = [];
    let currentText = '';
    let i = 0;

    while (i < content.length) {
        // Check for bold **text**
        if (content[i] === '*' && content[i + 1] === '*') {
            if (currentText) {
                parts.push({ type: 'text', content: currentText });
                currentText = '';
            }
            i += 2;
            let boldText = '';
            while (i < content.length && !(content[i] === '*' && content[i + 1] === '*')) {
                boldText += content[i];
                i++;
            }
            parts.push({ type: 'bold', content: boldText });
            i += 2;
        }
        // Check for links [text](url)
        else if (content[i] === '[') {
            if (currentText) {
                parts.push({ type: 'text', content: currentText });
                currentText = '';
            }
            i++;
            let linkText = '';
            while (i < content.length && content[i] !== ']') {
                linkText += content[i];
                i++;
            }
            i++; // skip ]
            if (content[i] === '(') {
                i++; // skip (
                let href = '';
                while (i < content.length && content[i] !== ')') {
                    href += content[i];
                    i++;
                }
                parts.push({ type: 'link', content: linkText, href });
                i++; // skip )
            }
        } else {
            currentText += content[i];
            i++;
        }
    }

    if (currentText) {
        parts.push({ type: 'text', content: currentText });
    }

    return parts;
}

// Message component with styled rendering
function MessageContent({ content }: { content: string }) {
    const parts = parseMessage(content);

    return (
        <div className="space-y-1">
            {parts.map((part, index) => {
                if (part.type === 'bold') {
                    return (
                        <strong key={index} className="font-bold text-blue-700">
                            {part.content}
                        </strong>
                    );
                }
                if (part.type === 'link') {
                    return (
                        <Link
                            key={index}
                            to={part.href || '/'}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-2"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            {part.content} →
                        </Link>
                    );
                }
                return <span key={index}>{part.content}</span>;
            })}
        </div>
    );
}

function findAnswer(question: string): string {
    const lowerQuestion = question.toLowerCase().trim();

    // Priority keywords - check these first
    const priorityMatches: Array<[string[], string]> = [
        [['hello', 'hi', 'hey', 'hola'], 'hello'],
        [['price', 'cost', 'how much', 'rate', 'fee', 'charge'], 'price'],
        [['book', 'booking', 'reserve', 'reservation'], 'booking'],
        [['burj khalifa', 'burj'], 'burj khalifa'],
        [['desert safari', 'desert', 'safari', 'dune'], 'desert safari'],
        [['marina', 'cruise', 'boat', 'yacht'], 'marina'],
        [['abu dhabi', 'abudhabi', 'mosque'], 'abu dhabi'],
        [['pickup', 'pick up', 'transport', 'hotel pickup'], 'pickup'],
        [['cancel', 'cancellation', 'refund'], 'cancel'],
        [['contact', 'phone', 'call', 'reach'], 'contact'],
        [['whatsapp', 'chat', 'message'], 'whatsapp'],
        [['email', 'mail'], 'email'],
        [['group', 'discount', 'offer', 'deal'], 'group'],
        [['duration', 'how long', 'time', 'hours'], 'duration'],
        [['include', 'included', 'what\'s included'], 'what included'],
        [['children', 'kids', 'child', 'family'], 'children'],
        [['payment', 'pay', 'card', 'visa'], 'payment'],
        [['weather', 'temperature', 'hot', 'climate'], 'weather'],
        [['best time', 'when to visit', 'season'], 'best time'],
        [['thank', 'thanks', 'appreciate'], 'thank'],
        [['tour', 'excursion', 'trip', 'show'], 'price'], // Default to show tours
    ];

    // Check priority matches
    for (const [keywords, faqKey] of priorityMatches) {
        for (const keyword of keywords) {
            if (lowerQuestion.includes(keyword)) {
                console.log('Matched keyword:', keyword, '-> FAQ key:', faqKey);
                if (FAQ_DATABASE[faqKey]) {
                    return FAQ_DATABASE[faqKey];
                }
            }
        }
    }

    // Fallback: Check direct FAQ_DATABASE keys
    for (const [keyword, answer] of Object.entries(FAQ_DATABASE)) {
        if (lowerQuestion.includes(keyword)) {
            console.log('Direct match:', keyword);
            return answer;
        }
    }

    // Default response
    return `I'm not sure about that specific question. 🤔

Here's what I can help you with:

**💰 Pricing** - Tour costs & packages
**🎫 Booking** - How to reserve
**🏜️ Tours** - All excursions
**🚗 Pickup** - Transportation
**📞 Contact** - Get in touch

Try asking about any of these, or contact us via WhatsApp! 💬`;
}

export function SimpleChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hello! 👋 Welcome to **Dubai Excursions**.\n\n**I can help you with:**\n• Tour information\n• Pricing\n• Booking process\n• Pickup details\n• Contact information\n\nWhat would you like to know?',
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate typing delay for more natural feel
        setTimeout(() => {
            const answer = findAnswer(input);
            const assistantMessage: Message = {
                role: 'assistant',
                content: answer,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 800);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleQuickReply = (question: string) => {
        setInput(question);
        setTimeout(() => {
            handleSend();
        }, 100);
    };

    const quickReplies = [
        'Show me tours',
        'What are the prices?',
        'How do I book?',
        'Contact details',
    ];

    return (
        <>
            {/* Chat Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group"
                    aria-label="Open chat"
                >
                    <BotIcon className="w-7 h-7" />
                    <span className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping"></span>

                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                        Ask me anything!
                        <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900"></div>
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold flex items-center gap-2">
                                    Dubai Excursions Bot
                                    <Sparkles className="w-4 h-4" />
                                </h3>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <p className="text-xs text-white/90">Always available</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-2 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/30 to-purple-50/30">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                        : 'bg-white text-gray-800 shadow-md border border-gray-100'
                                        }`}
                                >
                                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                        {message.role === 'user' ? (
                                            message.content
                                        ) : (
                                            <MessageContent content={message.content} />
                                        )}
                                    </div>
                                    <p
                                        className={`text-xs mt-1.5 ${message.role === 'user' ? 'text-white/70' : 'text-gray-400'
                                            }`}
                                    >
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white rounded-2xl px-5 py-3 shadow-md border border-gray-100">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Replies */}
                        {messages.length === 1 && !isTyping && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {quickReplies.map((reply, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickReply(reply)}
                                        className="text-xs bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white text-blue-600 border border-blue-200 hover:border-transparent px-3 py-1.5 rounded-full transition-all duration-300"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none text-sm"
                                disabled={isTyping}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-md"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 text-center mt-2">
                            Powered by Dubai Excursions
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}