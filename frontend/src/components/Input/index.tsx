import React from 'react';
import { InputContainer, InputField, InputWrapper } from './style';

interface InputProps {
    icon?: React.ElementType;
    placeholder?: string;
    type?: string;
    [key: string]: any;
}

const Input: React.FC<InputProps> = ({
    placeholder = 'Digite algo...',
    type = 'text',
    ...props

}) => {
    return (

        <InputWrapper>

            <InputContainer>

                <InputField
                    type={type}
                    placeholder={placeholder}
                    {...props}
                />

            </InputContainer>

        </InputWrapper>
    );

};

export default Input;