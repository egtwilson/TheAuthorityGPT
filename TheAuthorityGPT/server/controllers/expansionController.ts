import { Request, Response } from 'express';
import ExpansionDrop from '../models/ExpansionDrop';

export const getExpansions = async (req: Request, res: Response) => {
  try {
    const { status, role } = req.query;
    const query: any = {};
    
    if (status) query.status = status;
    if (role) query.access_roles = role;

    const expansions = await ExpansionDrop.find(query)
      .sort({ release_date: -1 });
    
    res.json({ expansions });
  } catch (error) {
    console.error('Error fetching expansions:', error);
    res.status(500).json({ error: 'Failed to fetch expansions' });
  }
};

export const getExpansionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const expansion = await ExpansionDrop.findById(id);
    
    if (!expansion) {
      return res.status(404).json({ error: 'Expansion not found' });
    }
    
    res.json({ expansion });
  } catch (error) {
    console.error('Error fetching expansion:', error);
    res.status(500).json({ error: 'Failed to fetch expansion' });
  }
};

export const createExpansion = async (req: Request, res: Response) => {
  try {
    const expansion = await ExpansionDrop.create(req.body);
    res.status(201).json({ expansion });
  } catch (error) {
    console.error('Error creating expansion:', error);
    res.status(500).json({ error: 'Failed to create expansion' });
  }
};

export const updateExpansion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const expansion = await ExpansionDrop.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!expansion) {
      return res.status(404).json({ error: 'Expansion not found' });
    }
    
    res.json({ expansion });
  } catch (error) {
    console.error('Error updating expansion:', error);
    res.status(500).json({ error: 'Failed to update expansion' });
  }
};

export const deleteExpansion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const expansion = await ExpansionDrop.findByIdAndDelete(id);
    
    if (!expansion) {
      return res.status(404).json({ error: 'Expansion not found' });
    }
    
    res.json({ message: 'Expansion deleted successfully' });
  } catch (error) {
    console.error('Error deleting expansion:', error);
    res.status(500).json({ error: 'Failed to delete expansion' });
  }
};
