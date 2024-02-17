import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

  // received
  // pending
  // delivered
  

const index = () => {
    return (
        <div className='flex flex-col'>
            Orders

            <div className='flex flex-col justify-center items-center'>
                <div className='w-[80%] '>
                    <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead >Date</TableHead>
                            <TableHead >Time</TableHead>
                            <TableHead >Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>15/02/2024</TableCell>
                            <TableCell>10:00 AM</TableCell>
                            <TableCell>1000</TableCell>
                            <TableCell>
                                <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#DAF9EE] text-[#54BE98] border-solid border-[1px] border-[#54BE98]'>Complete</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>15/02/2024</TableCell>
                            <TableCell>10:00 AM</TableCell>
                            <TableCell className=" font-medium">1000</TableCell>
                            <TableCell >
                                <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF7E6] text-[#FFB624] border-solid border-[1px] border-[#FFB624]'>Pending</div>
                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>15/02/2024</TableCell>
                            <TableCell>10:00 AM</TableCell>
                            <TableCell>1000</TableCell>
                            <TableCell >
                                <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF1F4] text-[#E77690] border-solid border-[1px] border-[#E77690]'>Order received</div>
                            </TableCell>
                            <TableCell>
                                <button></button>
                                <button></button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </div>
            </div>
            
        </div>
    )
}

export default index
