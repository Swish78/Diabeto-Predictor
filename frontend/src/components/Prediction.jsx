import React, { useState, useEffect } from 'react';

const Prediction = () => {
    const [inputData, setInputData] = useState({
        Age: 0,
        Gender: 'Female',
        'Blood Pressure': 'Normal',
        BMI: 0,
        FBS: 0,
        HbA1c: 0,
        'Family History of Diabetes': 'No',
        Smoking: 'No',
        Diet: 'Healthy',
        Exercise: 'Regular'
    });
    const [predictionResult, setPredictionResult] = useState('');
    const [note, setNote] = useState('');
    const [backendUrl, setBackendUrl] = useState('http://127.0.0.1:5000');

    useEffect(() => {
        const checkBackendAvailability = async () => {
            const ec2BaseUrl = 'http://ec2-3-110-88-244.ap-south-1.compute.amazonaws.com:5000';
            try {
                // Try fetching from EC2 to check if it's reachable
                const response = await fetch(`${ec2BaseUrl}/predict`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                });
                if (response.ok) {
                    setBackendUrl(ec2BaseUrl);
                }
            } catch (error) {
                console.log("EC2 backend is not reachable, using localhost.");
            }
        };

        checkBackendAvailability();
    }, [inputData]);

    const handleInputChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${backendUrl}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputData)
        });
        const result = await response.json();
        setPredictionResult(result.prediction);
        setNote(result.note);
    };

    return (
        <div className="container mx-auto my-10 p-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-xl transition-all duration-500">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
                Diabetes Prediction
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Age */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Age</label>
                        <input
                            name="Age"
                            type="number"
                            placeholder="Enter your age"
                            value={inputData.Age}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                        <select
                            name="Gender"
                            value={inputData.Gender}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </div>

                    {/* Blood Pressure */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Blood Pressure</label>
                        <select
                            name="Blood Pressure"
                            value={inputData['Blood Pressure']}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    {/* BMI */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">BMI</label>
                        <input
                            name="BMI"
                            type="number"
                            placeholder="Enter your BMI"
                            value={inputData.BMI}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* FBS */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Fasting Blood Sugar (FBS)</label>
                        <input
                            name="FBS"
                            type="number"
                            placeholder="Enter FBS level"
                            value={inputData.FBS}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* HbA1c */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">HbA1c</label>
                        <input
                            name="HbA1c"
                            type="number"
                            placeholder="Enter HbA1c level"
                            value={inputData.HbA1c}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    {/* Family History */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Family History of Diabetes</label>
                        <select
                            name="Family History of Diabetes"
                            value={inputData['Family History of Diabetes']}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    {/* Smoking */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Smoking</label>
                        <select
                            name="Smoking"
                            value={inputData.Smoking}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    {/* Diet */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Diet</label>
                        <select
                            name="Diet"
                            value={inputData.Diet}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        >
                            <option value="Poor">Poor</option>
                            <option value="Healthy">Healthy</option>
                        </select>
                    </div>

                    {/* Exercise */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Exercise</label>
                        <select
                            name="Exercise"
                            value={inputData.Exercise}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        >
                            <option value="Regular">Regular</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 mt-6 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                    Predict
                </button>
            </form>

            {predictionResult && (
                <div className="mt-8 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Prediction: {predictionResult}</h3>
                    <p className={`mt-4 ${predictionResult === 'Yes' ? 'text-red-500' : 'text-green-500'} dark:text-gray-300`}>
                        {note}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Prediction;
