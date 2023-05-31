import { TiBusinessCard, HiDocumentText, TbBusinessplan, MdOutlineArrowForwardIos } from '@/assets';
import { BusinessDocuments, BusinessData } from '@/components';
import useBusinessSignup from './useBusinessSignup';
import { motion } from 'framer-motion';
import { slideUp } from '@/utils/animations';

const BusinessSignup = () => {
	const { activeTab, state, setActiveTab } = useBusinessSignup();
	return (
		<div className=" w-full py-10">
			<div className="px-10 overflow-auto ">
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
							<BusinessData setActiveTab={setActiveTab} />
						</motion.div>
					)}
				</div>
				<div className="w-full  border-l-2 border-l-blue-900 ">
					<div
						className="cursor-pointer flex  relative gap-5"
						onClick={() => {
							if (state.business_account?.business_name) {
								setActiveTab('business_document');
							}
						}}
					>
						<div
							className={` absolute  p-2 rounded-full text-white transition-all duration-75 ease-in-out
							${activeTab == 'business_document' ? 'bg-blue-900 text-3xl -left-6' : 'bg-gray-400 -left-4'}
							`}
						>
							<HiDocumentText />
						</div>
						<span
							className={`ml-10 font-bold  mb-5 ${
								activeTab == 'business_document' ? 'text-blue-900' : 'text-gray-400'
							}`}
						>
							Business Documents
						</span>
					</div>
					{activeTab == 'business_document' && (
						<motion.div className="mx-10  w-full" animate={slideUp(0, 0.3)}>
							<BusinessDocuments setActiveTab={setActiveTab} />
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};

export default BusinessSignup;
