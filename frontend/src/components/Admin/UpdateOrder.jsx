import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import { formatDate } from '../../utils/functions';
import TrackStepper from '../Order/TrackStepper';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MetaData from '../Layouts/MetaData';

const UpdateOrder = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const [status, setStatus] = useState("");

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { isUpdated, error: updateError } = useSelector((state) => state.order);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Order Updates Successfully", { variant: "success" });
            dispatch({ type: UPDATE_ORDER_RESET });
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, isUpdated, updateError, enqueueSnackbar]);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("status", status);
        dispatch(updateOrder(params.id, formData));
    }

    return (
        <>
            <MetaData title="Admin: Update Order | Flipkart" />

            {loading ? <Loading /> : (
                <>
                    {order && order.user && order.shippingInfo && (
                        <div className="flex flex-col gap-4">
                            <Link to="/admin/orders" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

                            <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg min-w-full">
                                <div className="sm:w-1/2 border-r">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        <h3 className="font-medium text-lg">Delivery Address</h3>
                                        <h4 className="font-medium">{order.user.name}</h4>
                                        <p className="text-sm">{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`}</p>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Email</p>
                                            <p>{order.user.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Phone Number</p>
                                            <p>{order.shippingInfo.phoneNo}</p>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={updateOrderSubmitHandler} className="flex flex-col gap-3 p-8">
                                    <h3 className="font-medium text-lg">Update Status</h3>
                                    <div className="flex gap-2">
                                        <p className="text-sm font-medium">Current Status:</p>
                                        <p className="text-sm">
                                            {order.orderStatus === "Shipped" && (`Shipped on ${formatDate(order.shippedAt)}`)}
                                            {order.orderStatus === "Processing" && (`Ordered on ${formatDate(order.createdAt)}`)}
                                            {order.orderStatus === "Delivered" && (`Delivered on ${formatDate(order.deliveredAt)}`)}
                                        </p>
                                    </div>
                                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                                        <InputLabel id="order-status-select-label">Status</InputLabel>
                                        <Select
                                            labelId="order-status-select-label"
                                            id="order-status-select"
                                            value={status}
                                            label="Status"
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            {order.orderStatus === "Shipped" && (<MenuItem value={"Delivered"}>Delivered</MenuItem>)}
                                            {order.orderStatus === "Processing" && (<MenuItem value={"Shipped"}>Shipped</MenuItem>)}
                                            {order.orderStatus === "Delivered" && (<MenuItem value={"Delivered"}>Delivered</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <button type="submit" className="bg-primary-orange p-2.5 text-white font-medium rounded shadow hover:shadow-lg">
                                        Update
                                    </button>
                                </form>
                            </div>

                            {order.orderItems && order.orderItems.map((item) => {

                                const { _id, image, name, price, quantity } = item;

                                return (
                                    <div className="flex flex-col sm:flex-row min-w-full shadow-lg rounded-lg bg-white px-2 py-5" key={_id}>

                                        <div className="flex flex-col sm:flex-row sm:w-1/2 gap-1">
                                            <div className="w-full sm:w-32 h-24">
                                                <img draggable="false" className="h-full w-full object-contain" src={image} alt={name} />
                                            </div>
                                            <div className="flex flex-col gap-1 overflow-hidden">
                                                <p className="text-sm">{name.length > 45 ? `${name.substring(0, 45)}...` : name}</p>
                                                <p className="text-xs text-gray-600 mt-2">Quantity: {quantity}</p>
                                                <p className="text-xs text-gray-600">Price: ₹{price.toLocaleString()}</p>
                                                <span className="font-medium">Total: ₹{(quantity * price).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-full sm:w-1/2">
                                            <h3 className="font-medium sm:text-center">Order Status</h3>
                                            <TrackStepper
                                                orderOn={order.createdAt}
                                                shippedAt={order.shippedAt}
                                                deliveredAt={order.deliveredAt}
                                                activeStep={
                                                    order.orderStatus === "Delivered" ? 2 : order.orderStatus === "Shipped" ? 1 : 0
                                                }
                                            />
                                        </div>

                                    </div>
                                )
                            })
                            }
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UpdateOrder;
