import { MongoClient } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.MONGODB_DB_NAME || 'trolley';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  const mongoClient = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  });
  
  await mongoClient.connect();
  return mongoClient.db(DATABASE_NAME);
}

export default async (req: VercelRequest, res: VercelResponse) => {
  // CORS headers - allow all methods
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  let mongoClient: MongoClient | null = null;
  try {
    if (!MONGODB_URI) {
      return res.status(500).json({ error: 'MONGODB_URI not configured' });
    }
    
    mongoClient = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    await mongoClient.connect();
    
    const db = mongoClient.db(DATABASE_NAME);
    const categoriesCollection = db.collection('categories');
    
    // Extract ID from either URL path or query string
    const id = (req.query.id as string) || req.url?.split('/').pop();

    if (req.method === 'GET') {
      const categories = await categoriesCollection.find({}).sort({ sort_order: 1 }).toArray();
      return res.status(200).json(categories);
    }

    if (req.method === 'POST') {
      const category = {
        ...req.body,
        _id: req.body._id || `cat_${Date.now()}`,
        created_at: new Date()
      };
      const result = await categoriesCollection.insertOne(category);
      return res.status(200).json({ _id: result.insertedId, ...category });
    }

    if (req.method === 'PUT') {
      if (!id) return res.status(400).json({ error: 'ID is required' });
      const result = await categoriesCollection.updateOne(
        { _id: id } as any,
        { $set: req.body }
      );
      if (result.matchedCount === 0) return res.status(404).json({ error: 'Category not found' });
      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      if (!id) return res.status(400).json({ error: 'ID is required' });
      console.log('[v0] Deleting category with ID:', id);
      const result = await categoriesCollection.deleteOne({ _id: id } as any);
      if (result.deletedCount === 0) return res.status(404).json({ error: 'Category not found' });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[v0] Categories API error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  } finally {
    if (mongoClient) {
      await mongoClient.close().catch(err => console.error('Error closing connection:', err));
    }
  }
};
