export type Task = {
  id: string;
  title: string;
  description: string;
  type: 'Linear Regression' | 'Neural Network' | 'Clustering';
  status: 'Open' | 'In Progress' | 'Completed' | 'Validation';
  reward: number;
  inputData: string;
  author: {
    name: string;
    avatar: string;
  };
  postedAt: string;
  results?: {
    submittedBy: string;
    resultData: string;
    submittedAt: string;
  }[];
  comments?: {
    author: string;
    comment: string;
    timestamp: string;
  }[];
  aiAnalysis?: {
    accuracyMetrics: Record<string, number>;
    potentialIssues: string;
    isLikelyValid: boolean;
    feedback: string;
  };
  validityDecision?: {
    isValid: boolean;
    reason: string;
    confidenceScore: number;
  };
};

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Analyze Stellar Light Curves',
    description: 'Perform linear regression on light curve data from Kepler-186f to identify potential exoplanet transits. Dataset includes time-series photometric data.',
    type: 'Linear Regression',
    status: 'Open',
    reward: 500,
    author: { name: 'Dr. Evelyn Reed', avatar: '/avatars/01.png' },
    postedAt: '2024-05-20T14:48:00.000Z',
    inputData: `Time,Brightness\n0,1.00\n1,0.99\n2,0.98\n3,0.97\n4,0.96\n5,0.85\n6,0.86\n7,0.97\n8,0.98\n9,0.99\n10,1.00`,
    results: [
      {
        submittedBy: 'Alice',
        resultData: 'y = -0.01x + 1.0, R² = 0.95',
        submittedAt: '2024-05-21T10:00:00.000Z',
      }
    ],
    comments: [
      {
        author: 'Bob',
        comment: 'Interesting dataset! Looks like a clear dip around t=5.',
        timestamp: '2024-05-20T16:00:00.000Z',
      }
    ],
    aiAnalysis: {
      accuracyMetrics: { 'R-squared': 0.95, 'MAE': 0.02 },
      potentialIssues: 'None detected. The model fits the data well.',
      isLikelyValid: true,
      feedback: 'Excellent work. The linear model accurately captures the primary trend. The R-squared value is high, indicating a strong fit.'
    },
    validityDecision: {
      isValid: true,
      reason: 'The submitted result aligns with the expected model and has a high accuracy score.',
      confidenceScore: 0.98
    }
  },
  {
    id: 'task-2',
    title: 'Predict Protein Folding Structure',
    description: 'Use a pre-trained neural network to predict the 3D structure of a novel protein based on its amino acid sequence. High accuracy is critical.',
    type: 'Neural Network',
    status: 'In Progress',
    reward: 1200,
    author: { name: 'BioCorp Labs', avatar: '/avatars/02.png' },
    postedAt: '2024-05-18T09:00:00.000Z',
    inputData: 'SEQUENCE: MTEITAAMVKELRESTGAGMMDCKNALSETNGDFDKAVQLLREKGLGKAAKKADRLAAEG\n',
  },
  {
    id: 'task-3',
    title: 'Galaxy-Type Clustering Analysis',
    description: 'Apply a k-means clustering algorithm to a dataset of galaxy morphological features to group them into distinct types (e.g., spiral, elliptical).',
    type: 'Clustering',
    status: 'Completed',
    reward: 750,
    author: { name: 'CosmoData Initiative', avatar: '/avatars/03.png' },
    postedAt: '2024-05-15T18:20:00.000Z',
    inputData: 'GalaxyID,Color,Eccentricity,Size\n1,0.8,0.2,150\n2,0.9,0.1,160\n3,0.2,0.8,50\n4,0.3,0.7,60',
    results: [
      {
        submittedBy: 'Charlie',
        resultData: 'Cluster 1: [1, 2], Cluster 2: [3, 4]',
        submittedAt: '2024-05-16T12:00:00.000Z',
      }
    ],
    validityDecision: {
      isValid: true,
      reason: 'Clustering correctly separates the galaxies based on features.',
      confidenceScore: 0.95
    }
  },
  {
    id: 'task-4',
    title: 'Climate Change Model Validation',
    description: 'Run a linear regression on historical temperature and CO2 data to validate a simplified climate model. The dataset spans 100 years.',
    type: 'Linear Regression',
    status: 'Open',
    reward: 600,
    author: { name: 'Global Climate Watch', avatar: '/avatars/04.png' },
    postedAt: '2024-05-21T11:00:00.000Z',
    inputData: 'Year,CO2_ppm,Temperature_Anomaly\n1920,303, -0.2\n1921,304,-0.15\n... (100 entries) ...\n2020,414,1.01',
  }
];

export const user = {
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  avatar: '/avatars/user.png',
  stats: {
    tasksPosted: 3,
    tasksCompleted: 12,
    tokensEarned: 4580
  },
  activity: [
    { month: 'Jan', tasks: 2, tokens: 400 },
    { month: 'Feb', tasks: 3, tokens: 750 },
    { month: 'Mar', tasks: 1, tokens: 200 },
    { month: 'Apr', tasks: 4, tokens: 1530 },
    { month: 'May', tasks: 2, tokens: 1700 },
  ]
};

export const notifications = [
    { id: 1, text: "Your result for 'Analyze Stellar Light Curves' was validated.", time: '5 minutes ago', read: false },
    { id: 2, text: "New task 'Climate Change Model Validation' has been posted.", time: '1 hour ago', read: false },
    { id: 3, text: "You have been awarded 750 tokens for 'Galaxy-Type Clustering'.", time: '1 day ago', read: true },
    { id: 4, text: "A new comment was added to your task 'Predict Protein Folding'.", time: '2 days ago', read: true },
]

export const governanceProposals = [
  {
    id: 'prop-1',
    title: 'Increase Base Reward for Linear Regression Tasks',
    description: 'Proposal to increase the minimum reward for all linear regression tasks by 20% to attract more contributors.',
    status: 'Active',
    votesFor: 1250,
    votesAgainst: 340,
    endsIn: '3 days'
  },
  {
    id: 'prop-2',
    title: 'Integrate a New Task Type: Genetic Sequencing',
    description: 'Fund the development to allow for genetic sequencing analysis tasks on the platform.',
    status: 'Active',
    votesFor: 880,
    votesAgainst: 610,
    endsIn: '5 days'
  },
  {
    id: 'prop-3',
    title: 'Update Platform UI Theme',
    description: 'A community-led proposal to refresh the platform\'s visual design.',
    status: 'Passed',
    votesFor: 2100,
    votesAgainst: 150,
    endsIn: 'Closed'
  }
]

