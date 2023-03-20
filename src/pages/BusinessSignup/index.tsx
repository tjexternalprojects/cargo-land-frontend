import {
	TiBusinessCard,
	HiDocumentText,
	TbBusinessplan,
	signupGif,
	MdOutlineArrowForwardIos,
} from '../../assets';
import { BasicInfo, BusinessDocuments, BusinessData, Header } from '@/components';
import useBusinessSignup from './useBusinessSignup';
import { motion } from 'framer-motion';
import { slideUp } from '@/utils/animations';

const BusinessSignup = () => {
	const { activeTab, setActiveTab } = useBusinessSignup();
	return (
		<div>
			<Header />
			<div className="flex h-screen items-center pt-10 flex-wrap">
				<div>
					<img src={signupGif} />
				</div>
				<div className="px-10 overflow-auto">
					<div className="w-full pb-10 border-l-2 border-l-blue-900 ">
						<div
							className="cursor-pointer flex relative gap-5"
							onClick={() => setActiveTab('basic_info')}
						>
							<div
								className={` curspo absolute  p-2 rounded-full text-white transition-all duration-75 ease-in-out
							${activeTab == 'basic_info' ? 'bg-blue-900 text-3xl -left-6' : 'bg-gray-400 -left-4'}
							`}
							>
								<TiBusinessCard />
							</div>
							<span className="ml-10 font-bold text-blue-900 mb-5">Basic Info</span>
						</div>
						{activeTab == 'basic_info' && (
							<motion.div className="mx-10  w-full" animate={slideUp(0, 0.3)}>
								<BasicInfo />
							</motion.div>
						)}
					</div>

					<div className="w-full pb-10 border-l-2 border-l-blue-900 ">
						<div
							className="cursor-pointer flex relative gap-5"
							onClick={() => setActiveTab('business_data')}
						>
							<div
								className={` absolute  p-2 rounded-full text-white transition-all duration-75 ease-in-out
							${activeTab == 'business_data' ? 'bg-blue-900 text-3xl -left-6' : 'bg-gray-400 -left-4'}
							`}
							>
								<TbBusinessplan />
							</div>
							<span className="ml-10 font-bold text-blue-900 mb-5">Business Data</span>
						</div>
						{activeTab == 'business_data' && (
							<motion.div className="mx-10  w-full" animate={slideUp(0, 0.3)}>
								<BusinessData />
							</motion.div>
						)}
					</div>
					<div className="w-full pb-10 border-l-2 border-l-blue-900 ">
						<div
							className="cursor-pointer flex  relative gap-5"
							onClick={() => setActiveTab('business_document')}
						>
							<div
								className={` absolute  p-2 rounded-full text-white transition-all duration-75 ease-in-out
							${activeTab == 'business_document' ? 'bg-blue-900 text-3xl -left-6' : 'bg-gray-400 -left-4'}
							`}
							>
								<HiDocumentText />
							</div>
							<span className="ml-10 font-bold text-blue-900 mb-5">Business Documents</span>
						</div>
						{activeTab == 'business_document' && (
							<motion.div className="mx-10  w-full" animate={slideUp(0, 0.3)}>
								<BusinessDocuments />
							</motion.div>
						)}
					</div>
					<div className="w-full  border-l-2 border-l-blue-900 ">
						<div className="flex  relative gap-5">
							<div
								className={` absolute  p-2 rounded-full text-white 
							${activeTab == 'proceed' ? 'bg-blue-900 text-3xl -left-6' : 'bg-gray-400 -left-4'}
							`}
							>
								<MdOutlineArrowForwardIos />
							</div>
							<button
								className={`${
									activeTab == 'proceed' ? 'text-red-600 font-bold' : 'text-gray-400 disabled'
								}flex items-center text-sm md:text-md    rounded-3xl px-4  md:px-8 py-2  hover:transition-all duration-150 ease-in-outhover:shadow-red-100 shadow-xl shadow-blue-100 ml-10`}
							>
								Proceed
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusinessSignup;
