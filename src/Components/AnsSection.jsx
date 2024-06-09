
import { useCallback, useRef } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

function AnsSection({ previousAnsQ, loading, chatstate, chatHistory }) {

    let reflist = useRef(null)
    let copypass = useCallback(() => {
        let textToCopy = previousAnsQ.map(index => index.newAns)
        reflist.current?.select()
        reflist.current?.setSelectionRange(0, 9999)

        window.navigator.clipboard.writeText(textToCopy)
    }, [previousAnsQ])

    let copypassFront = useCallback(() => {
        let textToCopy = chatHistory.filter(item => item.role === 'model').map((item, index) => item.parts[0].text)
        reflist.current?.select()
        reflist.current?.setSelectionRange(0, 9999)

        window.navigator.clipboard.writeText(textToCopy)
    }, [chatHistory])


    return (
        <section className='flex-1 bg-[#EEEEEE] rounded-br-2xl rounded-tr-2xl px-2 pt-2 max-h-[82%] md:max-h-full  '>
            <p className=' font-bold px-6 text-[18px] hidden md:block'>Result</p>
            <div className=' textscroll  pb-4 overflow-auto m-auto w-[95%] md:h-[94%] h-[98%] border-2 border-black rounded-xl pt-2'>
                {chatstate ? <div className=" relative h-full w-full">
                    {loading ?<div className=" absolute h-full w-full grid place-items-center"> <div className="loader  ml-12"></div></div> :<div>
                        {previousAnsQ.map((index, i) => (
                            <div key={i}>
                                <div className=' flex items-center p-4 gap-3'>
                                    <div className=' '><span>You..</span> {index.question}</div>
                                </div>
                                <div className='text-white mx-3 py-4 px-3 gap-3 bg-[#8a97a1] rounded-lg'>
                                    <div className='flex justify-end mb-4'>

                                        <textarea
                                            ref={reflist}
                                            readOnly
                                            className='textscrol outline-none w-[95%] bg-[#8a97a1]'
                                            rows={index.newAns.split('\n').length || 1}
                                        >
                                            {index.newAns}
                                        </textarea>

                                    </div>
                                    <MdOutlineContentCopy
                                        onClick={copypass}
                                        className='text-[20px] cursor-pointer hover:text-green-200'
                                    />
                                </div>


                            </div>
                        ))}
                    </div>}
                </div> :
                    <div className=" relative h-full w-full">
                    {loading ?<div className=" absolute h-full w-full grid place-items-center"> <div className="loader  ml-12"></div></div> : <div>
                            {chatHistory.filter(item => item.role === 'model').map((item, index) => (
                                <div key={index}>

                                    <div className='text-white mx-3 py-4 px-3 gap-3 bg-[#8a97a1] rounded-lg mb-2'>
                                        <div className=' flex justify-end mb-4 '>
                                            <textarea ref={reflist} readOnly className=" textscrol outline-none w-[95%] bg-[#8a97a1]"
                                                rows={item.parts[0].text.split('\n').length || 1}
                                            >
                                                {item.parts[0].text}</textarea></div>
                                        <MdOutlineContentCopy
                                            onClick={copypassFront}
                                            className=' text-[20px] cursor-pointer hover:text-green-200' />
                                    </div>

                                </div>
                            ))}
                        </div>}
                    </div>
                }




            </div>
        </section>
    )
}

export default AnsSection