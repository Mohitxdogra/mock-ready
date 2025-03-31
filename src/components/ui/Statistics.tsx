import { Counter } from '../motion/counter';

export const Statistics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-500 mb-2">
          <Counter value={1000} />+
        </div>
        <div className="text-gray-300">Users</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-500 mb-2">
          <Counter value={5000} />+
        </div>
        <div className="text-gray-300">Practice Sessions</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-500 mb-2">
          <Counter value={95} />%
        </div>
        <div className="text-gray-300">Success Rate</div>
      </div>
    </div>
  );
};
