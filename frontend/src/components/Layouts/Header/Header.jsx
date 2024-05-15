import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector(state => state.cart);

  return (

    <header className="bg-primary-blue fixed top-0 py-2.5 w-full z-10">

      {/* <!-- navbar container --> */}
      <div className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative">

        {/* <!-- logo & search container --> */}
        <div className="flex items-center flex-1">
          <Link className="h-7 mr-1 sm:mr-4" to="/">
            <img draggable="false" className="h-full w-full object-contain" src={logo} alt="Flipkart Logo" />
          </Link>

          <Searchbar />
        </div>
        {/* <!-- logo & search container --> */}

        {/* <!-- right navs --> */}
        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">
          {isAuthenticated === false ?
            <Link to="/login" className="px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer">Login</Link>
            :
            <div className="dropdown userDropDown flex items-center text-white font-medium gap-1 cursor-pointer">
              <span>{user.name && user.name.split(" ", 1)}</span>
              <ExpandMoreIcon sx={{ fontSize: "16px" }} />
              <div className="dropdown-content">
                <PrimaryDropDownMenu user={user} />
              </div>
            </div>
          }

          <div className="dropdown moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer px-4 px-2">
            <span className="px-4 py-3.5">More</span> {/* 여기서 패딩을 추가했습니다. */}
            <ExpandMoreIcon sx={{ fontSize: "16px" }} />
            <div className="dropdown-content">
              <SecondaryDropDownMenu />
            </div>
          </div>

          <Link to="/cart" className="flex items-center text-white font-medium gap-2 relative ">
            <span><ShoppingCartIcon /></span>
            {cartItems.length > 0 &&
              <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                {cartItems.length}
              </div>
            }
            Cart
          </Link>
        </div>
        {/* <!-- right navs --> */}

      </div>
      {/* <!-- navbar container --> */}
    </header>
  )
};

export default Header;
