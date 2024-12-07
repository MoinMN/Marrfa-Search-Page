import mongoose from 'mongoose';
import Blog from '../model/blog.model.js'; // Update the path as per your project structure

const MONGO_URI = 'mongodb://localhost:27017/Marrfa'; // Replace with your MongoDB URI

// Predefined pool of data for variety
const titles = [
  'Exploring the World of AI',
  'The Future of Web Development',
  'Understanding Blockchain Basics',
  'Mastering JavaScript',
  'The Rise of Machine Learning',
  'How to Build Scalable Applications',
  'Cybersecurity Tips for Businesses',
  'The Art of Effective Communication',
  'Design Principles for Modern Apps',
  'Demystifying Data Science',
  'The Impact of Cloud Computing',
  'Best Practices in Software Testing',
  'Top Trends in Digital Marketing',
  'The Importance of UI/UX Design',
  'Getting Started with React.js',
  'A Guide to Agile Development',
  'Exploring the Internet of Things (IoT)',
  'The Evolution of Mobile Apps',
  'The Role of DevOps in IT',
  'Understanding Cryptocurrencies',
  'How to Stay Productive as a Developer',
  'Tips for Remote Work Success',
  'Building an Effective Portfolio',
  'The Science of SEO Optimization',
  'Key Concepts in Artificial Intelligence',
  'How to Handle Big Data Efficiently',
  'Understanding Microservices Architecture',
  'Building RESTful APIs with Node.js',
  'A Guide to Progressive Web Apps',
  'The Future of Virtual Reality'
];

const authors = ['John Doe', 'Jane Smith', 'Chris Brown', 'Emily Davis', 'Michael Lee'];

const tagsPool = ['Tech', 'AI', 'Blockchain', 'React', 'Web', 'Mobile', 'SEO', 'UI/UX', 'DevOps', 'Cloud'];

const generateRandomTags = () => {
  const shuffledTags = tagsPool.sort(() => 0.5 - Math.random());
  return shuffledTags.slice(0, Math.floor(Math.random() * 4) + 1); // Random 1-4 tags
};

const generateRandomContent = (title) => {
  return `This blog titled "${title}" dives into ${title
    .split(' ')
    .slice(2)
    .join(' ')}. Learn how it is reshaping the world of technology and influencing our daily lives. Stay tuned for expert insights and key takeaways.`;
};

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const createDummyBlogs = async () => {
  try {
    const dummyBlogs = Array.from({ length: 30 }).map((_, i) => {
      const title = titles[i % titles.length]; // Cycle through the title pool
      return {
        title,
        content: generateRandomContent(title),
        author: authors[i % authors.length], // Cycle through the author pool
        tags: generateRandomTags(), // Generate random tags
        isPublished: Math.random() > 0.5, // Randomly assign published status
      };
    });

    await Blog.insertMany(dummyBlogs);
    console.log('Dummy blogs inserted successfully');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

(async () => {
  await connectDB();
  await createDummyBlogs();
})();
