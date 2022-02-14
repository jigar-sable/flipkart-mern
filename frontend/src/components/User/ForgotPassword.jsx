import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("email", email);
        dispatch(forgotPassword(formData));
        setEmail("");
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (message) {
            enqueueSnackbar(message, { variant: "success" });
        }
    }, [dispatch, error, message, enqueueSnackbar]);


    return (
        <>
            <MetaData title="Forgot Password" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">

                    <FormSidebar
                        title="Forgot Your Password?"
                        tag="Enter the email address associated with your account."
                    />

                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Forgot Password</h2>

                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">

                            {/* <!-- input container --> */}
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col w-full gap-4">

                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                    {/* <!-- button container --> */}
                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <p className="text-xs text-primary-grey text-left">By continuing, you agree to Flipkart's <a href="https://www.flipkart.com/pages/terms" className="text-primary-blue"> Terms of Use</a> and <a href="https://www.flipkart.com/pages/privacypolicy" className="text-primary-blue"> Privacy Policy.</a></p>
                                        <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow rounded-sm font-medium">Submit</button>
                                    </div>
                                    {/* <!-- button container --> */}

                                </div>
                            </form>
                            {/* <!-- input container --> */}

                            <Link to="/register" className="font-medium text-sm text-primary-blue">New to Flipkart? Create an account</Link>
                        </div>
                        {/* <!-- edit info container --> */}

                    </div>
                    {/* <!-- login column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default ForgotPassword