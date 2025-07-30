import { Tab } from '@headlessui/react';
import { FaUserGraduate, FaClipboardList, FaEdit } from 'react-icons/fa';

const tabData = [
  {
    label: "LAVIN STUDENTS",
    icon: <FaUserGraduate className="text-purple-700 w-6 h-6" />,
    content: (
      <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
        <li>Spend 3 to 4 years immersed in entrepreneurship</li>
        <li>Develop companies and collaborate with Lavin peers</li>
        <li>Get expert feedback and mentoring from the best of Seattle's entrepreneurial community</li>
        <li>Score paid internships in early-stage companies and a matching scholarship</li>
        <li>Form teams and compete in the Hollomon Health Innovation Challenge, the Alaska Airlines Environmental Innovation Challenge, and/or the Dempsey Startup Competition</li>
        <li>Network with entrepreneurs, founders, venture capitalists and angel investors</li>
        <li>Graduate with the connections, real-world experience, and skill set needed to turn an idea into a reality!</li>
      </ul>
    ),
  },
  {
    label: "LAVIN REQUIREMENTS",
    icon: <FaClipboardList className="text-purple-700 w-6 h-6" />,
    content: (
      <div className="space-y-6 text-gray-700 text-lg">
        <p className="font-semibold">
          Lavin is not a club, it is a competitive and binding program for students who want to take their entrepreneurship coursework and career to another level. Students sign a contract and agree to complete the extra-curricular requirements of Lavin and have an option to enroll in Entrepreneurship (ENTRE) classes to receive the Lavin Certificate. This means 16 credits of optional entrepreneurship coursework and consistent involvement in the "heart" of Lavin activities, including:
        </p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Lavin Welcome Weekend Reception and Retreat:</h4>
            <p>Every fall, we kick off the new Cohort acceptance with a weekend of awesome events. Students hear from guest speakers and bond over dinner and icebreakers Thursday evening on campus. On the following weekend, students depart from campus for an overnight retreat. During this retreat, students engage in team building activities, thought exercises and practice their pitch skills in a low-stakes setting, where students form teams to create and pitch an idea according to the year's theme. To reward the teams' efforts winning teams choose from among three amazing Seattle entrepreneurs to have dinner with. It is during these initial fall activities that students bond as a cohort and form friendships that last a lifetime.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Winter Quarter Class:</h4>
            <p>The newly-admitted Lavin students in the 2024 Cohort are required to register for a 2-credit class in Winter quarter 2025. "ENTRE 490B: Startup Skills for Lavin Founders" is the title of the course and it is graded C/NC. Class meets every Thursday from 5:30-7:20pm through winter quarter. This class is reserved for Lavin students only, and will be your opportunity to add tools to your entrepreneurial toolbelt and meet/interact with the other members of your cohort. Each week will focus on a new useful skill and may include a guest speaker as an expert in that subject area. You'll learn about various aspects of entrepreneurship while making friends with your Lavin peers!</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Lunches and Fieldtrips:</h4>
            <p>Every quarter, Lavin students choose among numerous opportunities to either have lunch with or visit the offices of major players in the Seattle entrepreneurial community, from startup headquarters and venture capital firms to incubators and chocolate factories. Groups are small, so getting engaged and asking smart questions is a must!</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Meetings and Social Events:</h4>
            <p>Throughout the year, students attend quarterly All Student Meeting and any number of fun, social events. These are great opportunities for students to deepen their relationships within the Lavin community while gaining insight into the inner workings of the program!</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Internships and Job Fairs:</h4>
            <p>Not only are students given a scholarship to intern in an early-stage company, but are also supported in their job search by the UW Buerk Center. Lavin students will be the first to hear about internship opportunities at startups who are in contact with the Buerk Center. In addition, students are invited to the UW Buerk Center's Startup Career & Internship Fair. After all, what better way to gain the skill set you need than to learn by doing?</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "LAVIN APPLICATION",
    icon: <FaEdit className="text-purple-700 w-6 h-6" />,
    content: (
      <div className="space-y-6 text-gray-700 text-lg">
        <p>
          The Lavin Entrepreneurship Program is competitive. We look for the most driven, passionate and creative individuals we can find. Whether you're intending to major in engineering, business, computer science, or are undecided—if you know your path is entrepreneurial, you belong in Lavin!
        </p>
        
        <p>
          The online application for Lavin opens in mid-September, and decisions are made by early November. Any University of Washington undergraduate student (including incoming first-years) with at least three years remaining in their time at UW is eligible to apply.
        </p>
        
        <p>
          On your application you will be asked to write about your 'entrepreneurial' experiences, skills you have taught yourself, and what you hope to learn to further your entrepreneurial journey. We encourage you to think broadly about how being an entrepreneur can include times in your life where you take action to solve the problems you see in your world and that does not necessarily mean your actions resulted in a new business being started–though if you did start a business or non-profit, we'd love to hear about it!
        </p>
        
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-700">
          <p className="font-semibold text-purple-700 mb-2">Questions?</p>
          <p>Contact the Buerk Center at <a href="mailto:uwbuerk@uw.edu" className="text-purple-700 hover:underline">uwbuerk@uw.edu</a> or <a href="tel:206.616.0734" className="text-purple-700 hover:underline">206.616.0734</a>.</p>
        </div>
      </div>
    ),
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function RecruitmentTabs() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tab.Group>
        <Tab.List className="flex justify-center space-x-8 border-b-2 border-gray-200 mb-8">
          {tabData.map(({ label, icon }) => (
            <Tab
              key={label}
              className={({ selected }) =>
                classNames(
                  'flex items-center gap-3 px-6 py-4 text-base font-semibold transition-all outline-none',
                  selected
                    ? 'text-purple-700 border-b-4 border-purple-700 -mb-0.5'
                    : 'text-gray-500 hover:text-purple-700 hover:border-b-4 hover:border-purple-200 -mb-0.5'
                )
              }
            >
              {icon}
              {label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabData.map(({ content }, idx) => (
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