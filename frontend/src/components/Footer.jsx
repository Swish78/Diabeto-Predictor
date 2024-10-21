import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [footerText, setFooterText] = useState('');
    const [backendUrl, setBackendUrl] = useState('http://127.0.0.1:5000');

    useEffect(() => {
        const checkBackendAvailability = async () => {
            const ec2BaseUrl = 'http://ec2-3-110-88-244.ap-south-1.compute.amazonaws.com:5000';
            try {
                // Try fetching the footer from the EC2 backend
                const response = await fetch(`${ec2BaseUrl}/footer`);
                if (response.ok) {
                    setBackendUrl(ec2BaseUrl);
                }
            } catch (error) {
                console.log("EC2 backend is not reachable, using localhost.");
            }
        };

        checkBackendAvailability();
    }, []);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const response = await fetch(`${backendUrl}/footer`);
                const data = await response.json();
                setFooterText(data.footer);
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };

        fetchFooter();
    }, [backendUrl]);

    return (
        <footer className="bg-gray-800 text-white p-4 mt-8 w-full fixed bottom-0 left-0">
            <div className="container mx-auto text-center">
                <p>{footerText}</p>
            </div>
        </footer>
    );
};

export default Footer;
