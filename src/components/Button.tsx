import { Button } from 'antd';
import React from 'react';

interface CustomButtonProps {
    text: string;
    color: string;
    width: string;
    onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, color, width, onClick }) => {
    return (
        <Button
            type="primary"
            style={{
                backgroundColor: color,
                borderColor: color,
                width: width,
            }}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default CustomButton;
