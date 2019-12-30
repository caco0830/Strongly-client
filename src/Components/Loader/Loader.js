import React from 'react';
import ContentLoader from 'react-content-loader';

class Loader extends React.Component {
    render() {
        return (
            <ContentLoader
                height={160}
                width={400}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                <rect x="70" y="22" rx="4" ry="4" width="20" height="6" />
                <rect x="70" y="35" rx="3" ry="3" width="85" height="6" />
                <rect x="0" y="45" rx="3" ry="3" width="350" height="6" />
                <rect x="0" y="55" rx="3" ry="3" width="380" height="6" />
                <rect x="0" y="65" rx="3" ry="3" width="201" height="6" />
            </ContentLoader>
        );
    }
}

export default Loader;