import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
//   import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"




// received
// pending
// delivered


const index = () => {
    const [orders, setOrders] = useState([])

    const fetch_orders = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:5000/orders", requestOptions)
            .then(response => response.json())
            .then(result => {
                setOrders(result.data)
            })
            .catch(error => console.log('error', error));
    }

    const accept_order = (order_id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "order_id": order_id,
            "status": "pending"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/updateOrderStatus", requestOptions)
            .then(response => response.json())
            .then(result => {
                setOrders(result.orders)
            })
            .catch(error => console.log('error', error));
    }

    const mark_as_delivered = (order_id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "order_id": order_id,
            "status": "completed"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/updateOrderStatus", requestOptions)
            .then(response => response.json())
            .then(result => {
                setOrders(result.data)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        fetch_orders()
    }, [])


    return (
        <div className='flex flex-col'>

            <div className='flex flex-col justify-center items-center'>


                <Tabs defaultValue="All orders" className='w-[100%] flex flex-col justify-center items-center mt-[30px]'>
                    <div className='flex flex-row items-center justify-center'>
                        <TabsList className=" center">
                            <TabsTrigger value="All orders">All orders</TabsTrigger>
                            <TabsTrigger value="received">Received</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="All orders">

                        <div className='w-[100%] mt-[30px]'>
                            <Table>
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
                                    {orders
                                        .sort((a, b) => {
                                            // Extract numeric parts of order_id
                                            const numA = parseInt(a.order_id.match(/\d+/)[0]);
                                            const numB = parseInt(b.order_id.match(/\d+/)[0]);

                                            // Compare numeric parts
                                            if (numA < numB) {
                                                return 1; // If numA should appear after numB, return 1
                                            } else if (numA > numB) {
                                                return -1; // If numA should appear before numB, return -1
                                            } else {
                                                // If numeric parts are equal, compare the entire string
                                                if (a.order_id < b.order_id) {
                                                    return -1;
                                                } else if (a.order_id > b.order_id) {
                                                    return 1;
                                                } else {
                                                    return 0;
                                                }
                                            }
                                        }).map((order, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{order.order_id}</TableCell>
                                                    <TableCell>{order.customer_name}</TableCell>
                                                    <TableCell>{order.order_name}</TableCell>
                                                    <TableCell>{order.date}</TableCell>
                                                    <TableCell>{order.time}</TableCell>
                                                    <TableCell>{order.amount}</TableCell>
                                                    <TableCell>
                                                        {order.status == "completed" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#DAF9EE] text-[#54BE98] border-solid border-[1px] border-[#54BE98]'>Complete</div>}
                                                        {order.status == "pending" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF7E6] text-[#FFB624] border-solid border-[1px] border-[#FFB624]'>Pending</div>}
                                                        {order.status == "received" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF1F4] text-[#E77690] border-solid border-[1px] border-[#E77690]'>Order received</div>}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.status == "received" &&
                                                            <div className="flex flex-row gap-x-[20px] cursor-pointer">
                                                                <AlertDialog>
                                                                    <AlertDialogTrigger>
                                                                        <img className='w-[18px]' src="/assets/images/check-mark.png" alt="eye" />
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                This will mark the order as accepted.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                            <AlertDialogAction>
                                                                                <button onClick={() => accept_order(order.order_id)}>accept</button>
                                                                            </AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>

                                                                <img className='w-[18px]' src="/assets/images/cross.png" alt="eye" />

                                                            </div>
                                                        }
                                                        {order.status == "pending" &&
                                                            <AlertDialog>
                                                                <AlertDialogTrigger>Mark as completed?</AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This will mark the order as completed.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction>
                                                                            <button onClick={() => mark_as_delivered(order.order_id)}>delivered</button>
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                        )}
                                </TableBody>
                            </Table>
                        </div>

                    </TabsContent>
                    <TabsContent value="received">

                        <div className='w-[100%] mt-[30px]'>
                            <Table>
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
                                    {/* filter the orders so that only the orders with status == order received are there and then map them */}
                                    {orders?.filter(order => order.status == "received").map((order, index) => {

                                        return (
                                            <TableRow>
                                                <TableCell>{order.order_id}</TableCell>
                                                <TableCell>{order.customer_name}</TableCell>
                                                <TableCell>{order.order_name}</TableCell>
                                                <TableCell>{order.date}</TableCell>
                                                <TableCell>{order.time}</TableCell>
                                                <TableCell>{order.amount}</TableCell>
                                                <TableCell>
                                                    {order.status == "completed" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#DAF9EE] text-[#54BE98] border-solid border-[1px] border-[#54BE98]'>Complete</div>}
                                                    {order.status == "pending" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF7E6] text-[#FFB624] border-solid border-[1px] border-[#FFB624]'>Pending</div>}
                                                    {order.status == "received" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF1F4] text-[#E77690] border-solid border-[1px] border-[#E77690]'>Order received</div>}
                                                </TableCell>
                                                <TableCell>
                                                    {order.status == "received" &&
                                                        <div className="flex flex-row gap-x-[20px] cursor-pointer">
                                                            <AlertDialog>
                                                                <AlertDialogTrigger>
                                                                    <img className='w-[18px]' src="/assets/images/check-mark.png" alt="eye" />
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This will mark the order as accepted.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction>
                                                                            <button onClick={() => accept_order(order.order_id)}>accept</button>
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>


                                                        </div>
                                                    }
                                                    {order.status == "pending" &&
                                                        <AlertDialog>
                                                            <AlertDialogTrigger>Mark as completed?</AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will mark the order as completed.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction>
                                                                        <button onClick={() => mark_as_delivered(order.order_id)}>delivered</button>
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                    </TabsContent>
                    <TabsContent value="pending">

                        <div className='w-[100%] mt-[30px]'>
                            <Table>
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
                                    {/* filter the orders so that only the orders with status == order received are there and then map them */}
                                    {orders?.filter(order => order.status == "pending").map((order, index) => {

                                        return (
                                            <TableRow>
                                                <TableCell>{order.order_id}</TableCell>
                                                <TableCell>{order.customer_name}</TableCell>
                                                <TableCell>{order.order_name}</TableCell>
                                                <TableCell>{order.date}</TableCell>
                                                <TableCell>{order.time}</TableCell>
                                                <TableCell>{order.amount}</TableCell>
                                                <TableCell>
                                                    {order.status == "completed" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#DAF9EE] text-[#54BE98] border-solid border-[1px] border-[#54BE98]'>Complete</div>}
                                                    {order.status == "pending" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF7E6] text-[#FFB624] border-solid border-[1px] border-[#FFB624]'>Pending</div>}
                                                    {order.status == "received" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF1F4] text-[#E77690] border-solid border-[1px] border-[#E77690]'>Order received</div>}
                                                </TableCell>
                                                <TableCell>
                                                    {order.status == "received" &&
                                                        <div className="flex flex-row gap-x-[20px] cursor-pointer">
                                                            <AlertDialog>
                                                                <AlertDialogTrigger>
                                                                    <img className='w-[18px]' src="/assets/images/check-mark.png" alt="eye" />
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This will mark the order as accepted.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction>
                                                                            <button onClick={() => accept_order(order.order_id)}>accept</button>
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>


                                                        </div>
                                                    }
                                                    {order.status == "pending" &&
                                                        <AlertDialog>
                                                            <AlertDialogTrigger>Mark as completed?</AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will mark the order as completed.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction>
                                                                        <button onClick={() => mark_as_delivered(order.order_id)}>delivered</button>
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                    </TabsContent>
                    <TabsContent value="completed">

                        <div className='w-[100%] mt-[30px]'>
                            <Table>
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
                                    {/* filter the orders so that only the orders with status == order received are there and then map them */}
                                    {orders?.filter(order => order.status == "completed").map((order, index) => {

                                        return (
                                            <TableRow>
                                                <TableCell>{order.order_id}</TableCell>
                                                <TableCell>{order.customer_name}</TableCell>
                                                <TableCell>{order.order_name}</TableCell>
                                                <TableCell>{order.date}</TableCell>
                                                <TableCell>{order.time}</TableCell>
                                                <TableCell>{order.amount}</TableCell>
                                                <TableCell>
                                                    {order.status == "completed" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#DAF9EE] text-[#54BE98] border-solid border-[1px] border-[#54BE98]'>Complete</div>}
                                                    {order.status == "pending" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF7E6] text-[#FFB624] border-solid border-[1px] border-[#FFB624]'>Pending</div>}
                                                    {order.status == "received" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF1F4] text-[#E77690] border-solid border-[1px] border-[#E77690]'>Order received</div>}
                                                </TableCell>
                                                <TableCell>
                                                    {order.status == "received" &&
                                                        <div className="flex flex-row gap-x-[20px] cursor-pointer">
                                                            <AlertDialog>
                                                                <AlertDialogTrigger>
                                                                    <img className='w-[18px]' src="/assets/images/check-mark.png" alt="eye" />
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This will mark the order as accepted.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction>
                                                                            <button onClick={() => accept_order(order.order_id)}>accept</button>
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>


                                                        </div>
                                                    }
                                                    {order.status == "pending" &&
                                                        <AlertDialog>
                                                            <AlertDialogTrigger>Mark as completed?</AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will mark the order as completed.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction>
                                                                        <button onClick={() => mark_as_delivered(order.order_id)}>delivered</button>
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                    </TabsContent>
                </Tabs>



                {/* <Table>
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
                        {orders.map((order, index) => {
                            return (
                                <TableRow>
                                    <TableCell>{order.order_id}</TableCell>
                                    <TableCell>{order.customer_name}</TableCell>
                                    <TableCell>{order.order_name}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.time}</TableCell>
                                    <TableCell>{order.amount}</TableCell>
                                    <TableCell>
                                        {order.status == "completed" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#DAF9EE] text-[#54BE98] border-solid border-[1px] border-[#54BE98]'>Complete</div>}
                                        {order.status == "pending" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF7E6] text-[#FFB624] border-solid border-[1px] border-[#FFB624]'>Pending</div>}
                                        {order.status == "received" && <div className='flex justify-center items-center py-[2px] rounded-sm bg-[#FFF1F4] text-[#E77690] border-solid border-[1px] border-[#E77690]'>Order received</div>}
                                    </TableCell>
                                    <TableCell>
                                    {order.status == "received" && 
                                            <div className="flex flex-row gap-x-[20px] cursor-pointer">
                                                <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <img className='w-[18px]' src="/assets/images/check-mark.png" alt="eye" />
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will mark the order as accepted.
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        <button onClick={() => accept_order(order.order_id)}>accept</button>
                                                    </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                                </AlertDialog>


                                            </div>
                                    }
                                    {order.status == "pending" &&
                                        <AlertDialog>
                                        <AlertDialogTrigger>Mark as completed?</AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will mark the order as completed.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction>
                                                <button onClick={() => mark_as_delivered(order.order_id)}>delivered</button>
                                            </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                        </AlertDialog>
                                    }
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                    </Table> */}




            </div>

        </div>
    )
}

export default index
