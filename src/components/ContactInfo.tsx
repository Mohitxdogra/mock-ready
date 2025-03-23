"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactInfoType {
  email: string;
  phone: string;
  location: string;
}

export const ContactInfo = () => {
  const [contact, setContact] = useState<ContactInfoType | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const docRef = doc(db, "contact_info", "mockready_contact");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data() as ContactInfoType);
      } else {
        console.error("No such document!");
      }
    };
    fetchContactInfo();
  }, []);

  return (
    <Card className="p-4 shadow-md">
      <CardContent>
        <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
        {contact ? (
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" /> {contact.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-500" /> {contact.phone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" /> {contact.location}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  );
};
