import { AppContextType, AppContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import {
  TransactionServices,
  UserServices,
  ShipmentServices,
} from "@/services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useHome() {
  // Loading icons
  const [userLoading, setUsersLoading] = useState(false);
  const [shipmentLoading, setShipmentLoading] = useState(false);
  const [allShipmentLoading, setAllShipmentLoading]= useState(false)

  const { state, setState } = useContext<AppContextType>(AppContext);
  const [allUsers, setAllUsers] = useState<
    Record<string, string | string[] | undefined | Date>[]
  >([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const { getAllUsers } = UserServices();
  const { adminGetAllShipments } = ShipmentServices();
  const { paymentHistory } = TransactionServices();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [allShipment, setAllShipment] = useState([]);
  const [transitShipment, setTransitShipment] = useState<any>([]);
  const [currency, setCurrency] = useState("\u20A6");
  const balance = state.single_user_data?.wallet;
  const [showBalance, setShowBalance] = useState(false);
	const navigate = useNavigate();

  const toggleShowBalance = () => {
    setShowBalance(!showBalance);
  };
  // Items Delivered
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const received_data = {
    labels,
    datasets: [
      {
        data: [2, 3, 3, 5, 6, 7, 8, 1, 3, 5, 3, 0],
        backgroundColor: [
          "red",
          "green",
          "yellow",
          "black",
          "pink",
          "blue",
          "purple",
          "violet",
          "lightbrown",
          "indigo",
          "silver",
          "gold",
          "peach",
        ],
        borderWidth: 0,
      },
    ],
  };

  const sent_data = {
    labels,
    datasets: [
      {
        data: [12, 13, 13, 15, 16, 17, 18, 11, 13, 15, 13, 10],
        backgroundColor: [
          "red",
          "green",
          "yellow",
          "black",
          "pink",
          "blue",
          "purpule",
          "violet",
          "lightbrown",
          "indigo",
          "silver",
          "gold",
          "peach",
        ],
        borderWidth: 0,
      },
    ],
  };

  const transaction_history = [
    {
      type: "debit",
      title: "Pay for shipment",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?",
      amount: "5,000",
      date: "20, July, 2022",
      transaction_id: "xxx222",
    },
    {
      type: "credit",
      title: "Credit Wallet",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?",
      amount: "5,000",
      date: "20, July, 2022",
      transaction_id: "xxx222",
    },
    {
      type: "debit",
      title: "Pay for shipment",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?",
      amount: "5,000",
      date: "20, July, 2022",
      transaction_id: "xxx222",
    },
    {
      type: "credit",
      title: "Credit Wallet",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?",
      amount: "5,000",
      date: "20, July, 2022",
      transaction_id: "xxx222",
    },
    {
      type: "debit",
      title: "Pay for shipment",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?",
      amount: "5,000",
      date: "20, July, 2022",
      transaction_id: "xxx222",
    },
    {
      type: "credit",
      title: "Credit Wallet",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?",
      amount: "5,000",
      date: "20, July, 2022",
      transaction_id: "xxx222",
    },
  ];

  const allUsersMtd = async () => {
    setUsersLoading(true);
    await getAllUsers(1, 8).then(
      (response) => {
        console.log(response);
        setAllUsers(response.data.users);
        setTotalUsers(response.data.totalNumberOfUsers);
        setUsersLoading(false);
      },
      (error) => {
        console.log(error);
        setUsersLoading(false);
        toast.error("Oops! An error occured", {
          progressClassName: "bg-red-500 h-1",
          autoClose: 3000,
        });
      }
    );
  };

  const allTransitShipment = async () => {
    setShipmentLoading(true);
    await adminGetAllShipments("?shipment_status=TRANSIT").then(
      (response) => {
        console.log(response);
        setTransitShipment(response.data.allUserShipment);
        setShipmentLoading(false);
      },
      (error) => {
        console.log(error);
        setShipmentLoading(false);
      }
    );
  };


  const getAllShipment = async () => {
    setAllShipmentLoading(true);
    await adminGetAllShipments("").then(
      (response) => {
        console.log(response);
        setAllShipment(response.data.allUserShipment);
        setAllShipmentLoading(false);
      },
      (error) => {
        console.log(error);
        setAllShipmentLoading(false);
      }
    );
  };

  const getTransactionHistory = () => {
    paymentHistory().then(
      (response) => {
        console.log(response, "transactions......");
        setTransactionHistory(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleViewOnMap = (shipment_id: string) => {
	navigate(`/admin/track_shipment/${shipment_id}`);
};

const setActivePage = ()=>{
  setState((prevState) => ({
    ...prevState,
    activePage: 'Dashboard',
  })); 
}
  useEffect(() => {
    setActivePage()
    // getTransactionHistory();
    allUsersMtd();
    allTransitShipment();
    getAllShipment();
  }, []);
  return {
    toggleShowBalance,
	handleViewOnMap,
    transactionHistory,
    totalUsers,
    allUsers,
    shipmentLoading,
    userLoading,
    currency,
    balance,
    state,
    allShipment,
    allShipmentLoading,
    transitShipment,
    transaction_history,
    showBalance,
    received_data,
    sent_data,
  };
}
export default useHome;
