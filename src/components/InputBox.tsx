interface InputProps {
  placeholder: string;
  ref?: any;
}

const InputBox = ({ placeholder, ref }: InputProps) => {
  return (
    <div>
      <input ref={ref} placeholder={placeholder} type={"text"} 
      className="px-8 py-4 border-1 border-black border-solid m-2 text-black rounded-md cursor-pointer"></input>
    </div>
  )
}

export default InputBox
