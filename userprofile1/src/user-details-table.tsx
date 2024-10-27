import React from 'react'
import { FaBabyCarriage, FaUser, FaMapMarkerAlt, FaGlobe, FaCannabis, FaSmoking, FaSmokingBan, FaWineGlassAlt, FaBriefcase, FaGraduationCap, FaBook, FaHome, FaSearch } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface UserData {
  children?: boolean;
  wantChildren?: boolean;
  age: number;
  hometown: { value: string };
  ethnicity?: string;
  drugs: { value: string };
  marijuana: { value: string };
  smoking: { value: string };
  drinking: { value: string };
  job?: string;
  education?: string;
  religion?: string;
  currentResidence?: string;
  relationshipIntentions?: string;
}

interface UserDetailsTableProps {
  userData: UserData;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-center mr-4 text-primary">
          {icon}
          <span className="text-xs mt-1 text-center">{value}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}: {value}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const UserDetailsTable: React.FC<UserDetailsTableProps> = ({ userData }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex p-4">
            <DetailItem
              icon={<FaBabyCarriage className="text-2xl" />}
              label="Have children"
              value={userData.children ? "Yes" : "No"}
            />
            <DetailItem
              icon={<FaBabyCarriage className="text-2xl" />}
              label="Want children"
              value={userData.wantChildren ? "Yes" : "No"}
            />
            <DetailItem
              icon={<FaUser className="text-2xl" />}
              label="Age"
              value={userData.age.toString()}
            />
            <DetailItem
              icon={<FaMapMarkerAlt className="text-2xl" />}
              label="Location"
              value={userData.hometown.value}
            />
            <DetailItem
              icon={<FaGlobe className="text-2xl" />}
              label="Ethnicity"
              value={userData.ethnicity || 'Not specified'}
            />
            <DetailItem
              icon={<FaCannabis className="text-2xl" />}
              label="Drugs"
              value={userData.drugs.value}
            />
            <DetailItem
              icon={<FaSmoking className="text-2xl" />}
              label="Marijuana"
              value={userData.marijuana.value}
            />
            <DetailItem
              icon={<FaSmokingBan className="text-2xl" />}
              label="Smoke"
              value={userData.smoking.value}
            />
            <DetailItem
              icon={<FaWineGlassAlt className="text-2xl" />}
              label="Drink"
              value={userData.drinking.value}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="space-y-4 mt-4">
          <div className="flex items-center text-primary">
            <FaBriefcase className="mr-2 text-xl" />
            <span>{userData.job || 'Not specified'}</span>
          </div>
          <div className="flex items-center text-primary">
            <FaGraduationCap className="mr-2 text-xl" />
            <span>{userData.education || 'Not specified'}</span>
          </div>
          <div className="flex items-center text-primary">
            <FaBook className="mr-2 text-xl" />
            <span>{userData.religion || 'Not specified'}</span>
          </div>
          <div className="flex items-center text-primary">
            <FaHome className="mr-2 text-xl" />
            <span>{userData.currentResidence || 'Not specified'}</span>
          </div>
          <div className="flex items-center text-primary">
            <FaSearch className="mr-2 text-xl" />
            <span>{userData.relationshipIntentions || 'Not specified'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserDetailsTable