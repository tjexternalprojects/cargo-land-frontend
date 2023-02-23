import { NewShipmentForm, RecipientDetails } from "..";
import { Link } from 'react-scroll';

const Delivery = () => {
  return (
    <>
      <div className=" tracking-widest text-sm text-gray-500 p-10 font-bold fixed">
        NEW SHIPMENT
      </div>
      <div className="px-10  flex gap-3 ">
        <div className="fixed mt-16">
          <div className="mt-10 border-l-2 space-y-2">
			<Link to="form" smooth={true} duration={500}>
              <div className=" border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold cursor-pointer">
                Package&nbsp;Details
              </div>
			  </Link>
            <div>
			<Link to="recipient" className="pl-5 cursor-pointer" smooth={true} duration={500}>

                Recipient&nbsp;Details
            </Link>
            </div>
            <div className="pl-5 cursor-pointer">Payment</div>
          </div>
        </div>
        <div className=" w-full pl-16 space-y-10">
          <div id="form" className="inline-flex w-full pt-20">
            <NewShipmentForm />
          </div>
          <div id="recipient" className="inline-flex w-full">
            <RecipientDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;
