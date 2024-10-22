import React from 'react';
import { useSelector } from 'react-redux';
import './ErrorNotification.css'; // Optional CSS for styling

const ErrorNotification = () => {
    const { message, isError } = useSelector((state) => state.error);

    if (!isError) return null;

    return (
        <div className="error-notification">
            {message}
        </div>
    );
};

export default ErrorNotification;
