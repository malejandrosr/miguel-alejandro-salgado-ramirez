import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useActiveLink = () => {
	const location = useLocation();

	const [activeLink, setActiveLink] = useState("");

	useEffect(() => {
		const splitedPath = location.pathname.split("/").filter(Boolean);

		const selectedPath =
			splitedPath.length > 1 ? `/${splitedPath[0]}/${splitedPath[1]}` : `/${splitedPath[0]}`;

		setActiveLink(selectedPath);
	}, [location]);

	return { activeLink };
};

export default useActiveLink;
