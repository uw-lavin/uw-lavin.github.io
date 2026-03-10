import { Tab } from '@headlessui/react';
import { FaUserGraduate, FaClipboardList, FaEdit } from 'react-icons/fa';
import { RECRUITMENT_TABS_DATA } from '../../constants/recruitment';
import { cn } from '../../lib/utils';

const iconMap = {
  graduate: <FaUserGraduate className="text-purple-700 w-6 h-6" />,
  clipboard: <FaClipboardList className="text-purple-700 w-6 h-6" />,
  edit: <FaEdit className="text-purple-700 w-6 h-6" />,
};

export default function RecruitmentTabs() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tab.Group>
        <Tab.List className="flex justify-center space-x-8 border-b-2 border-gray-200 mb-8">
          {RECRUITMENT_TABS_DATA.map(({ label, iconType }) => (
            <Tab
              key={label}
              className={({ selected }) =>
                cn(
                  'flex items-center gap-3 px-6 py-4 text-base font-semibold transition-all outline-none',
                  selected
                    ? 'text-purple-700 border-b-4 border-purple-700 -mb-0.5'
                    : 'text-gray-500 hover:text-purple-700 hover:border-b-4 hover:border-purple-200 -mb-0.5'
                )
              }
            >
              {iconMap[iconType]}
              {label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {RECRUITMENT_TABS_DATA.map(({ content }, idx) => (
            <Tab.Panel
              key={idx}
              className="animate-fade-slide bg-white p-8 rounded-xl shadow-lg"
            >
              {content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}