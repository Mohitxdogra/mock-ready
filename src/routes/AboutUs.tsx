const About = () => {
  return (
    <div className="w-full min-h-screen bg-[#0d1b2a] text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-extrabold mb-10 text-center">About Us</h1>
      
      <p className="text-lg text-gray-300 leading-relaxed text-center max-w-4xl">
        Welcome to Mock Ready! We are a team of passionate individuals dedicated to delivering high-quality products
        and services that create real value for our customers. Our commitment to excellence drives us to innovate and
        improve continuously.
      </p>
      
      <div className="grid md:grid-cols-2 gap-10 mt-12 max-w-6xl w-full px-4">
        <div className="bg-[#142a3f] p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to empower individuals and businesses through innovative solutions that enhance productivity
            and improve everyday experiences. We focus on delivering top-tier products while maintaining a customer-first approach.
          </p>
        </div>
        
        <div className="bg-[#142a3f] p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-300 text-lg">
            <li className="mb-2"><span className="font-semibold text-white">Integrity:</span> We uphold the highest ethical standards.</li>
            <li className="mb-2"><span className="font-semibold text-white">Customer Satisfaction:</span> Our customers are our priority.</li>
            <li className="mb-2"><span className="font-semibold text-white">Innovation:</span> We embrace creativity and technology.</li>
            <li className="mb-2"><span className="font-semibold text-white">Teamwork:</span> Collaboration fuels our success.</li>
            <li className="mb-2"><span className="font-semibold text-white">Excellence:</span> We strive for top quality in our work.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;