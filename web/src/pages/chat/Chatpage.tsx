import Chat from "./components/Chat";

const Chatpage = () => {
  return (
    <div className='w-full h-full relative'>
        <Chat />
        <div className='w-full absolute bottom-[-200px] z-0 flex flex-row justify-center items-center pointer-events-none'>
          <div className='bg-[#FF86E1] shadow-[500px_500px_500px_rgba(255,134,225,0.5)] w-[414px] h-[414px] rounded-full blur-[250px]' />
          <div className='bg-[#89BCFF] shadow-[300px_300px_300px_rgba(137,188,255,0.5)] w-[280px] h-[280px] rounded-full blur-[150px]' />
        </div>
    </div>
  );
};

export default Chatpage;
