import React,{useState} from 'react'
import { useAsyncDebounce } from 'react-table'
import { FaArrowLeft,FaArrowRight } from 'react-icons/fa'
const GlobalFillter = ({filter,setFilter,nextPage,perviousPage})=> {
    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce((value)=>{
        setFilter(value || undefined)
    },1000)

    return (
        <>
            <span style={{"font-weight":"bold"}}> Search :  {''} </span>
            <input type="text" value={value || ''} 
            onChange={(e)=>{ setValue(e.target.value); onChange((e.target.value)) }}/>

        </>
    )
}

export default GlobalFillter