import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { app } from '../config/firebase';

const db = getFirestore(app);
const eventsCollection = collection(db, 'calendar_events');

export interface CalendarEvent {
  id?: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  date: Date;
  type: 'meeting' | 'task' | 'event';
  priority: 'High' | 'Medium' | 'Low';
  userId: string; // To associate events with users
  createdAt?: Date;
  updatedAt?: Date;
}

export const calendarEventService = {
  // Create a new calendar event
  async createEvent(eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      // Convert Date objects to Firestore Timestamps for storage
      const firestoreData = {
        ...eventData,
        date: Timestamp.fromDate(eventData.date),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(eventsCollection, firestoreData);

      // Return with JavaScript Date objects
      return {
        id: docRef.id,
        ...eventData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  },

  // Get all events for a specific user
  async getUserEvents(userId: string) {
    try {
      const q = query(eventsCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Convert all Timestamps to Dates
        const convertedData = Object.entries(data).reduce((acc, [key, value]) => {
          if (value instanceof Timestamp) {
            acc[key] = value.toDate();
          } else {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, any>);

        return {
          id: doc.id,
          ...convertedData,
        } as CalendarEvent;
      });
    } catch (error) {
      console.error('Error getting user events:', error);
      throw error;
    }
  },

  // Get events for a specific date range
  async getEventsByDateRange(userId: string, startDate: Date, endDate: Date) {
    try {
      const q = query(
        eventsCollection,
        where('userId', '==', userId),
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate))
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Convert all Timestamps to Dates
        const convertedData = Object.entries(data).reduce((acc, [key, value]) => {
          if (value instanceof Timestamp) {
            acc[key] = value.toDate();
          } else {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, any>);

        return {
          id: doc.id,
          ...convertedData,
        } as CalendarEvent;
      });
    } catch (error) {
      console.error('Error getting events by date range:', error);
      throw error;
    }
  },

  // Update an existing event
  async updateEvent(eventId: string, eventData: Partial<CalendarEvent>) {
    try {
      const eventRef = doc(eventsCollection, eventId);
      // Create a Firestore-compatible update object
      const updateData: Record<string, any> = {
        ...Object.entries(eventData).reduce((acc, [key, value]) => {
          if (value instanceof Date) {
            acc[key] = Timestamp.fromDate(value);
          } else {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, any>),
        updatedAt: Timestamp.now(),
      };

      await updateDoc(eventRef, updateData);

      // Return the event with JavaScript Date objects
      return {
        id: eventId,
        ...eventData,
        updatedAt: new Date(), // Convert Timestamp to Date
      };
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw error;
    }
  },

  // Delete an event
  async deleteEvent(eventId: string) {
    try {
      const eventRef = doc(eventsCollection, eventId);
      await deleteDoc(eventRef);
      return true;
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw error;
    }
  },

  // Get a single event by ID
  async getEventById(eventId: string) {
    try {
      const eventRef = doc(eventsCollection, eventId);
      const eventDoc = await getDoc(eventRef);
      if (!eventDoc.exists()) {
        throw new Error('Event not found');
      }
      const data = eventDoc.data();
      
      // Convert all Timestamps to Dates
      const convertedData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value instanceof Timestamp) {
          acc[key] = value.toDate();
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      return {
        id: eventDoc.id,
        ...convertedData,
      } as CalendarEvent;
    } catch (error) {
      console.error('Error getting calendar event:', error);
      throw error;
    }
  }
};