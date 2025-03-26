const About = () => {
  return (
    <div className="container mx-auto text-center py-12 px-6 max-w-4xl">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-800">About Us</h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        Welcome to our website! We are a team of passionate individuals dedicated to delivering high-quality products
        and services that create real value for our customers. Our commitment to excellence drives us to innovate and
        improve continuously.
      </p>
      
      <div className="mt-10">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Our mission is to empower individuals and businesses through innovative solutions that enhance productivity
            and improve everyday experiences. We focus on delivering top-tier products while maintaining a customer-first approach.
          </p>
        </div>
      </div>
      
      <div className="mt-10">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-left text-gray-700 mx-auto max-w-md">
            <li className="mb-2"><span className="font-semibold">Integrity:</span> We uphold the highest ethical standards in all our endeavors.</li>
            <li className="mb-2"><span className="font-semibold">Customer Satisfaction:</span> Our customers are at the heart of everything we do.</li>
            <li className="mb-2"><span className="font-semibold">Innovation:</span> We embrace creativity and technology to drive progress.</li>
            <li className="mb-2"><span className="font-semibold">Teamwork:</span> Collaboration and mutual respect fuel our success.</li>
            <li className="mb-2"><span className="font-semibold">Excellence:</span> We strive for the highest quality in our work and products.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;