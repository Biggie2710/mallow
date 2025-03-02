import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomButton from '../components/Button';
import { createUserRequest, updateUserRequest } from '../features/user/userSlice';

const UserForm = ({ userToEdit, setFormPageStatus }: any) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (userToEdit) {
            setFirstName(userToEdit.first_name);
            setLastName(userToEdit.last_name);
            setEmail(userToEdit.email);
            setProfileImage(userToEdit.avatar);
            setUserId(userToEdit.id);
        }
    }, [userToEdit]);

    const handleCreate = () => {
        if (!firstName || !lastName || !email || !profileImage) return
        const name = firstName
        const job = lastName
        dispatch(createUserRequest({ name, job }));
        resetForm();
    };

    const handleUpdate = () => {
        if (!firstName || !lastName || !email || !profileImage) return
        const name = firstName
        const job = lastName
        if (userId) {
            dispatch(updateUserRequest({ name, job }));
            resetForm();
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setProfileImage('');
        setUserId(null);
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>{userId ? 'Edit User' : 'Create User'}</h2>
                <CloseOutlined
                    className="close-icon"
                    onClick={() => {
                        setFormPageStatus(false);
                        resetForm();
                    }}
                />
            </div>

            <label htmlFor="firstName">
                <span className="required">*</span> First Name
            </label>
            <input
                id="firstName"
                type="text"
                placeholder="Please enter the first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />

            <label htmlFor="lastName">
                <span className="required">*</span> Last Name
            </label>
            <input
                id="lastName"
                type="text"
                placeholder="Please enter the last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />

            <label htmlFor="email">
                <span className="required">*</span> Email
            </label>
            <input
                id="email"
                type="email"
                placeholder="Please enter the email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor="profileImage">
                <span className="required">*</span> Profile Image Link
            </label>
            <input
                id="profileImage"
                type="text"
                placeholder="Please enter the profile image link"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
            />

            <div className="form-actions">
                <CustomButton
                    color="gray"
                    text="Cancel"
                    width="150px"
                    onClick={() => {
                        setFormPageStatus(false);
                        resetForm();
                    }}
                />
                <CustomButton
                    color="blue"
                    text="Submit"
                    width="150px"
                    onClick={userId ? handleUpdate : handleCreate}
                />
            </div>
        </div>
    );
};

export default UserForm;
