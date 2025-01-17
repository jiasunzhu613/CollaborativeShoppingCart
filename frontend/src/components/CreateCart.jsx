import {useState} from "react"

function CreateCart() {
    const [expand, setExpand] = useState(false) // need const for react hooks
    function handleExpand(setExpand) {
        setExpand(true)
    }
    return (
        <div className="flex items-center justify-center" onBlur={() => setExpand(false)}>
            {/* add onclick for this? */}
            <div className="w-1/2 bg-purple-200 rounded-md">
                <div onClick={() => setExpand(true)} className="bg-purple-200 rounded-md flex justify-between"> 
                    {/* set this to grow */}
                    <input name="cart_name" placeholder={"Make New Shopping Cart..."} 
                    className="rounded-md flex-grow px-4 py-2 outline-none bg-purple-200"/> 
                    {/* <a className="rounded-full bg-blue-200 p-6 m-2"></a>
                    <a className="rounded-full bg-blue-200 p-6 m-2"></a> */}
                </div>

                {expand ? 
                <div className="flex ">
                    <input name="cart_name" placeholder={"Cart Description.."} 
                    className="rounded-md flex-grow px-4 py-2 outline-none bg-purple-200"/> 

                </div> : <></>}
            </div>
        </div>
    )
}

export default CreateCart;