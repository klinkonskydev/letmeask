import { ButtonHTMLAttributes } from 'react'
import '../styles/button.scss'

type ButtonSettings = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props }: ButtonSettings){
    return (
        <button className={`button ${isOutlined ? 'outlined' : ''}`} 
         {...props}
        />
    );
}