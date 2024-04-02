import React from 'react'
import { FaArrowDown,FaArrowUp } from 'react-icons/fa'
const KpiCard = (props)=> {
    console.log("props => ",Number(props.percentage))

    return (
        <div>
            <div class="col-lg-3 m-0 p-0 cursor-pointer d-inline" style={{"cursor":"pointer"}} onClick={()=>console.log("KpiCard")}>
                <div class="shadow-sm border m-1 p-2 bg-white text-center">
                    <div class="h1 fw-bold text-dark" style={{"font-size":"48px"}}> {props.value} </div>
                    <div class="h3 text-muted"> {props.name} </div>
                    <div class="h3 mt-5">
                        <span>
                            <span className={Number(props.percentage) > 0 ? 'text-muted':'text-danger'} >
                            <sapn>
                                {
                                    Number(props.percentage) > 0 ?
                                        <FaArrowUp style={{"width":"5%","color":"rgb(133 141 133)"}}/> :
                                        <FaArrowDown style={{"width":"5%","color":"#e71e0f"}}/>
                                }
                            </sapn>
                            <span className='m-1'/>%{props.percentage} 
                            <span> Since Last Period</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KpiCard