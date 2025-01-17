// Important!
// This file returns static data in a crude attempt to mock an external API for the purpose of the test
// It can be IGNORED for the purposes of the assessment

const candidateMap = [
  {
    id: 1,
    name: 'Baldrick'
  },
  {
    id: 2,
    name: 'Lord Buckethead'
  },
  {
    id:3,
    name: 'Count Binface'
  }
];

const defaultData = {
  metadata: {
    isComplete: false
  },
  results: [
    {
      'party': 'Adder Party',
      'candidateId': 1,
      'votes': '1056'
    },
    {
      'party': 'Independent',
      'candidateId': 2,
      'votes': '6900'
    },
    {
      'party': 'Independent',
      'candidateId': 3,
      'votes': '9900'
    }
  ]
}

// 😬
let callCount = 0;
const dubiouslyUpdateVoteCount = (item, multiplier = 0) => parseInt(item.votes) + (100 * multiplier);
const dubiouslyIncrementCount = (count) => count < 6 ? count + 1 : count;
const dubiouslySetResult = (metadata, count) => count >= 5 ? { ...metadata, isComplete: true } : metadata;

const fetchResultData = () => {
  callCount = dubiouslyIncrementCount(callCount);
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const metadata = dubiouslySetResult(defaultData.metadata, callCount);
      const apiResultData = defaultData.results.map((item) => {
        return { ...item, votes: dubiouslyUpdateVoteCount(item, callCount) };
      }, []);

      resolve({ ...metadata, results: apiResultData});
    }, 500);
  }
)};

const fetchCandidateMap = () => candidateMap;

export {
  fetchResultData,
  fetchCandidateMap
}

export default fetchResultData;
