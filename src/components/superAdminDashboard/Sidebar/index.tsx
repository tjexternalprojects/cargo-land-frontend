import { BiChevronDown, BiChevronLeft, CiSettings, logo, TbLogout, userImg } from '@/assets';
import { Link, NavLink, useMatch } from 'react-router-dom';
import useLogin from '@/pages/Login/useLogin';
import useSidebar from './useSidebar';
import React from 'react';
const sidebar = () => {
	const { handleLogout } = useLogin();
	const {
		state,
		navigationLinks,
		location,
		activeSubMenu,
		activeRoute,
		isRouteActive,
		activeSubRoute,
		handleToggleSidebar,
		handleToggleSubMenu,
	} = useSidebar();
	return (
		<>
			<div
				className={` z-20 bg-white fixed h-screen w-60 flex flex-col shadow justify-between animate__animated ${
					state.toggleAdminSideBar ? 'flex animate__slideInLeft' : 'md:flex hidden'
				} animate_faster`}
			>
				<div className="bg-white  flex items-center justify-center rounded-xs p-2 mt-2  ">
					<img src={logo} className=" w-24 h-8" alt="" />
				</div>
				<div className="flex-grow mt-10 ">
					<ul className="text-lg font-bold">
						{navigationLinks.map((val, index) => (
							<React.Fragment key={index}>
								{!val.sub_menu ? (
									<li>
										<NavLink
											to={val.route_to}
											onClick={() => handleToggleSidebar(val.route_to)}
											className={`${
												state.activePage === val.name
													? 'bg-blue-900/20 border-l-blue-900'
													: 'border-l-white bg-white'
											} pl-8 py-3 flex border-l-8 items-center space-x-3 text-blue-900`}
										>
											<val.icon />
											<span>{val.name}</span>
										</NavLink>
									</li>
								) : (
									<li className={` flex items-center space-x-3 text-blue-900 flex-col`}>
										<div
											className={`${
												state.activePage === val.name
													? 'bg-blue-900/20 border-l-blue-900'
													: 'border-l-white bg-white'
											} pl-8  py-3 border-l-8  cursor-pointer flex items-center justify-between w-full`}
											onClick={() => handleToggleSubMenu(index)}
										>
											<div className="flex items-center space-x-3">
												<val.icon />
												<span>{val.name}</span>
												<span>
													{index === activeSubMenu ? <BiChevronLeft /> : <BiChevronDown />}
												</span>
											</div>
										</div>
										{index === activeSubMenu && (
											<ul className="ml-8 mt-2 py-2 text-sm space-y-3">
												{val.sub_menu.map((sub_val, index) => (
													<li key={index}>
														<NavLink
															to={sub_val.route_to}
															onClick={() => handleToggleSidebar(sub_val.route_to, true)}
														>
															<span>{sub_val.name}</span>
														</NavLink>
													</li>
												))}
											</ul>
										)}
									</li>
								)}
							</React.Fragment>
						))}
					</ul>
				</div>
				<div className="text-blue-900 flex flex-col items-center p-8">
					<div className="flex flex-col gap-3 items-center mb-3">
						<div className="w-10 h-10 rounded-full shadow-md border border-slate-200">
							<img
								src={
									!state.single_user_data?.avatar
										? userImg
										: (state.single_user_data?.avatar as string)
								}
								className="w-full h-full object-contain rounded-full"
							/>
						</div>
						<div className="text-center">
							<h3 className="font-bold text-md">{state.single_user_data?.name}</h3>
							<p className=" font-light text-sm">{state.single_user_data?.email}</p>
						</div>
					</div>
					<div className="flex gap-2 text-2xl">
					<Link to="/admin/profile"  onClick={() => handleToggleSidebar('/admin/profile')} >
						<div className=" transition-all duration-75 ease-linear rounded-full text-blue-900 p-2 shadow-md hover:shadow-red-200 border-blue-900 border hover:border-slate-50 cursor-pointer">
							<CiSettings />
						</div>
						</Link>
						<div
							onClick={handleLogout}
							className="transition-all duration-75 ease-linear rounded-full p-2 text-blue-900 shadow-md hover:shadow-red-200 border-blue-900 border hover:border-slate-50 cursor-pointer"
						>
							<TbLogout />
						</div>
					</div>
				</div>
			</div>
			<div
				className="w-screen h-screen fixed z-10 bg-blue-900 bg-opacity-50 block md:hidden"
				onClick={() => handleToggleSidebar(activeSubMenu as any)}
			></div>
		</>
	);
};

export default sidebar;
