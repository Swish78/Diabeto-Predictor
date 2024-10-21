import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const Visualize = () => {
    const [plots, setPlots] = useState([]);
    const [backendUrl, setBackendUrl] = useState('http://127.0.0.1:5000');

    useEffect(() => {
        const checkBackendAvailability = async () => {
            const ec2BaseUrl = 'http://ec2-3-110-88-244.ap-south-1.compute.amazonaws.com:5000';
            try {
                // Try fetching from EC2 to check if it's reachable
                const response = await fetch(`${ec2BaseUrl}/visualize`);
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
        const fetchPlotData = async () => {
            try {
                const response = await fetch(`${backendUrl}/visualize`);
                const data = await response.json();
                setPlots(data.plots);
            } catch (error) {
                console.error("Error fetching plot data:", error);
            }
        };

        fetchPlotData();
    }, [backendUrl]);

    const colorPalette = [
        '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
        '#1abc9c', '#d35400', '#34495e', '#7f8c8d', '#c0392b'
    ];

    return (
        <div className="container mx-auto my-10 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 rounded-lg shadow-2xl transition-all duration-500">
            <h3 className="text-4xl font-semibold text-gray-900 dark:text-white text-center mb-8">
                Data Visualization
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {plots.length > 0 ? (
                    plots.map((plotData, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 flex flex-col"
                        >
                            <div style={{ height: '300px' }}> {/* Adjust this value to make plots shorter */}
                                <Plot
                                    data={JSON.parse(plotData).data.map((trace, i) => ({
                                        ...trace,
                                        marker: { ...trace.marker, color: colorPalette[i % colorPalette.length] },
                                        line: { ...trace.line, color: colorPalette[i % colorPalette.length] }
                                    }))}
                                    layout={{
                                        ...JSON.parse(plotData).layout,
                                        paper_bgcolor: 'white',
                                        plot_bgcolor: 'white',
                                        margin: { t: 40, b: 40, l: 40, r: 40 },
                                        font: {
                                            family: 'Arial, sans-serif',
                                            size: 14,
                                            color: '#333',
                                        },
                                        title: {
                                            text: `Visualization ${index + 1}`,
                                            font: { size: 16, color: '#333' },
                                        },
                                        xaxis: {
                                            gridcolor: '#e0e0e0',
                                            zerolinecolor: '#949494',
                                        },
                                        yaxis: {
                                            gridcolor: '#e0e0e0',
                                            zerolinecolor: '#949494',
                                        },
                                        colorway: colorPalette,
                                    }}
                                    config={{ responsive: true }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                            <p className="text-center text-gray-800 dark:text-gray-300 mt-4 font-medium">
                                Visualization {index + 1}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center col-span-full h-64">
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            Loading visualizations...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Visualize;