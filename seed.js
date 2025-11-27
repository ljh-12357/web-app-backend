const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Models
const Project = require('./models/Project');
const BlogPost = require('./models/BlogPost');
const User = require('./models/User');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await BlogPost.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123456'
    });
    console.log('Created admin user (email: admin@example.com, password: admin123456)');

    // Create test projects
    const projects = await Project.create([
      {
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce platform built with React and Node.js. Features include user authentication, shopping cart, payment integration, and order management.',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        user: adminUser._id
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        user: adminUser._id
      },
      {
        title: 'Weather Dashboard',
        description: 'A beautiful weather dashboard that displays current conditions, forecasts, and weather alerts for any location worldwide.',
        imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        user: adminUser._id
      },
      {
        title: 'Social Media Analytics',
        description: 'An analytics dashboard for tracking social media performance across multiple platforms with interactive charts and reports.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
        user: adminUser._id
      }
    ]);
    console.log(`Created ${projects.length} projects`);

    // Create test blog posts
    const blogPosts = await BlogPost.create([
      {
        title: 'Getting Started with React Hooks',
        content: `React Hooks revolutionized how we write React components. In this article, we'll explore the most commonly used hooks and best practices for using them effectively.

useState is the most basic hook that allows you to add state to functional components. It returns a pair: the current state value and a function to update it.

useEffect is used for side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.

Custom hooks allow you to extract component logic into reusable functions. They're a powerful way to share stateful logic between components.`,
        author: adminUser._id
      },
      {
        title: 'Building RESTful APIs with Node.js',
        content: `Building a RESTful API is a fundamental skill for any backend developer. In this guide, we'll walk through creating a robust API using Node.js and Express.

First, we'll set up our project structure and install the necessary dependencies. Then, we'll create routes for handling different HTTP methods.

Error handling is crucial for any API. We'll implement middleware to catch and format errors consistently across all endpoints.

Finally, we'll add authentication using JWT tokens to secure our API endpoints and protect sensitive data.`,
        author: adminUser._id
      },
      {
        title: 'CSS Grid vs Flexbox: When to Use Each',
        content: `CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes. Understanding when to use each will make your layouts more efficient.

Flexbox is designed for one-dimensional layouts. Use it when you need to arrange items in a row or column, with flexible sizing and alignment.

CSS Grid excels at two-dimensional layouts. It's perfect for creating complex page layouts with rows and columns that need to align precisely.

In practice, you'll often use both together. Grid for the overall page structure, and Flexbox for component-level layouts.`,
        author: adminUser._id
      },
      {
        title: 'Introduction to TypeScript',
        content: `TypeScript adds static typing to JavaScript, catching errors at compile time rather than runtime. This leads to more robust and maintainable code.

Getting started is easy - TypeScript is a superset of JavaScript, so any valid JavaScript is also valid TypeScript. You can gradually adopt types as you learn.

Interfaces and types allow you to define the shape of objects, making your code self-documenting and easier for others to understand.

The TypeScript compiler provides excellent IDE support, with autocomplete and refactoring tools that boost developer productivity.`,
        author: adminUser._id
      }
    ]);
    console.log(`Created ${blogPosts.length} blog posts`);

    console.log('\n=== Seed completed successfully! ===');
    console.log('Admin login credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123456');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
