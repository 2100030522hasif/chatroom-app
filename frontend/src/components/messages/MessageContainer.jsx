import { useEffect } from "react";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import "./styles.css";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);


	return (
		<div className='message-container md:min-w-[0px] flex flex-col'>
			{!selectedConversation ? <NoChatSelected /> : (
        <>
				{/* Header */}
				<div className='bg-gray-900 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='text-[#e2e4e8] font-bold'>{selectedConversation.fullName}</span>
				</div>

				<Messages />
				<MessageInput />
			</>
      )}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex flex-col items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome {authUser.fullName}!</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};