import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import Loader from '../Layouts/Loader';
import TrackStepper from './TrackStepper';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Order Details | Flipkart" />

            <MinCategory />
            <main className="w-full mt-14 sm:mt-4">
                {loading ? <Loader /> : (
                    <>
                        {order && order.user && order.shippingInfo && (
                            <div className="flex flex-col gap-4 max-w-6xl mx-auto">

                                <div className="flex bg-white shadow rounded-sm min-w-full">
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
                                </div>

                                {order.orderItems && order.orderItems.map((item) => {

                                    const { _id, image, name, price, quantity } = item;

                                    return (
                                        <div className="flex flex-col sm:flex-row min-w-full shadow rounded-sm bg-white px-2 py-5" key={_id}>

                                            <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">
                                                <div className="w-full sm:w-32 h-20">
                                                    <img draggable="false" className="h-full w-full object-contain" src={image} alt={name} />
                                                </div>
                                                <div className="flex flex-col gap-1 overflow-hidden">
                                                    <p className="text-sm">{name.length > 60 ? `${name.substring(0, 60)}...` : name}</p>
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
            </main>
        </>
    );
};

export default OrderDetails;
