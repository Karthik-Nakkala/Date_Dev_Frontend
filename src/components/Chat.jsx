import { ArrowLeft, MoreVertical, Phone, Video, Info, Search, Paperclip, Smile, Send, Code } from 'lucide-react';
import {makeSocketConnection} from '../utils/socket';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const {targetedUserId}=useParams();
  const loginUserId=useSelector((store)=>store.user?._id);
  const [sendingMessage,setSendingMessage]=useState('');
  const [partner,setPartner] = useState({
    name: '',
    avatar: '',
    status: 'Online',
    role: 'Full Stack Developer @ DevCrew',
    about: '',
    skills: [],
    mutualConnections: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=128',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=128',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=128',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128'
    ],
    mutualCount: 12,
    group: {
      name: 'DevConnect Group',
      members: 28
    }
  });

  const [mockMessages,setMockMessages] = useState([]);

    const handlePreviousChats=async ()=>{
    try{
      const previousChats=await axios.get(BASE_URL+'/getchats',{

        params:{participants:[loginUserId,targetedUserId]},
        withCredentials:true
      });

      const structuredPreviousChats = [];
      const {name,avatar,skills,about,role}=previousChats.data.targetedUser;
      setPartner((prevPartner)=>({
        ...prevPartner,
        name:name,
        avatar: avatar,
        skills: skills,
        about: about,
        role: role,
      }));
      previousChats.data.chats.messages.forEach(msg => {
        if(msg.senderId._id.toString()===loginUserId.toString()){
          structuredPreviousChats.push({
                id: msg._id,
                type: 'outgoing',
                text: msg.text,
                time: msg.createdAt,
          })
        }else{
          structuredPreviousChats.push({
                id: msg._id,
                type: 'incoming',
                text: msg.text,
                time: msg.createdAt,
          })
        }
      });
      console.log("structuredPreviousChats=>",structuredPreviousChats);
      setMockMessages(structuredPreviousChats);
    }catch(err)
    {console.log(err)}
  }

