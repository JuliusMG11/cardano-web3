import React from 'react';

interface BtnProps {
    text: string;
    onClick: () => void;
    children: React.ReactNode;
}

const Btn = ({ text, onClick, children }: BtnProps) => {
    return (
        <button 
            onClick={onClick} 
            className="bg-[#8C52FF] text-white px-6 py-2 font-bold rounded-full flex items-center gap-2 hover:bg-[#7D49E6] cursor-pointer"
        >
            {text}
            {children}
        </button>
    );
};

export default Btn;