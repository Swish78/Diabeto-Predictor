const About = () => {
    return (
        <div className="container mx-auto my-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">About This App</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-center">
                This Diabetes Prediction App allows users to input their personal health information and get a prediction
                on whether they may have diabetes. The app leverages machine learning models to analyze the data and
                provides actionable insights. The visualization tools help users understand the data trends and risk factors.
            </p>
        </div>
    );
};

export default About;
