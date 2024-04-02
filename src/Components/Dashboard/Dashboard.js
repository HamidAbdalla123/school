import axios from 'axios';
import React,{useState,useEffect,useRef} from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
// import FormHeaderTemplate from "../Forms/FormHeaderTemplate";
import { Chart} from "react-chartjs-2";
import { Line,Bar,getElementAtEvent,Doughnut } from "react-chartjs-2";
import {Chart as Chartjs,LineElement,PointElement,CategoryScale,LinearScale,Tooltip,Legend,BarElement} from "chart.js"

import KpiCard from './KpiCard/KpiCard';
// import ChartRender from './ChartRender/ChartRender';
Chartjs.register(LineElement,PointElement,CategoryScale,LinearScale,Tooltip,Legend,BarElement)

const Dashboard = ()=> {
    const myRef = useRef()
    let data = {
        labels:['MON','TUE','WED'],
        datasets:[ {
        label:'Week Days',
        data:[10,20,30],
        bg:'red',
        borderColor:'red',
        }]
    }

    let dataBar = {
        labels:['MON','TUE','WED','FAR','WEN'],
        datasets:[ {
        label:'Week Days',
        data:[10,20,30,-10,24],
        bg:'black',
        bg:'bule',
        }]
    }

    const clickChart = (e)=>{
        console.log(e)
    }

    return (
        <div style={{"margin-bottom":"8%"}}>
            <div class="vh-100  bg-muted">
                <div class="row m-3">
                    <div class="col-lg-7">
                        <div class="row">
                            <div class="col m-0 p-0">
                                <div class="shadow-sm border m-2 p-4 bg-white">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <h1 class="text-primary fw-bold">School Dashboard</h1>
                                        <div>
                                            <select class="form-select">
                                                <option value="0"   defaultValue="state.period == '0'"  > Select Period </option>
                                                <option value="7"   defaultValue="state.period == '7'"  > Last 7 Days   </option>
                                                <option value="30"  defaultValue="state.period == '30'" > Last 30 Days  </option>
                                                <option value="365" defaultValue="state.period == '365'"> Last 365 Days </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row d-flex">
                            <div className='col-6'>
                                <KpiCard  name="Quotations" value="10" percentage="-3" />
                            </div>
                            <div className='col-6'>
                                <KpiCard  name="Quotations" value="10" percentage="0.3" />
                            </div>
                            <div className='col-6'>
                                <KpiCard  name="Quotations" value="10" percentage="12" />
                            </div>
                            <div className='col-6'>
                                <KpiCard  name="Quotations" value="10" percentage=".88" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6 m-0 p-0">
                                <div class="shadow-sm border m-2 p-4 bg-white">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <h3 class="text-primary fw-bold">Top Products</h3>
                                        <div class="px-3 py-1 bg-primary cursor-pointer">
                                        <span class="fa fa-arrow-right text-white" />
                                        </div>
                                    </div>
                                    <Line data={data} ref={myRef} onClick={(e)=>clickChart(e)}/> 
                                </div>
                            </div>

                            <div class="col-lg-6 m-0 p-0">
                                <div class="shadow-sm border m-2 p-4 bg-white">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <h3 class="text-primary fw-bold">Top Sales People</h3>
                                        <div class="px-3 py-1 bg-primary cursor-pointer">
                                        <span class="fa fa-arrow-right text-white" />
                                        </div>
                                    </div>
                                    <Bar data={dataBar} ref={myRef} onClick={(e)=>clickChart(e)}/> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-5">
                        <div class="row">
                            <div class="col m-0 p-0">
                                <div class="shadow-sm border m-2 p-4 bg-white">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <h3 class="text-primary fw-bold">Monthly Sales</h3>
                                        <div class="px-3 py-1 bg-primary cursor-pointer">
                                        <span class="fa fa-arrow-right text-white" />
                                        </div>
                                    </div>
                                    <Line data={data} ref={myRef} onClick={(e)=>clickChart(e)}/> 
                                </div>
                            </div>
                        <div>

                        <div class="row">
                            <div class="col m-0 p-0">
                                <div class="shadow-sm border m-2 p-4 bg-white">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <h3 class="text-primary fw-bold">Partner Orders</h3>
                                        <div class="px-3 py-1 bg-primary cursor-pointer">
                                        <span class="fa fa-arrow-right text-white" />
                                        </div>
                                    </div>
                                    <Bar data={dataBar} ref={myRef} onClick={(e)=>clickChart(e)}/> 
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Dashboard