const socket=useRef(null);


  useEffect(()=>{

    if(!loginUserId || !targetedUserId){
        return;
    }

      handlePreviousChats()

    socket.current=makeSocketConnection();
    socket.current.emit('joinChat',{loginUserId,targetedUserId});

    socket.current.on("messageReceived",({text,senderId})=>{
        if (senderId===loginUserId) return;
            setMockMessages((prevMessages) => [
  ...prevMessages,
  {
    id: Date.now(),
    type: 'incoming',
    text: text,
    time: new Date().toLocaleTimeString()
  }
]);
    console.log("Incomming message=>",text);
    });

    return ()=>{
        socket.current.disconnect();
    }

  },[loginUserId,targetedUserId]);

  const handleSendMessage=()=>{
    
    if (!sendingMessage.trim()) return;

    socket.current.emit('sendMessage',{loginUserId,targetedUserId,text:sendingMessage});
    setMockMessages((prevMessages) => [
  ...prevMessages,
  {
    id: Date.now(),
    type: 'outgoing',
    text: sendingMessage,
    time: new Date().toLocaleTimeString()
  }
]);
    setSendingMessage("");
  }


  return (
    <div className="flex h-screen bg-[#03060E] text-slate-300 overflow-hidden font-display select-none p-2 sm:p-4">
      <div className="flex w-full max-w-7xl mx-auto bg-[#050814]/90 border border-[#141A30] rounded-3xl overflow-hidden relative backdrop-blur-xl">
        
        {/* BACKGROUND GLOWS - dimmed further for darker theme */}
        <div className="absolute top-[-10%] left-[10%] w-[300px] h-[300px] rounded-full bg-purple-600/[0.02] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] rounded-full bg-pink-600/[0.02] blur-[140px] pointer-events-none" />

        {/* LEFT COLUMN: Profile Info Pane (Hidden on Mobile/Tablet < lg) */}
        <div className="hidden lg:flex flex-col w-[360px] border-r border-[#141A30] bg-[#040712]/95 shrink-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Header Action Row */}
          <div className="flex items-center justify-between p-4 pb-2">
            <button className="p-2 hover:bg-slate-800/25 active:scale-95 rounded-full text-slate-400 hover:text-white transition-all cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-800/25 active:scale-95 rounded-full text-slate-400 hover:text-white transition-all cursor-pointer">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Overview */}
          <div className="flex flex-col items-center px-6 py-4 text-center">
            {/* Circular Avatar with Glowing Border */}
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-24 h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:scale-105 transition-transform duration-300">
                <img
                  src={partner.avatar}
                  alt={partner.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute bottom-1 right-2 w-4 h-4 bg-emerald-500 border-2 border-[#040712] rounded-full" />
            </div>

            {/* Name and Star Icon */}
            <h2 className="text-xl font-extrabold text-white flex items-center justify-center gap-1.5 mb-1 tracking-tight hover:text-purple-400 transition-colors cursor-pointer">
              {partner.name}
              <span className="w-5 h-5 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                <span className="text-[10px] text-pink-400">★</span>
              </span>
            </h2>
            <p className="text-xs text-slate-400 mb-3 font-medium">{partner.role}</p>

            {/* Status Indicator */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/20 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {partner.status}
            </span>
          </div>

          {/* Call & Video Buttons */}
          <div className="grid grid-cols-3 gap-2 px-6 py-4 border-t border-b border-[#141A30]">
            <button className="flex flex-col items-center gap-1.5 p-2 hover:bg-slate-800/20 active:scale-95 rounded-xl transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[#070B18] border border-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-950/20 group-hover:text-purple-300 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-200 transition-colors">Call</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 p-2 hover:bg-slate-800/20 active:scale-95 rounded-xl transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[#070B18] border border-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-950/20 group-hover:text-purple-300 transition-colors">
                <Video className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-200 transition-colors">Video</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 p-2 hover:bg-slate-800/20 active:scale-95 rounded-xl transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[#070B18] border border-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-950/20 group-hover:text-purple-300 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-200 transition-colors">More</span>
            </button>
          </div>

          {/* Details Sections */}
          <div className="p-6 space-y-5">
            {/* About */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About</h4>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">{partner.about}</p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {partner.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-purple-500/20 text-purple-300 bg-purple-950/5 hover:bg-purple-950/25 transition-all cursor-pointer duration-200 hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Mutual Connections */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Mutual Connections</h4>
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2.5">
                  {partner.mutualConnections.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="Mutual connection"
                      className="w-7 h-7 rounded-full object-cover border-2 border-[#040712] shrink-0 hover:scale-110 hover:z-10 transition-transform duration-200"
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-purple-400 bg-purple-950/20 border border-purple-500/20 w-7 h-7 rounded-full flex items-center justify-center ml-2.5 cursor-pointer hover:bg-purple-950/40 transition-colors">
                  +{partner.mutualCount}
                </span>
              </div>
            </div>

            {/* Shared Groups */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Shared Groups</h4>
              <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#141A30] bg-[#040712]/30 hover:border-purple-500/20 transition-all duration-200 cursor-pointer group">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 025.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">{partner.group.name}</div>
                  <div className="text-[10px] text-slate-400">{partner.group.members} Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Chat Pane */}
        <div className="flex flex-col flex-grow bg-[#040712]/10 overflow-hidden relative">
          
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#141A30] bg-[#040712]/95 backdrop-blur-xl relative z-10">
            <div className="flex items-center gap-3">
              {/* Profile image (Shows back arrow on mobile instead of layout) */}
              <button className="lg:hidden p-1.5 hover:bg-slate-800/40 rounded-full text-slate-400 hover:text-white transition-colors mr-1 cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="relative shrink-0 cursor-pointer group">
                <img
                  src={partner.avatar}
                  alt={partner.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#141A30] group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border border-[#040712] rounded-full" />
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-white text-sm sm:text-base leading-none hover:text-purple-400 transition-colors cursor-pointer">{partner.name}</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-400">Online</span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 leading-normal mt-0.5 font-medium">{partner.role}</p>
              </div>
            </div>

            {/* Header Right Action Icons */}
            <div className="items-center gap-1 hidden sm:flex text-slate-400">
              <button className="p-2 hover:bg-slate-800/30 hover:text-white rounded-lg transition-all active:scale-95 cursor-pointer">
                <Search className="w-4.5 h-4.5" />
              </button>
              <button className="p-2 hover:bg-slate-800/30 hover:text-white rounded-lg transition-all active:scale-95 cursor-pointer">
                <Phone className="w-4.5 h-4.5" />
              </button>
              <button className="p-2 hover:bg-slate-800/30 hover:text-white rounded-lg transition-all active:scale-95 cursor-pointer">
                <Video className="w-4.5 h-4.5" />
              </button>
              <button className="p-2 hover:bg-slate-800/30 hover:text-white rounded-lg transition-all active:scale-95 cursor-pointer">
                <Info className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Conversation Area (Scrollable message bubbles list with SCROLLBAR REMOVED) */}
          <div className="flex-grow overflow-y-auto px-4 py-5 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            {/* Date Separator */}
            <div className="flex items-center justify-center my-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full border-t border-[#141A30]/50" />
              </div>
              <span className="relative z-10 px-3 rounded-full bg-[#040712] border border-[#141A30] text-[10px] sm:text-xs font-semibold text-slate-400">
                Today
              </span>
            </div>

            {/* Render Mock Messages */}
            {mockMessages.map((msg) => {
              const isIncoming = msg.type === 'incoming';
              return (
                <div key={msg.id} className="space-y-4">
                    <div className={`flex ${isIncoming?'justify-start':'justify-end'}`}>
                        {msg.text}
                    </div>
                </div>
              );
            })}

          </div>

          {/* Bottom Message Input Bar */}
          <div className="p-4 border-t border-[#141A30] bg-[#040712]/90 backdrop-blur-xl">
            <div className="flex items-center gap-2 border border-[#141A30] rounded-2xl px-3 py-2 bg-[#02040A] relative hover:border-purple-500/20 transition-all duration-300">
              
              {/* Attachment Icon */}
              <button className="p-2 hover:bg-slate-800/35 hover:text-white rounded-xl text-slate-400 transition-all active:scale-95 cursor-pointer shrink-0">
                <Paperclip className="w-[18px] h-[18px]" />
              </button>

              {/* Input text */}
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-transparent border-none text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-0 text-xs sm:text-[13px] px-1 font-normal" 
                value={sendingMessage}
                onChange={(e)=>setSendingMessage(e.target.value)}

              />

              {/* Right Input Bar Buttons */}
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <button className="p-1.5 sm:p-2 hover:bg-slate-800/35 hover:text-white rounded-xl text-slate-400 transition-all active:scale-95 cursor-pointer">
                  <Smile className="w-[18px] h-[18px]" />
                </button>
                <button className="hidden sm:inline-flex px-1.5 py-0.5 hover:bg-slate-850 hover:text-white rounded border border-[#141A30] text-[10px] font-extrabold text-slate-400 transition-colors uppercase tracking-wider cursor-pointer">
                  GIF
                </button>
                <button className="p-1.5 sm:p-2 hover:bg-slate-800/35 hover:text-white rounded-xl text-slate-400 transition-all active:scale-95 cursor-pointer">
                  <Code className="w-[18px] h-[18px]" />
                </button>
                
                {/* Send Button */}
                <button className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 hover:shadow-purple-500/20 hover:shadow-lg active:scale-95 text-white rounded-xl transition-all shadow-md cursor-pointer ml-1" onClick={handleSendMessage}>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Chat;