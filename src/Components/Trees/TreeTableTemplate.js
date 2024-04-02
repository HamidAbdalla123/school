import React,{useEffect,useMemo,useState} from 'react'
import { useTable, useSortBy,useGlobalFilter,usePagination, useRowSelect,useGroupBy } from 'react-table';
import {FaTrash,FaCheck } from 'react-icons/fa';
import {ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import "./table.css"
import { FaArrowUp,FaArrowDown,FaArrowLeft,FaArrowRight } from 'react-icons/fa';
import GlobalFillter from './GlobalFillter';
import CheckBox from './CheckBox';


const TreeTableTemplate = (props)=> {
    console.log("props => ",props)
    const [rowId,setRowId] = useState(false)
    const [renderChecked ,setChecked] = useState(false)
    const [deleteAllRecords ,setDeleteAllRecords] = useState(false)
    const [selectedAll ,setselectedAll] = useState(false)

    const columns = props.Columns
    const data = props.data
    const tableInstance = useTable({ columns,data },useGlobalFilter,useSortBy,usePagination,
        useRowSelect,(hooks)=> {
        hooks.visibleColumns.push((columns)=>{
            return [
                {
                    id:'selection',
                    Header:({getToggleAllRowsSelectedProps})=>(
                        <CheckBox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell:({ row })=>( 
                        <CheckBox {...row.getToggleRowSelectedProps()}/>
                    ),
                },
                ...columns,
            ]
        })})

    const { 
        getTableProps,getTableBodyProps,
        headerGroups, footerGroups,
        page,nextPage,previousPage, canNextPage, canPreviousPage, setPageSize,
        gotoPage,pageCount,
        prepareRow,selectedFlatRows,state,setGlobalFilter } = tableInstance;
    
    const {globalFilter,pageSize} = state

    useEffect(()=>{
        props.getData()
        console.log("selectedFlatRows => ",JSON.stringify({
                selectedFlatRows: selectedFlatRows.map((row)=> row.original),
                
            }))
    },[]) 
    
    return (
        <>  
            <div className=''>
                <h3 style={{"marginLeft":"50%"}} className='table-header'>{props.title}</h3>
                <button style={{"marginLeft":'10%',"width":'10%',"height":'40px',"fontWeight":"bold"}} 
                    className='mb-2 btn btn-primary'
                    onClick={()=>props.openForm(`/${props.name}-form`)}>New</button>
                
                                    <button  data-bs-toggle="modal" data-bs-target="#student-confirm"
                                      style={{"marginLeft":'1.5%',"width":'8%','border':'.5px solid','background':'#db2828'}}
                                      className='mb-2 btn my-custom-cls-btn-danger'
                                    //   onClick={()=>props.deleteAll()}
                                    onClick={(e)=> { e.stopPropagation(); setDeleteAllRecords(true)}}

                                    >Delete 
                                    
                                    </button>
                                    
                                    
                                       
                    
                <span className="" style={{"float":"right","margin-right":"0%"}}>
                    <GlobalFillter filter={globalFilter} setFilter={setGlobalFilter} />

                    <span style={{"margin-left":"2%"}}>
                        <button className='table-page-button' onClick={()=> previousPage() } disabled={!canPreviousPage}>
                            <FaArrowLeft className='table-page-button-icon'/> 
                        </button>

                        <input type="number" name="pageSize" defaultValue={10} min={1} onChange={(e)=> setPageSize((e.target.value <= 0  || !e.target.value) ? 10 : e.target.value)} placeholder='P.ON' style={{"width":"11%","text-align":"center"}}/>  
                        
                        <button onClick={()=> nextPage() } className='table-page-button' disabled={!canNextPage}> 
                            <FaArrowRight className='table-page-button-icon'/> 
                        </button>
                    </span>
                </span>
            </div>
            <table {...getTableProps()} className="overflow-auto">
                <thead>
                    
                    {headerGroups.map((headerGroup) =>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {/* <th> <input type={'checkbox'} onChange={()=>setChecked(!renderChecked)} checked={renderChecked} onClick={(e)=>{ e.stopPropagation(); setDeleteAllRecords(false)} } /> </th> */}
                            {headerGroup.headers.map((column) =>(
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span style={{"margin-left":"3%"}}>
                                        {
                                            column.isSorted ? (column.isSortedDesc ? <FaArrowUp /> : <FaArrowDown />)
                                            : ''
                                        }
                                    </span>
                                </th>
                            ))}
                            <th>Delete</th>
                        </tr>
                    ))}
                </thead>

                <tbody  {...getTableBodyProps()} >
                    {
                        page.map((row,index)=> {
                            prepareRow(row)
                            return (
                                <tr onClick={()=>props.editForm((`/edit-${props.name}/`+row.original.id))} {...row.getRowProps() } >
                                    {/* <td> <input  type={'checkbox'} onChange={()=>setChecked(!renderChecked)} checked={renderChecked} onClick={(e)=>{e.stopPropagation()} } style={{"width":"100%",'height':"100%"}} /> </td> */}
                                    {   
                                        row.cells.map((cell)=> {
                                            return( 
                                                <td {...cell.getCellProps() } >
                                                    
                                                    { cell.render('Cell') }
                                                </td>
                                            )
                                        })
                                        
                                    }
                                    <td>
                                        <button onClick={(e)=> { e.stopPropagation(); setRowId(row.original.id)}} className="cutsom-btn" data-bs-toggle="modal" data-bs-target="#student-confirm">
                                            <FaTrash className='text-danger fa-custom' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
            <code>
                { 
                    // JSON.stringify({
                    //     selectedFlatRows: selectedFlatRows.map((row)=> row.original),
                    //     },
                    //     null,
                    //     2
                    // )
                    // console.log("selectedFlatRows => ",JSON.stringify({
                    //     selectedFlatRows: selectedFlatRows.map((row)=> row.original),
                        
                    // }))
                    // setselectedAll(JSON.stringify({selectedFlatRows: selectedFlatRows.map((row)=> row.original)}))
                }
            </code> 

            <ToastContainer />
    
          
            <div className="modal fade" id="student-confirm" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header mt-3">
                            <h5 className="modal-title" id="modal-title">
                                {
                                    deleteAllRecords ? 'Complate Delete All Record' :'Complate Delete'
                                }
                            </h5>
                            <button type="button" onClick={e=> setDeleteAllRecords(false)} className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div className="mb-4">
                                <div>
                                    
                                    {
                                        deleteAllRecords ? 'Are You Sure Want To Delete All Record ?' :
                                        'Are You Sure Want To Delete This Record ?'
                                    }
                                </div>
                            </div>
                        </div>
                        
                        {
                            deleteAllRecords ? 
                            <div className="modal-footer me-3">
                                <button onClick={()=> { props.deleteAll(); setDeleteAllRecords(false) } }  
                                className="btn btn-outline-primary" id="modal-submit"  data-bs-dismiss="modal" >Delete All</button>
                                <button type="button" onClick={(e)=> setDeleteAllRecords(false)} className="btn btn-outline-danger" data-bs-dismiss="modal" id="modal-cancel" >Cancel</button>
                            </div> :
                            <div className="modal-footer me-3">
                                <button onClick={()=> { props.delete(rowId); setDeleteAllRecords(false) } }  
                                className="btn btn-outline-primary" id="modal-submit"  data-bs-dismiss="modal" >Okay</button>
                                <button type="button" onClick={(e)=> setDeleteAllRecords(false)} className="btn btn-outline-danger" data-bs-dismiss="modal" id="modal-cancel" >Cancel</button>
                            </div> 

                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default TreeTableTemplate