import React from 'react';

interface CardProps {
    title: string;
    value: string;
    originalValue?: string;
    isCopyable?: boolean;
    children: React.ReactNode;
}

const Card = ({ title, value, originalValue, children, isCopyable = false }: CardProps) => {
    const handleCopy = () => {
        if (isCopyable && originalValue) {
            navigator.clipboard.writeText(originalValue); // Kopírovanie pôvodnej hodnoty
        }
    };

    return (
        <div className="bg-card bg-[#1d2022c3] border-3 border-[#8C52FF] rounded-xl p-8 shadow-md shadow-[#8c52ff8b]" >
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h2 className="text-lg font-medium">{title}</h2>
                {children}
            </div>
            <div 
                    className={`text-3xl font-bold ${isCopyable ? 'cursor-pointer' : ''}`} 
                    onClick={handleCopy}
                >
                    {value}
                </div>
      </div>
    );
};

export default Card;