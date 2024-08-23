import { ReactNode } from "react"
import "./index.css"

export interface ModalProps {
    children: ReactNode,
    title: string,
    opened: boolean,
    closeModal: () => void
}

const Modal = ({ children, opened, closeModal, title }: ModalProps) => {
    if (!opened) {
        return <></>
    }
    return (
        <>
            <div className="modalBg" >
            <div className="modalWindow">
                <div className="modalPWrapper">
                    <h2>{title}</h2>
                    <button className="modalCloseButton" onClick={closeModal}>X</button>
                </div>
                {children}
            </div> </div>
        </>
    )
}
export default Modal