import React from 'react';

export default function Problems({ props }) {
  const { problemRating, list, setProblemRating, setProblemTag, problemTag } = props;
  
  // Common tags in Codeforces problems
  const tags = [
    "all",
    "implementation",
    "math",
    "greedy",
    "dp",
    "data structures",
    "strings",
    "sortings",
    "binary search",
    "graphs",
    "trees",
    "dfs and similar",
    "combinatorics",
    "geometry",
    "number theory",
    "two pointers",
    "bitmasks",
    "constructive algorithms"
  ];
  
  // Available ratings
  const ratings = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500];
  
  // Function to open problem in Codeforces
  const openProblem = (contestId, index) => {
    window.open(`https://codeforces.com/problemset/problem/${contestId}/${index}`, '_blank');
  };

  return (
    <div className="w-full">
      {/* Rating selector */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800">Difficulty Rating</h3>
        <div className="flex flex-wrap gap-2">
          {ratings.map(rating => (
            <button
              key={rating}
              onClick={() => setProblemRating(rating)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors
                ${problemRating === rating 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {rating}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tag selector */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800">Problem Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setProblemTag(tag)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors
                ${problemTag === tag 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Problem list */}
      <div>
        <h3 className="text-lg font-medium mb-3 text-gray-800">Problems ({Object.keys(list || {}).length})</h3>
        
        {Object.keys(list || {}).length === 0 ? (
          <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-500">No problems found with the selected criteria.</p>
            <p className="text-gray-400 text-sm mt-2">Try changing the rating or tag.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(list || {}).map(key => {
              const problem = list[key];
              return (
                <div 
                  key={key}
                  onClick={() => openProblem(problem.contestId, problem.index)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors
                    ${problem.solved 
                      ? 'bg-gray-100 border-gray-300' 
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800 truncate" title={problem.name}>
                      {problem.contestId}{problem.index}: {problem.name}
                    </h4>
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {problem.rating}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {problem.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                    {problem.tags.length > 3 && (
                      <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                        +{problem.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {problem.solved && (
                    <div className="mt-2 text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Solved
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}