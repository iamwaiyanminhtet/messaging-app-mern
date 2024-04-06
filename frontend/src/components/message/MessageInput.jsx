import { BsSend, BsTrash } from "react-icons/bs"
import useSendMessage from "../../hooks/useSendMessage"
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const MessageInput = ({user}) => {

    const { loading, sendMessage } = useSendMessage();
    const [message, setMessage] = useState('');
    const messageRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!message || message === '') {
            toast.warning('Type a message', {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
                draggable: true
            });
            return messageRef.current.focus();
        }

        await sendMessage(message, user._id);
        setMessage('')
    }

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit} >
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    ref={messageRef}
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
				{loading ? <div className="loading loading-spinner"></div> : <BsSend />}
				</button>
            </div>
        </form>
    )
}

export default MessageInput