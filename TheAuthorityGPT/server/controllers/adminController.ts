import { Request, Response } from 'express';
import User from '../models/User';
import DownloadFile from '../models/DownloadFile';
import ExpansionDrop from '../models/ExpansionDrop';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const { title, description, fileUrl, category, accessRoles } = req.body;
    const { userId } = req;

    const download = await DownloadFile.create({
      title,
      description,
      file_url: fileUrl,
      category,
      access_roles: accessRoles,
      uploaded_by: userId
    });

    res.status(201).json({ download });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

export const scheduleExpansion = async (req: Request, res: Response) => {
  try {
    const { title, description, fileUrl, releaseDate, accessRoles } = req.body;
    const { userId } = req;

    const expansion = await ExpansionDrop.create({
      title,
      description,
      file_url: fileUrl,
      release_date: releaseDate,
      access_roles: accessRoles,
      uploaded_by: userId
    });

    res.status(201).json({ expansion });
  } catch (error) {
    console.error('Error scheduling expansion:', error);
    res.status(500).json({ error: 'Failed to schedule expansion' });
  }
};

export const manageUserRoles = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
};
