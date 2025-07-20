import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  userEmail: string;
  title: string;
  body: string;
  icon?: string;
  createdAt: Date;
  read: boolean;
}

const NotificationSchema: Schema = new Schema({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  icon: { type: String },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

export const Notification = mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);