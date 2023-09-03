import React from 'react'
import { Progress } from "antd"

const Analytics = ({alltransaction}) => {

    // CATEGORY
    const categories = ["salary","tip","project","food","movie","bills","medical","fee","tax"]

    // tottal transcations
    const totaltransaction = alltransaction.length
    const totalincomeTransactions = alltransaction.filter(transction=> transction.type=="income")
    const totalexpenseTransactions = alltransaction.filter(transction=> transction.type=="expense")
    const totalIncomePercent = (totalincomeTransactions.length/totaltransaction)*100
    const totalExpensePercent = (totalexpenseTransactions.length/totaltransaction)*100

    // total turnover

    const totalturnover = alltransaction.reduce((acc,transction)=> acc+transction.amount,0)
    const totalIncomeTurnover = alltransaction.filter(transaction => transaction.type=="income").reduce((acc,transaction)=>acc+transaction.amount,0)
    const totalExpenseTurnover = alltransaction.filter(transaction => transaction.type=="expense").reduce((acc,transaction)=>acc+transaction.amount,0)

    const totalIncomeTurnoverPercent = (totalIncomeTurnover/totalturnover)*100
    const totalExpenseTurnoverPercent = (totalExpenseTurnover/totalturnover)*100
  return (
    <>
       <div className='row m-3'>
        <div className="col-md-3">
            <div className="card">
                <div className="card-header">
                    Total Transactions : {totaltransaction}
                </div>
                <div className='card-body'>
                    <h5 className='text-success'> Income : {totalincomeTransactions.length}</h5>
                    <h5 className='text-danger'> Expense : {totalexpenseTransactions.length}</h5>
                    <div>
                        <Progress type="circle" strokeColor={"green"} className='mx-2' percent={totalIncomePercent.toFixed(0)}/>
                        <Progress type="circle" strokeColor={"RED"} className='mx-2' percent={totalExpensePercent.toFixed(0)}/>
                    </div>

                </div>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card">
                <div className="card-header">
                    Total TurnOver : {totalturnover}
                </div>
                <div className='card-body'>
                    <h5 className='text-success'> Income : {totalIncomeTurnover}</h5>
                    <h5 className='text-danger'> Expense : {totalExpenseTurnover}</h5>
                    <div>
                        <Progress type="circle" strokeColor={"green"} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)}/>
                        <Progress type="circle" strokeColor={"RED"} className='mx-2' percent={totalExpenseTurnoverPercent.toFixed(0)}/>
                    </div>

                </div>
            </div>
        </div>

        <div className='col-md-3'>
            <h4>Categorywise Income</h4>
            {
                categories.map((category)=>{
                    const amount = alltransaction.filter((transaction) => transaction.type=="income" && transaction.category==category).reduce((acc,transaction)=> acc+transaction.amount,0)
                    return (
                        amount > 0 && (
                        <div className='card'>
                            <div className='card-body'>
                                <h5>{category}</h5>
                                <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)}/>
                            </div>
                        </div>
                        )
                    )
                        
                    
                })
            }
        </div>
        <div className='col-md-3'>
            <h4>Categorywise Expense</h4>
            {
                categories.map((category)=>{
                    const amount = alltransaction.filter((transaction) => transaction.type=="expense" && transaction.category==category).reduce((acc,transaction)=> acc+transaction.amount,0)
                    return (
                        amount > 0 && (
                        <div className='card'>
                            <div className='card-body'>
                                <h5>{category}</h5>
                                <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)}/>
                            </div>
                        </div>
                        )
                    )
                        
                    
                })
            }
        </div>
       </div>

    </>
  )
}

export default Analytics