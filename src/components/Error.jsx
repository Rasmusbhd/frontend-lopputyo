import React from 'react';

const Error = () => {
    return (
        <div className="error-page">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <a href="/" className='go-home-button'>Go back to Home</a>
        </div>
    );
};

export default Error;