import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { removeFromWishlist } from '../../actions/wishlistAction';
import { useDispatch } from 'react-redux';

const Product = (props) => {

    const { product, name, price, cuttedPrice, image, ratings, reviews } = props;

    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(removeFromWishlist(product));
    }

    return (
        <div className="flex gap-4 border-b p-4 sm:pb-8 w-full group overflow-hidden">
            <div className="w-1/6 h-28 flex-shrink-0">
                <img draggable="false" className="h-full w-full object-contain" src={image} alt={name} />
            </div>

            {/* <!-- description --> */}
            <div className="flex flex-col gap-5 w-full p-1">
                {/* <!-- product title --> */}
                <div className="flex justify-between items-start sm:pr-5">
                    <Link to={`/product/${product}`} className="flex flex-col gap-0.5">
                        <p className="group-hover:text-primary-blue w-56 sm:w-full truncate">{name.length > 85 ? `${name.substring(0, 85)}...` : name}</p>
                        {/* <!-- rating badge --> */}
                        <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                            <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">{ratings} <StarIcon sx={{ fontSize: "14px" }} /></span>
                            <span>({reviews.toLocaleString()})</span>
                        </span>
                        {/* <!-- rating badge --> */}
                    </Link>
                    <button onClick={deleteHandler} className="text-gray-400 hover:text-red-500"><span><DeleteIcon /></span></button>
                </div>
                {/* <!-- product title --> */}

                {/* <!-- price desc --> */}
                <div className="flex items-center gap-2 text-2xl font-medium">
                    <span>₹{price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through font-normal mt-1">₹{cuttedPrice.toLocaleString()}</span>
                    <span className="text-sm text-primary-green mt-1">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
                </div>
                {/* <!-- price desc --> */}

            </div>
            {/* <!-- description --> */}
        </div>
    );
};

export default Product;
