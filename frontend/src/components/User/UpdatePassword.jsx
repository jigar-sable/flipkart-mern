import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmitHandler = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("oldPassword", oldPassword);
        formData.set("newPassword", newPassword);
        formData.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Password Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            navigate('/account');

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Password Update | Flipkart" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">

                    <FormSidebar
                        title="Looks like you want to update password!"
                        tag="Enter your current and new password to update"
                    />

                    {/* <!-- signup column --> */}
                    <div className="flex-1 overflow-hidden">

                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Password</h2>
                        {/* <!-- personal info procedure container --> */}
                        <form
                            onSubmit={updatePasswordSubmitHandler}
                            className="p-5 sm:p-14"
                        >
                            <div className="flex flex-col gap-4 items-start">

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">

                                    <TextField
                                        fullWidth
                                        label="Current Password"
                                        type="password"
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Confirm New Password"
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />

                                </div>
                                {/* <!-- input container column --> */}
                                <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Update</button>
                                <Link className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium mb-8" to="/account">Cancel</Link>
                            </div>

                        </form>
                        {/* <!-- personal info procedure container --> */}

                    </div>
                    {/* <!-- signup column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default UpdatePassword