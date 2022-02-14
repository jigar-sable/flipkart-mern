import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const Account = () => {

    const navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector(state => state.user)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate]);

    const getLastName = () => {
        const nameArray = user.name.split(" ");
        return nameArray[nameArray.length - 1];
    }

    return (
        <>
            <MetaData title="My Profile" />

            {loading ? <Loader /> :
                <>
                    <MinCategory />
                    <main className="w-full mt-12 sm:mt-0">

                        {/* <!-- row --> */}
                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                            <Sidebar activeTab={"profile"} />

                            {/* <!-- details column --> */}
                            <div className="flex-1 overflow-hidden shadow bg-white">
                                {/* <!-- edit info container --> */}
                                <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                                    {/* <!-- personal info --> */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">Personal Information <Link to="/account/update" className="text-sm text-primary-blue font-medium ml-8 cursor-pointer">Edit</Link></span>

                                        <div className="flex flex-col sm:flex-row items-center gap-3" id="personalInputs">
                                            <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                                                <label className="text-xs text-gray-500">First Name</label>
                                                <input type="text" value={user.name.split(" ", 1)} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                            </div>
                                            <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                                                <label className="text-xs text-gray-500">Last Name</label>
                                                <input type="text" value={getLastName()} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                            </div>
                                        </div>

                                        {/* <!-- gender --> */}
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-sm">Your Gender</h2>
                                            <div className="flex items-center gap-8" id="radioInput">
                                                <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                                                    <input type="radio" name="gender" checked={user.gender === "male"} id="male" className="h-4 w-4 cursor-not-allowed" disabled />
                                                    <label htmlFor="male" className="cursor-not-allowed">Male</label>
                                                </div>
                                                <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                                                    <input type="radio" name="gender" checked={user.gender === "female"} id="female" className="h-4 w-4 cursor-not-allowed" disabled />
                                                    <label htmlFor="female" className="cursor-not-allowed">Female</label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- gender --> */}

                                    </div>
                                    {/* <!-- personal info --> */}

                                    {/* <!-- email address info --> */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">Email Address
                                            <Link to="/account/update" className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer">Edit</Link>
                                            <Link to="/password/update" className="text-sm text-primary-blue font-medium ml-3 sm:ml-8">Change Password</Link>
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                                                <label className="text-xs text-gray-500">Email Address</label>
                                                <input type="email" value={user.email} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                            </div>
                                        </div>

                                    </div>
                                    {/* <!-- email address info --> */}

                                    {/* <!-- mobile number info --> */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">Mobile Number
                                            <span className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer" id="mobEditBtn">Edit</span>
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                                                <label className="text-xs text-gray-500">Mobile Number</label>
                                                <input type="tel" value="+919876543210" className="text-sm outline-none border-none text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                        </div>

                                    </div>
                                    {/* <!-- mobile number info --> */}

                                    {/* <!-- faqs --> */}
                                    <div className="flex flex-col gap-4 mt-4">
                                        <span className="font-medium text-lg mb-2">FAQS</span>
                                        <h4 className="text-sm font-medium">What happens when I update my email address (or mobile number)?</h4>
                                        <p className="text-sm">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>

                                        <h4 className="text-sm font-medium">When will my Flipkart account be updated with the new email address (or mobile number)?</h4>
                                        <p className="text-sm">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>

                                        <h4 className="text-sm font-medium">What happens to my existing Flipkart account when I update my email address (or mobile number)?</h4>
                                        <p className="text-sm">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>

                                        <h4 className="text-sm font-medium">Does my Seller account get affected when I update my email address?</h4>
                                        <p className="text-sm">Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>

                                    </div>
                                    {/* <!-- faqs --> */}

                                    {/* <!-- deactivate account --> */}
                                    <Link className="text-sm text-primary-blue font-medium" to="/">Deactivate Account</Link>
                                    {/* <!-- deactivate account --> */}
                                </div>
                                {/* <!-- edit info container --> */}

                                <img draggable="false" className="w-full object-contain" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/myProfileFooter_4e9fe2.png" alt="footer" />
                            </div>
                            {/* <!-- details column --> */}
                        </div>
                    </main>
                </>
            }
        </>
    );
};

export default Account;
