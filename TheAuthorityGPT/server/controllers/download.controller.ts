import { Request, Response } from 'express';
import { DownloadFile } from '../models/download.model';

export class DownloadController {
  async getDownloads(req: Request, res: Response) {
    try {
      const { category, role } = req.query;
      const query: any = {};
      
      if (category) query.category = category;
      if (role) query.access_roles = role;

      const downloads = await DownloadFile.find(query)
        .sort({ upload_date: -1 });
      
      res.json({ downloads });
    } catch (error) {
      console.error('Error fetching downloads:', error);
      res.status(500).json({ error: 'Failed to fetch downloads' });
    }
  }

  async getDownloadById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const download = await DownloadFile.findById(id);
      
      if (!download) {
        return res.status(404).json({ error: 'Download not found' });
      }
      
      res.json({ download });
    } catch (error) {
      console.error('Error fetching download:', error);
      res.status(500).json({ error: 'Failed to fetch download' });
    }
  }

  async createDownload(req: Request, res: Response) {
    try {
      const download = await DownloadFile.create(req.body);
      res.status(201).json({ download });
    } catch (error) {
      console.error('Error creating download:', error);
      res.status(500).json({ error: 'Failed to create download' });
    }
  }

  async updateDownload(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const download = await DownloadFile.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!download) {
        return res.status(404).json({ error: 'Download not found' });
      }
      
      res.json({ download });
    } catch (error) {
      console.error('Error updating download:', error);
      res.status(500).json({ error: 'Failed to update download' });
    }
  }

  async deleteDownload(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const download = await DownloadFile.findByIdAndDelete(id);
      
      if (!download) {
        return res.status(404).json({ error: 'Download not found' });
      }
      
      res.json({ message: 'Download deleted successfully' });
    } catch (error) {
      console.error('Error deleting download:', error);
      res.status(500).json({ error: 'Failed to delete download' });
    }
  }
}
