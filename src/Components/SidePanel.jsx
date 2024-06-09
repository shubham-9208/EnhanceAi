
function SidePanel({setChatHistory, generateresponse, question, setquestion, setPreviousAnsQ, chatstate, sendMessageJS, chatTurn }) {
    
    const reset=()=>{
        setPreviousAnsQ([])
        setChatHistory([])
    }

    return (
        <aside className=' relative md:w-[260px] w-full px-2 md:pb-2 pb-0 md:flex-col md:h-auto h-[160px] '>
            <div className=" flex md:flex-col justify-around mb-1">
                <div 
                    onClick={reset}
                    className='px-3 py-3 rounded-lg hover:bg-[#F3F3F7] font-semibold cursor-pointer hover:ease-in hover:duration-75 duration-75 md:text-[16px] text-[18px]  '>
                    + New Chat
                </div>
                <div
                    onClick={chatTurn}
                    className='pl-6 px-3 py-3  rounded-lg hover:bg-[#F3F3F7] font-semibold cursor-pointer hover:ease-in hover:duration-75 duration-75 md:text-[16px] text-[20px] '>
                    {chatstate ? "Frontend " : "OverAll"}
                </div>
            </div>


            <form onSubmit={chatstate ? generateresponse : sendMessageJS}>
                <div className='md:flex-col flex  items-center justify-center  absolute bottom-1 md:w-[93%] w-[100%] rounded-lg gap-3 '>
                    <textarea
                        required
                        name='name'
                        value={question}
                        onChange={(e) => setquestion(e.target.value)}
                        className='rounded-lg  w-full border-2 p-2 border-black md:h-full h-[100px]' placeholder={`enter prompt ${chatstate ? "OverAll " : " Frontend "} ....`} rows='7' >
                    </textarea>


                    <button
                        className=' mr-4 md:mr-0 md:w-[240px] w-[100px] border-2 border-black rounded-lg md:p-2 p-1 md:h-auto h-[100px] font-semibold  hover:bg-[#F3F3F7]  '>
                        Submit
                    </button>

                </div>


            </form>
        </aside>

    )
}

export default SidePanel