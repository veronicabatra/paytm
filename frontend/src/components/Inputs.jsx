export default function Inputs({label,placeholder}){
    return(
        <>
        <div className='text-lg font-bold text-left'>{label}</div>
        <input placeholder={placeholder} className='w-full p-2 border border-gray-300 rounded-md'/>
    </>
    )
}